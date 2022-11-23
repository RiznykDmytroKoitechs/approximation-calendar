import {
  Box,
  IconButton,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostForm from "../Forms/PostCreationForm";
import EditIcon from "@mui/icons-material/Edit";
import EditForm from "../Forms/PostEditingForm";
import ActivityGraph from "./ActivityGraph";

export default function ViewingPage() {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [postsData, setPostsData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const convertDate = (initDate) => {
    const date = new Date(initDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
    });
  };

  const fetchPosts = (token) => {
    fetch("/entries", {
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
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
            throw new Error("");
          }
        }
      })
      .then((res) => {
        setPostsData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectEditingTarget = (id) => {
    if (id === editingIndex) {
      setEditingIndex(-1);
      return;
    }
    setEditingIndex(id);
    console.log(id);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const newPostsArr = [];
    postsData
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage + 1)
      .forEach((elem, id) => {
        newPostsArr.push(
          <Paper
            sx={{
              padding: "10px",
              marginBottom: "10px",
            }}
            key={id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight="600" variant="body1">
                    {convertDate(elem.date)}
                  </Typography>
                  <Typography fontWeight="600" variant="body1">
                    {elem.hours} {elem.hours <= 1 ? "hour" : "hours"}
                  </Typography>
                </Box>
                <Typography variant="body2">{elem.comment}</Typography>
              </Box>
              <IconButton
                onClick={() => {
                  selectEditingTarget(id + page * rowsPerPage);
                }}
                sx={{
                  marginLeft: "10px",
                  backgroundColor:
                    editingIndex == id + page * rowsPerPage
                      ? "#007FFF"
                      : "white",
                }}
              >
                <EditIcon
                  sx={{
                    color:
                      editingIndex == id + page * rowsPerPage
                        ? "white"
                        : "primary",
                  }}
                />
              </IconButton>
            </Box>
          </Paper>
        );
      });
    setPosts(newPostsArr);
  }, [postsData, page, rowsPerPage, editingIndex]);

  useEffect(() => {
    const token = localStorage.getItem("Auth token");
    if (!token) {
      navigate("../");
    } else {
      fetchPosts(token);
    }
  }, []);

  const onPageChange = (event, page) => {
    setPage(page);
  };
  const onRowsPerPageChange = (event) => {
    if (page * event.target.value > postsData.length)
      setPage(Math.floor(postsData.length / event.target.value));
    setRowsPerPage(event.target.value);
  };
  const updatePostsData = (val) => {
    setPostsData(val);
  };

  return (
    <Container>
      {editingIndex == -1 ? (
        <PostForm postSetter={updatePostsData} posts={postsData} />
      ) : (
        <EditForm
          postSetter={updatePostsData}
          posts={postsData}
          id={editingIndex}
          setEditIndex={setEditingIndex}
        />
      )}
      <br />
      {posts}
      <TablePagination
        sx={{
          color: "white",
        }}
        component="div"
        count={postsData.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <ActivityGraph postData={postsData} />
    </Container>
  );
}
