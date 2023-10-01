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
                      backdropFilter : 'blur(10px)'
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
                    >
                        查看详情
                    </Link>
                </CardFooter>
                <div style={{ backgroundImage: 'url(image.jpg)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}></div>
            </Card>
        </div>
    );
}

export default WorkCard;