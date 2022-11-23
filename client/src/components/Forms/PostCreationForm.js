import { Button, IconButton, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export default function PostForm({ postSetter, posts }) {
  const [date, setDate] = useState({ value: moment(), errorState: false });
  const [hours, setHours] = useState({ value: 1, errorState: false });
  const [comment, setComment] = useState();

  const navigate = useNavigate();

  const postThePost = () => {
    const token = localStorage.getItem("Auth token");
    fetch("/entries", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        comment: comment,
        hours: Number(hours.value),
        date: date.value.toDate(),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status);
          if (res.status == "401") {
            console.log("deleting");
            localStorage.removeItem("Auth token");
            navigate("../");
          } else {
            console.log(res);
            throw new Error(res);
          }
        }
      })
      .then((res) => {
        const newPosts = posts.slice();
        newPosts.push(res.result);
        newPosts.sort((elem1, elem2) => {
          return Date.parse(elem2.date) - Date.parse(elem1.date);
        });
        postSetter(newPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeDate = (newDate) => {
    const val = newDate;
    if (val > moment() || val < moment().add(-1, "days").startOf("day")) {
      setDate({ value: val, errorState: true });
    } else {
      setDate({ value: val, errorState: false });
    }
  };
  const onChangeComment = (event) => {
    setComment(event.target.value);
  };
  const onChangeHours = (event) => {
    const val = event.target.value;
    if (val > 10 || val < 0.01) {
      setHours({ value: val, errorState: true });
    } else {
      setHours({ value: val, errorState: false });
    }
  };
  const renderFunc = (params) => (
    <TextField sx={{ width: "250px" }} margin="dense" {...params} />
  );
  return (
    <Paper sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DateTimePicker
            value={date.value}
            onChange={onChangeDate}
            renderInput={renderFunc}
            maxDate={moment()}
            minDate={moment().add(-1, "days")}
          />
          <TextField
            onChange={onChangeHours}
            value={hours.value}
            type="number"
            error={hours.errorState}
            sx={{ width: "250px" }}
            margin="dense"
            label="Hours"
          />
          <TextField
            value={comment}
            onChange={onChangeComment}
            margin="dense"
            multiline
            rows={2}
            fullWidth
            label="Comment"
          />
        </Box>
        <IconButton
          disabled={date.errorState || hours.errorState}
          onClick={postThePost}
          sx={{ height: "100px", width: "100px", margin: "15px" }}
          size="large"
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
