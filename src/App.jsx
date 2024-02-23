import React, {useState} from 'react'
import classes from './App.module.css'
import '/style.css'
import '/src/dist/output.css'
import {AnimatePresence} from "framer-motion";
import {
    Avatar,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Link,
    Button
} from "@nextui-org/react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import WorkListPage from "./pages/WorkListPage.jsx";
import {ToastContainer, Zoom} from "react-toastify";
import "@material/web/button/filled-tonal-button.js";


function App() {
    const items = [
        {
            key: "source",
            label: "源码",
        },
        {
            key: "logout",
            label: "注销",
        },
        {
            key: "login",
            label: "登录"
        },
        {
            key: "work",
            label: "作业"
        }
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const navLogin = () => {
        navigate('/login')
    }
    const navList = () => {
        navigate(`/list/1`)
    }
    return (
        <>
            <div className='appRoot'>
                <div className={classes.topNav}>
                    {<div className={''}>

                        <md-filled-tonal-button onClick={navList} class={classes.navBtn}>作业</md-filled-tonal-button>
                        <md-filled-tonal-button onClick={navLogin} class={classes.navBtn}>登录</md-filled-tonal-button>
                    </div>}


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
                    <Dropdown backdrop={"blur"}>
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
                                        return
                                    }
                                    case "work": {
                                        navigate('/list/1')
                                        return;
                                    }
                                    case "login": {
                                        navigate('/login')
                                        return;
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
