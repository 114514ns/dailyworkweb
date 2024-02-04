import React, {Component} from 'react';
import classes from "./LoginPage.module.css";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import axios from "axios";
import {toast, ToastContainer, Zoom} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Navigate} from "react-router-dom";
import {QRRandRect} from "react-qrbtf";

class LoginPage extends Component {
    state = {
        isVisible: false,
        phone: "",
        password: "",
        success: true,
        redirect: false,
        uuid: "",
    }

    componentDidMount() {
        axios.post('https://api-prod.lulufind.com/api/v1/auth/genQrCode', {})
            .then(res => {
                this.setState({
                    uuid: res.data.data.code
                })
                const interval = setInterval(() => {
                    axios.post("https://api-prod.lulufind.com/api/v1/auth/checkQrCode", {
                        code: this.state.uuid
                    }).then(response => {
                        if (response.data.data.token) {
                            console.log("token: " + response.data.data.token)
                            localStorage.setItem("token", response.data.data.token)
                            localStorage.setItem("avatar", response.data.data.user.userAvatar)
                            localStorage.setItem("isLogin", "true")
                            this.showToast(true)
                            this.setState({redirect: true})
                            clearInterval(interval);
                        }
                    })
                }, 1000);
            })
    }


    render() {

        return (
            <div className={classes.root}>
                <div className={classes.passwd}>
                    <Input
                        label="Password"
                        variant="bordered"
                        size={"lg"}
                        isRequired={true}
                        onChange={e => this.setState({"phone": e.target.value})}
                        placeholder="输入你的手机号"
                        className={`max-w-xs ${classes.element}`}
                    />
                    <Input
                        label="Password"
                        variant="bordered"
                        size={"lg"}
                        isRequired={true}
                        placeholder="输入你的密码"
                        type={'password'}
                        onChange={e => this.setState({"password": e.target.value})}
                        className={`max-w-xs ${classes.element}`}
                    />
                    <Button color="primary" className={classes.element}
                            onClick={e => this.login(this.state.phone, this.state.password)}
                    >
                        登录
                    </Button>
                </div>
                <div className={classes.qrbin}>
                    <QRRandRect
                        value={`https://zuoye.lulufind.com/mp/qrcode/${this.state.uuid}`}
                        className={classes.qrcode}
                        styles={{svg: {width: "200px"}}}
                        type="round"
                        size={50}
                        opacity={100}
                        posType="planet"
                        otherColor="#33CCCC"
                        posColor="#009999"
                    />
                </div>
                {this.state.redirect ? <Navigate to={'/list/1'}/> : <div></div>}
            </div>
        );
    }

    login(phone, password) {

        axios.post('https://api-prod.lulufind.com/api/v1/auth/smslogin', {
            phone: phone,
            password: password
        })
            .then(res => {
                const token = res.data.data.accounts[0].token;
                if (token) {
                    localStorage.setItem("token", token)
                    localStorage.setItem("phone", phone)
                    localStorage.setItem("password", password)
                    localStorage.setItem("avatar", res.data.data.accounts[0].user.userAvatar)
                    this.setState({
                        redirect: true
                    })
                    this.showToast(true)

                } else {
                    this.showToast(false)
                }
            })

    }

    showToast(type) {
        if (type === true) {
            toast.success('🦄 登录成功', {
                position: "top-right",
                autoClose: 1900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                //transition:{Zoom},
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            console.log("Password wrong")
            toast.error('🦄 密码错误', {
                position: "top-right",
                autoClose: 1900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                //transition:{Zoom},
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

}

export default LoginPage;