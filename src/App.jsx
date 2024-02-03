import React, {useEffect, useState} from 'react'
import classes from './App.module.css'
import '/style.css'
import '/src/dist/output.css'
import {AnimatePresence, motion, MotionConfig, useMotionValue} from "framer-motion";
import {
    Avatar,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Link,
    Button
} from "@nextui-org/react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import WorkListPage from "./pages/WorkListPage.jsx";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {ToastContainer, Zoom} from "react-toastify";
import barba from '@barba/core';
function App() {
    const [count, setCount] = useState(0)

    const items = [
        {
            key: "source",
            label: "github",
        },
        {
            key: "logout",
            label: "注销",
        },
    ];

    const location = useLocation();
    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0
                });
            }
        }]
    });
    return (
        <>
            <div className='appRoot'>
                <div className={classes.topNav}>
                    <div className={''}>
                        <Button className={classes.navBtn} isBlock={true} as={Link}>
                            首页
                        </Button>
                        <Button className={classes.navBtn} isBlock={true} href={'/list/1'} as={Link}>
                            作业
                        </Button>
                        <Button className={classes.navBtn} isBlock={true} as={Link}>
                            网盘
                        </Button>
                        <Button className={classes.navBtn} href={'/login'} isBlock={true} as={Link}>
                            登录
                        </Button>
                    </div>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1900}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    transition={Zoom}
                    pauseOnHover
                    theme="colored"
                />
                <ToastContainer/>
                <div className={classes.avatarRoot}>
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar src={localStorage.getItem("avatar")} size="lg"
                                    className={classes.avatar}/>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            items={items}
                            onAction={key => {
                                switch (key) {
                                    case "source": {
                                        window.open('https://github.com/114514ns/dailyworkweb')
                                    }
                                }
                            }}
                        >
                            {(item) => (
                                <DropdownItem
                                    key={item.key}
                                    color={item.key === "logout" ? "danger" : "default"}
                                    className={item.key === "logout" ? "text-danger" : ""}
                                >
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className={classes.content}

                >
                    <AnimatePresence mode={'wait'}>
                        <Routes key={location.pathname} location={location}>
                            <Route path={'/login'} element={<LoginPage/>}/>
                            <Route path={'/list/:id'} element={<WorkListPage/>}/>
                        </Routes>
                    </AnimatePresence>
                </div>

            </div>
        </>
    )

}

export default App
