import React, {useEffect, useState} from 'react';
import classes from "./AnswerDialog.module.css";
import {Avatar, Tooltip} from "@nextui-org/react";
import axios from "axios";
import {Image} from "@nextui-org/react";
function AnswerDialog(props) {
    const [res,setRes] = useState("")
    useEffect(() => {
        //console.log("fetch:" + new Date().getMilliseconds())
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
    const [images,setImages] = useState([])
    return (
        <div className={classes.dialogRoot}>
            <div className={classes.left}>
                {res && res.submitUser.map((k) => {
                    if (k.submitId) {
                        //console.log(k.userRealName)
                        return <Tooltip content={k.userRealName} key={k.openId}>
                            <Avatar src={k.userAvatar} className={classes.avatar} onClick={() => {
                                res.submitUser.forEach((key) => {
                                    if (key.submitId == k.submitId) {
                                        setImages(key.submitCover.split("|"))
                                    }
                                })
                            }}>

                            </Avatar>
                        </Tooltip>
                    }
                })}
            </div>
            <div className={classes.right}>
                {images & images.map(key => {
                    return <Image
                        isBlurred
                        key={key}
                        height={240}
                        width={240}
                        src={key}
                        alt="NextUI Album Cover"
                        classNames="m-5"
                    />
                })}
            </div>
        </div>
    );
}

export default AnswerDialog;