import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ViewingPage(){
    const [postsData, setPostsData] = useState([])
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    const fetchPosts = (token) => {
        fetch("/entries", {
            credentials:"same-origin",
            headers: {
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*"
            }
        })
        .then((res)=>{
            if(res.ok) {
                return res.json()
            }
            else throw new Error("")
            .catch((err)=>{
                throw err
            })
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        const token = localStorage.getItem("Auth token")
        if(!token) {
            navigate('../')
        }
        else {
            fetchPosts(token)
        }
    },[])

    return(
        <Container>
            <Typography>ViewingPage!</Typography>
            <Paper>
                <Typography>Post!</Typography>
            </Paper>
        </Container>
    )
}