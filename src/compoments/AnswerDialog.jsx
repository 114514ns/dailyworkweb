import React, {useEffect, useState} from 'react';
import classes from "./AnswerDialog.module.css";
import {Avatar, Tooltip} from "@nextui-org/react";
import axios from "axios";
function AnswerDialog(props) {
    const [res,setRes] = useState("")
    useEffect(() => {
        console.log("executed")
        axios({
            url: 'https://lulu.lulufind.com/mrzy/mrzypc/getWorkDetail',
            params: {
                "workId": window.workId
            },
            method: "POST"
        }).then(response => {
            setRes(response.data.data)
            console.log(response.data.data)
        })
    }, []);
    return (
        <div className={classes.dialogRoot}>
            <div className={classes.left}>
                {res && res.submitUser.forEach((k) => {
                    if (!k.userName) {
                        console.log(k.userRealName)
                        return <Tooltip content={k.userRealName}>
                            <Avatar src={k.userAvatar} className={classes.avatar}>

                            </Avatar>
                        </Tooltip>
                    }
                })}
            </div>
            <div className={classes.right}>

            </div>
        </div>
    );
}

export default AnswerDialog;