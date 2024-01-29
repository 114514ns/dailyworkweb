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
        })
    }, []);
    const [clicked, setClicked] = useState(false)
    const [images, setImages] = useState([])
    return (
        <div className={classes.dialogRoot}>
            <div className={classes.left}>
                {res && res.submitUser.map((k) => {
                    if (k.submitId) {
                        //console.log(k.userRealName)
                        return <Tooltip content={k.userRealName} key={k.openId}>
                            <Avatar src={k.userAvatar} className={classes.avatar} onClick={() => {
                                setClicked(true)
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
                <div className={classes.leftRight}>
                    {images ? images.map(key => {
                        //console.log(key)
                        return <Image
                            src={key}
                            className={classes.image}
                            key={key}
                        >

                        </Image>
                    }) : <div/>}
                </div>
                <div className={`${classes.right} ${clicked?classes.hide:''}`}>
                    <Input
                        label="作业id"
                        value={window.workId}
                        variant="bordered"
                        disabled
                        className={`${classes.margin}`}
                    />
                    <Textarea
                        endContent={
                            <LockIcon
                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                        }
                        label="作业内容"
                        value={window.workDetail}
                        variant="bordered"
                        //className={`${classes.margin}`}
                    />
                    <Select
                        label="截至时间"
                        className={`max-w-xs ${classes.margin}`}
                    >
                        {props.dates.map(key => {
                            return <SelectItem key={key.value} value={key.value}>
                                {key.label}
                            </SelectItem>
                        })}
                    </Select>
                    <Switch defaultSelected
                            className={`${classes.margin}`}
                    >
                        允许补交
                    </Switch>
                    <div className={classes.btns}>
                        <Button color="danger" variant="flat" onPress={() => {
                        }} className={`${classes.margin}`}>
                            取消
                        </Button>
                        <Button color="primary" onPress={() => {

                        }} className={`${classes.margin}`} variant={"flat"}>
                            确认修改
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerDialog;