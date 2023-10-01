import React, {useEffect, useState} from 'react';
import classes from './WorkList.module.css'
import axios from "axios";
import WorkCard from "../compoments/WorkCard.jsx";
import {AnimatePresence, motion, useScroll, useSpring} from "framer-motion";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Skeleton, useDisclosure
} from "@nextui-org/react";


function WorkListPage(props) {

    let {id} = useParams()
    const [response, setResponse] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setLoading] = useState(true)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const springs = useSpring({
        from: {x: 0},
        to: {x: 100},
    })
    useEffect(() => {
        console.log("executed")
        setLoading(true)
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
                                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} style={scaleX} >
                                    <WorkCard className={classes.card} content={key.workDetail} time={key.workTime} icon={`https://img2.lulufind.com/icon_subject_${key.workType}.png`} subject={getType(key.workType)} onClick={onOpen}/>
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
                    size={'4xl'}
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
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </motion.div>

        </AnimatePresence>
    );

}

export default WorkListPage;