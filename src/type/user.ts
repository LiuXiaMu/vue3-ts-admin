export interface ListInt {
    id: number
    nickName: string
    // role: RoleInt[] //淦！ts真麻烦！
    role: any[]
    userName: string
}
interface RoleInt {
    role: number,
    roleName: string,
}
interface SelectDataInt {
    role: any[],
    nickName: string
}
interface RoleListInt {
    authority: number[]
    roleId: number
    roleName: string
}
export interface ActiveInt {
    id: number
    nickName: string
    role: number[]
    userName: string

}
export class InitData {
    selectData: SelectDataInt = {
        role: [0],
        nickName: "",
    }
    list: ListInt[] = [] //用户
    initList: ListInt[] = [] //保存最初的用户数据用于初始化
    roleList: RoleListInt[] = [] //角色
    isShow: boolean = false //编辑用户的弹窗显隐
    editUserTitle: string = "添加用户" // 添加用户/编辑信息
    active: ActiveInt = { //选中的数据
        id: 0,
        nickName: "",
        role: [],
        userName: ""
    }
}