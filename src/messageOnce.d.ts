declare module "*.js" {
    import domMessage from './plugins/messageOnce.js' //处理el-message重复弹出问题
    const messageOnce: any = new domMessage()
    export default messageOnce;
}