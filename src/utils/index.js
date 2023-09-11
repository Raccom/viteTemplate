/**
 * @description 生成 16 进制指定长度的字符串
 */
function getRandom(len) {
    return Math.floor((1 + Math.random()) * (16 ** len))
        .toString(16)
        .substring(1);
}

/**
 * @description 生成随机id
 * @param prefix {string} id前缀
 * @return {string} 生成的id
 */
export function getId(prefix = 't') {
    return `${prefix ? `${prefix}-` : ''}${getRandom(5)}${getRandom(3)}-${getRandom(4)}`;
}

/**
 * @description 封装json格式化, 避免error
 * @param jsonStr {string} 格式化的json字符串
 * @return {any} 格式化完成的数据
 */
export function getJsonParse(jsonStr) {
    let res = '';
    try {
        res = JSON.parse(jsonStr);
    } catch (e) {
        console.log(e);
        res = '';
    }
    return res;
}

/**
 * @description 下载文件
 * @param href {string} 下载地址
 * @param fileName {string} 下载文件名称
 */
export function downloadFileUrl(href, fileName = +new Date()) {
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