import {useState} from 'react'
import classes from './App.module.css'
import '/style.css'
import '/dist/output.css'
import {Avatar, Button, Code, Link, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className={classes.root}>
                <div className={classes.topNav}>
                    <Link className={classes.navBtn} isBlock={true}>
                        首页
                    </Link>
                    <Link className={classes.navBtn} isBlock={true}>
                        作业
                    </Link>
                    <Link className={classes.navBtn} isBlock={true}>
                        网盘
                    </Link>
                    <Link className={classes.navBtn} href={'/login'} isBlock={true}>
                        登录
                    </Link>
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" className={classes.avatar}/>
                </div>
                <div className={classes.content}>
                    <Routes>
                        <Route path={'/login'} element={<LoginPage/>}/>
                    </Routes>
                </div>

            </div>
        </>
    )
}

export default App
