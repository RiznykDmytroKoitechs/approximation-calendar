import { Button, Container, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = () => {
    fetch("/auth", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res
          .json()
          .then((data) => {
            if (res.ok) {
              return data;
            } else {
              throw new Error(data);
            }
          })
          .catch((err) => {
            throw err;
          });
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Auth token", res.token);
        navigate("posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > :not(style) + :not(style)": {
          marginTop: "20px",
        },
      }}
    >
      <TextField
        onChange={onChangeEmail}
        value={email}
        id="email"
        variant="outlined"
        label="email"
      />
      <TextField
        onChange={onChangePassword}
        value={password}
        id="password"
        variant="outlined"
        label="password"
      />
      <Divider />
      <Button variant="contained" onClick={onFormSubmit}>
        Submit!
      </Button>
    </Container>
  );
}
