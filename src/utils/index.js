/**
 * @description 封装json格式化, 避免error
 * @param {string} jsonStr 格式化的json字符串
 * @return {any} 格式化完成的数据
 */
export const getJsonParse = (jsonStr) => {
    let res = '';
    try {
        res = JSON.parse(jsonStr);
    } catch (e) {
        if (typeof jsonStr === "string") {
            res = jsonStr;
        } else {
            res = '';
            console.log(e);
        }
    }
    return res;
}

/**
 * @description 下载文件
 * @param {string} href 下载地址
 * @param {string} fileName 下载文件名称
 */
export const downloadFileUrl = (href, fileName = +new Date()) => {
    const downloadElement = document.createElement('a');
    downloadElement.href = href;
    // 下载后文件名
    downloadElement.download = fileName;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    // 释放掉blob对象
    window.URL.revokeObjectURL(href);
    downloadElement.href = '';
}

/**
 * @classdesc 对localStorage的封装 新增expired过期时间 获取过期的entries将返回空并清空对应的值
 */
class useStorage {
    /**
     * 额外设置一条 `key__expires__: 时间戳` 的storage来判断过期时间
     * @param {string} key
     * @param {any} value
     * @param {number} expired 过期时间 以分钟为单位
     * @returns {any}
     */

    setItem(key, value, expired) {
        localStorage[key] = JSON.stringify(value);
        if (expired) {
            localStorage[`${key}__expires__`] = Date.now() + 1000 * 60 * expired;
        }
        return value;
    }

    /**
     * 获取storage时先获取`key__expires__`的值判断时间是否过期 过期则清空该两条storage 返回空
     * @param {string} key
     * @returns {any}
     */
    getItem(key) {
        let expired = localStorage[`${key}__expires__`] || Date.now + 1;
        const now = Date.now();

        if (now >= expired) {
            localStorage.removeItem(key);
            localStorage.removeItem(`${key}__expires__`);
            return;
        }
        return localStorage[key] ? JSON.parse(localStorage[key]) : localStorage[key];
    }
}

export const storage = new useStorage();