import React from 'react';
import PropTypes from 'prop-types';
import classes from "./WorkCard.module.css"
import {Card, CardBody, CardFooter, CardHeader, Divider, Link, Image} from "@nextui-org/react";

WorkCard.propTypes = {};

function WorkCard(props) {
    return (
        <div className={`max-w-[400px] ${props.className}`}>
            <Card
                shadow={'lg'}
                style={{
                    backdropFilter: 'blur(10px)'
                }}
                //isPressable={true}
            >
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={props.icon}
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{props.subject}作业</p>
                        <p className="text-small text-default-500">{props.time}</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p>{props.content}</p>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <Link
                        isExternal
                        isBlock={true}
                        showAnchorIcon
                        onPress={props.onClick}
                        onPressStart={() => {
                            window.workId = props.workId
                            //这方法是不是有点奇怪？我只能写出这样的代码了
                            //经过测试 设置workId会比发送请求提前50-100ms
                            //console.log("click:" + new Date().getMilliseconds())
                        }}
                    >
                        查看详情
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default WorkCard;