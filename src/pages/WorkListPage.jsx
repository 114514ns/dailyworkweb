import React, {useEffect, useState} from 'react';
import classes from './WorkList.module.css'
import axios from "axios";
import WorkCard from "../compoments/WorkCard.jsx";
import {AnimatePresence, motion, useScroll, useSpring} from "framer-motion";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Button, Checkbox, Input, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination, Select, SelectItem, Switch,
    useDisclosure
} from "@nextui-org/react";
import AnswerDialog from "../compoments/AnswerDialog.jsx";
import * as PropTypes from "prop-types";



function LockIcon(props) {
    return null;
}

LockIcon.propTypes = {className: PropTypes.string};

function MailIcon(props) {
    return null;
}

MailIcon.propTypes = {className: PropTypes.string};

function WorkListPage(props) {

    let {id} = useParams()
    const [response, setResponse] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setLoading] = useState(true)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen2, onOpen2, onOpenChange2} = useDisclosure();
    const dates = [];
    var today = new Date(); // 获取当前日期
    console.log(tomorrow)

    function addZero(num) {
        return num < 10 ? '0' + num : num; // 如果小于10，前面补0
    }

    for (let i = 0; i < 5; i++) {
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        var year = today.getFullYear(); // 获取年份
        var month = today.getMonth() + 1; // 获取月份（注意月份要加1）
        var day = today.getDate(); // 获取日期
        var hours = today.getHours(); // 获取小时数
        var minutes = today.getMinutes(); // 获取分钟数
        var seconds = today.getSeconds(); // 获取秒数
        var formattedDate = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
        dates.push({
            label: `${formattedDate}`

        })
        today = tomorrow
    }
    useSpring({
        from: {x: 0},
        to: {x: 100},
    });
    useEffect(() => {
        setLoading(true)
        window.workId = 114514
        window.workDetail = "作业内容"
        axios({
            url: 'https://lulu.lulufind.com/mrzy/mrzypc/findWorkNewVersion',
            params: {
                "start": (Number(id) - 1) * 12,
                "num": "12",
            },
            method: "POST"
        }).then(res => {
            setResponse(res.data.data)
            setLoading(false)
        })
    }, [location]);

    let arr = new Array(10)
    arr.length = 10
    const toManagePage = (page) => {
        navigate("/list/" + page);
    };
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const getType = (type) => {
        let value = "";
        switch (type) {
            case 1:
                value = "语文"
                break;
            case 2:
                value = "数学"
                break;
            case 3:
                value = "英语"
                break;
            case 4:
                value = "物理"
                break;
            case 5:
                value = "化学"
                break;
            case 6:
                value = "政治"
                break;
            case 7:
                value = "历史"
                break;
            case 8:
                value = "地理"
                break;
            case 9:
                value = "生物"
                break;
            default:
                value = "其他"
        }
        return value;
    }
    return (
        <AnimatePresence>
            <motion.div
                className={`${classes.root} animate__fadeInDown`}
                initial={{opacity: '0'}}
                animate={{opacity: '100%'}}
                exit={{opacity: '0'}}
            >
                {(
                    response.map((key, v) => {
                        return (v < 12 ? (
                            <React.Fragment key={key.workId}>
                                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} style={scaleX}>
                                    <WorkCard className={classes.card} content={key.workDetail} time={key.workTime}
                                              icon={`https://img2.lulufind.com/icon_subject_${key.workType}.png`}
                                              subject={getType(key.workType)} onClick={onOpen} workId={key.workId}/>
                                </motion.div>
                            </React.Fragment>
                        ) : null);
                    })
                )}
                {isLoading ? <div></div> : <Pagination total={10} initialPage={Number(id)}
                                                       color={"danger"}
                                                       onChange={page => toManagePage(page)}
                                                       showControls={true}
                                                       showShadow={true}
                />}
                <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    className={classes.dialog}
                    onOpenChange={onOpenChange}
                    size={'5xl'}
                    motionProps={{
                        variants: {
                            enter: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                    ease: "easeOut",
                                },
                            },
                            exit: {
                                y: -20,
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeIn",
                                },
                            },
                        }
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">作业详情</ModalHeader>
                                <ModalBody>
                                    <AnswerDialog/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        关闭
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        删除作业
                                    </Button>
                                    <Button color="primary" onPress={e => {
                                        const currentDate = new Date();
                                        const year = currentDate.getFullYear();
                                        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                                        const day = currentDate.getDate().toString().padStart(2, '0');
                                        const hours = '00';
                                        const minutes = '00';
                                        const seconds = '00';
                                        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                        response.forEach(ele => {
                                            if (ele.workId == window.workId) {
                                                window.workDetail = ele.workDetail
                                            }
                                        })

                                        axios({
                                            url: 'https://lulu.lulufind.com/mrzy/mrzypc/updateWork',
                                            method: 'post',
                                            params: {
                                                workId: window.workId,
                                                workRemark: formattedDate,


                                            }
                                        })
                                        console.log(window.workId)
                                        console.log(window.workDetail)
                                        console.log(formattedDate)
                                    }}
                                    >
                                        修改作业
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <>
                    <>
                        <Button onPress={onOpen2} color="primary">Open Modal</Button>
                        <Modal
                            isOpen={true}
                            onOpenChange={onOpenChange2}
                            placement="top-center"
                        >
                            <ModalContent>
                                {(onClose2) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">修改作业</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                label="作业id"
                                                value={window.workId}
                                                variant="bordered"
                                                disabled
                                            />
                                            <Input
                                                endContent={
                                                    <LockIcon
                                                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                                }
                                                label="作业内容"
                                                value={window.workDetail}
                                                variant="bordered"
                                            />
                                            <Select
                                                label="截至时间"
                                                className="max-w-xs"
                                            >
                                                {dates.map(key => {
                                                    return <SelectItem key={key.value} value={key.value}>
                                                        {key.label}
                                                    </SelectItem>
                                                })}
                                            </Select>
                                            <Switch defaultSelected>
                                                允许补交
                                            </Switch>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="flat" onPress={onClose2}>
                                                取消
                                            </Button>
                                            <Button color="primary" onPress={onClose2}>
                                                确认修改
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                </>
            </motion.div>

        </AnimatePresence>
    );

}

export default WorkListPage;