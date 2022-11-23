import { Button, IconButton, Paper, TextField } from "@mui/material"
import { Box } from "@mui/system";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from "moment";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";

export default function EditForm({postSetter, posts, id, setEditIndex}) {
    const postInfo = posts[id]
    const [date, setDate] = useState({value:moment(new Date(postInfo.date)), errorState:false})
    const [hours, setHours] = useState({value:postInfo.hours, errorState:false})
    const [comment, setComment] = useState(postInfo.comment?postInfo.comment:"")

    const navigate = useNavigate()

    useEffect(()=>{
        onChangeDate(moment(postInfo.date))
        setHours({value:postInfo.hours, errorState:false})
        setComment(postInfo.comment?postInfo.comment:"")
    },[id])

    const editThePost = () => {
        const token = localStorage.getItem("Auth token")
        fetch("/entries", {
            credentials:"same-origin",
            method:"PUT",
            headers: {
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                id:postInfo.id,
                comment,
                hours:hours.value,
                date:date.value
            })
        })
        .then((res)=>{
            if(res.ok) {
                return res.json()
            }
            else {
                console.log(res.status)
                if(res.status=="401"){
                    console.log("deleting")
                    localStorage.removeItem("Auth token")
                    navigate('../')
                }
                else {
                    console.log(res)
                    throw new Error(res)
                }
            }
        })
        .then((res)=>{
            const newPosts = posts.slice()
            newPosts[id] = {
                id:postInfo.id,
                comment: comment,
                hours:Number(hours.value),
                date:date.value.format()
            }
            console.log(newPosts[id])
            newPosts.sort((elem1, elem2) =>{
                return Date.parse(elem2.date) - Date.parse(elem1.date)
            })
            postSetter(newPosts)
            setEditIndex(-1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const onChangeDate=(newDate)=>{
        const val = newDate
        if(val>moment() || val <moment().add(-1, "days").startOf("day")) {   
            setDate({value:val, errorState:true})
        }
        else {
            setDate({value:val, errorState:false})
        }
    }
    const onChangeComment = (event) => {
        setComment(event.target.value)
    }
    const onChangeHours = (event) =>{
        const val = event.target.value
        if(val>10 || val <0.01) {   
            setHours({value:val, errorState:true})
        }
        else{
            setHours({value:val, errorState:false})
        }
    }
    const renderFunc = (params) => <TextField sx={{width:"250px"}} margin="dense" {...params}/>
    return(
        <Paper sx={{padding:"20px"}}>
            <Box sx={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                <Box sx={{
                    flex:"1",
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <DateTimePicker 
                        value={date.value}
                        onChange={onChangeDate}
                        renderInput={renderFunc} 
                        maxDate={moment()}
                        minDate={moment().add(-1, "days").startOf("day")}
                    />
                    <TextField onChange={onChangeHours} value={hours.value} type="number" error={hours.errorState} sx={{width:"250px"}} margin="dense" label="Hours"/>
                    <TextField value={comment} onChange={onChangeComment} margin="dense" multiline rows={2} fullWidth label="Comment"/>
                </Box>
                <IconButton disabled={date.errorState || hours.errorState} onClick={editThePost} sx={{height:"100px", width:"100px", margin:"15px"}} size="large">
                    <EditIcon/>
                </IconButton>
            </Box>
        </Paper>
    )
}