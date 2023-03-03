export interface ListInt {
    name: string
    roleId: number
    roleList: ListInt[]
    viewRole: string
}
export class InitData {
    roleId: number
    authority: number[]
    constructor(roleId: number, authority: number[]) {
        this.roleId = roleId
        this.authority = authority
    }
    list: ListInt[] = []
    treeRef: any
}