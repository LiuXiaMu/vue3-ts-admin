export interface ListInt {
    id: number,
    userId: number,
    title: string,
    introduce: string
}
interface selectData {
    title: string,
    introduce: string,
    page: number,
    size: number,
    count: number
}

export class InitData {
    selectData: selectData = {
        title: "",
        introduce: "",
        page: 1,
        size: 5,
        count: 0
    }
    initList: ListInt[] = [] //保存最初的数据用于初始化
    list: ListInt[] = [] //展示的内容数据
}