import service from ".";
import { LoginFormInt } from "@/type/login";
//登录
export function login(data: LoginFormInt) {
    return service({
        url: "/login",
        method: "post",
        data
    })
}
//商品列表
export function getGoodsList() {
    return service({
        url: "/getGoodsList",
        method: "get",
    })
}
//用户列表
export function getUserList() {
    return service({
        url: "/getUserList",
        method: "get",
    })
}
//角色列表
export function getRoleList() {
    return service({
        url: "/getRoleList",
        method: "get",
    })
}
//权限列表
export function getAuthorityList() {
    return service({
        url: "/getAuthorityList",
        method: "get",
    })
}