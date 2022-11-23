import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Paper, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoginForm from "../Forms/LoginForm";
import RegistrationForm from "../Forms/RegisterForm";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const navigate = useNavigate();

  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const token = localStorage.getItem("Auth token");
    console.log(token);
    if (token) {
      navigate("posts");
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab sx={{ width: "50%" }} label="Login" value={"0"} />
            <Tab sx={{ width: "50%" }} label="Register" value={"1"} />
          </TabList>
          <TabPanel value={"0"}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={"1"}>
            <RegistrationForm />
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  );
}
