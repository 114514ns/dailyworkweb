import React, {Component} from 'react';
import classes from "./LoginPage.module.css";
import {Button, Input} from "@nextui-org/react";
class LoginPage extends Component {
    state = {
        isVisible : false,
        phone : "",
        password: ""
    }
    render() {
        return (
            <div className={classes.root}>
                <Input
                    label="Password"
                    variant="bordered"
                    size={"lg"}
                    isRequired={true}
                    onChange={e =>this.setState({"phone":e.target.value})}
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
                    onChange={e =>this.setState({"password":e.target.value})}
                    className={`max-w-xs ${classes.element}`}
                />
                <Button color="primary" className={classes.element} onClick={this.login()}>
                    登录
                </Button>
            </div>
        );
    }
    login() {

    }
}

export default LoginPage;