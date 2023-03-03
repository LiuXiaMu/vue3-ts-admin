const source: any = window.localStorage
type StrNum = number | string
function setLocal(key: StrNum, value: any, expired: number = 7200) {
    /*
    * set 存储方法
    * @ param {String} key 键
    * @ param {String} value 值，
    * @ param {String} expired 过期时间，以分钟为单位，非必须，默认15天
    */
    let data = {
        data: value,
        expired: Date.now() + (expired * 1000 * 60)
    }
    source[key] = JSON.stringify(data)
    return value
}
function getLocal(key: StrNum) {
    /*
    * get 获取方法
    * @ param {String} key 键
    * @ param {String} expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now()+1
    */
    let data: any = source[`${key}`] ? JSON.parse(source[`${key}`]) : ""
    let expired: StrNum = data.expired || Date.now() + 1
    const now = Date.now()
    if (now >= expired) {
        remove(key)
        return
    }
    const value = data
    return value
}

function remove(key: StrNum) {
    let value = source[key]
    delete source[key]
    return value
}
export { setLocal, getLocal }