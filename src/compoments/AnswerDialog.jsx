import React, {useEffect, useState} from 'react';
import classes from "./AnswerDialog.module.css";
import {Avatar, Button, Input, Select, SelectItem, Switch, Textarea, Tooltip} from "@nextui-org/react";
import axios from "axios";
import {Image} from "@nextui-org/react";

function AnswerDialog(props) {
    function LockIcon(props) {
        return null;
    }

    const [res, setRes] = useState("")
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
            window.classId = response.data.data.workClass
        })
    }, []);
    const [clicked, setClicked] = useState(0)
    const [images, setImages] = useState([])
    return (
        <div className={classes.dialogRoot}>
            <div className={classes.left}>
                {res && res.submitUser.map((k) => {
                    if (k.submitId) {
                        //console.log(k.userRealName)
                        return <Tooltip content={k.userRealName} key={k.openId}>
                            <Avatar src={k.userAvatar} className={`${classes.avatar}  ${k.userAvatar===clicked?classes.selected:''}`} onClick={() => {
                                setClicked(k.userAvatar)
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
            <div className={/*res.cardId?classes.rightExcel:*/classes.right}>
                {res.cardId ? <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=https://lulu.pprocket.cn/card/${window.classId}and${res.cardId}`}
                    className={classes.excel}></iframe> : images ? images.map(key => {
                    //console.log(key)
                    return <Image
                        src={key}
                        className={classes.image + ''}
                        key={key}
                    >
                    </Image>
                }) : <div/>}
            </div>
        </div>
    );
}

export default AnswerDialog;