import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import md5 from 'js-md5';
import {toast} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </NextUIProvider>
)
axios.interceptors.request.use(config => {
    //console.log(JSON.parse(config.data))
    //console.log(config)
    // 在发送请求之前做些什么
    if (localStorage.getItem("token")) {
        var obj = localStorage.getItem("token")
        config.headers["token"] = obj
        config.headers["sign"] = getSign(config.params);
    }
    return config;
}, function (error) {
    //localStorage.clear()
    console.log(error)
    //location.replace("http://" + location.host)
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 如果请求错误
    //一般是token过期了
    if (error.code === "ERR_BAD_REQUEST") {
        console.log("Token过期")
        console.log(location.hostname)
        console.log(error)
        //localStorage.clear()
        //location.replace(`${location.protocol}//${location.host}/login`)
    }

    return Promise.reject(error);
});

function getSign(data) {
    var salt = "IF75D4U19LKLDAZSMPN5ATQLGBFEJL4VIL2STVDBNJJTO6LNOGB265CR40I4AL13"
    var varl = {};
    for (var n in data) {
        varl[n] = data[n] + "";
    }
    var d = JSON.stringify(varl);
    d = btoa(d) + salt;
    var u = md5(d)
    return u
}
