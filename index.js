const fs = require('fs');
const crypto = require('crypto');

/**
 * 计算给定文件的 MD5 值
 * @param filepath
 * @return {Promise}
 */
function md5(filepath) {
    return new Promise(function (resolve, reject) {
        const md5Hash = crypto.createHash('md5');
        let stream = fs.createReadStream(filepath);
        stream.on('data', function (data) {
            md5Hash.update(data, 'utf8')
        });
        stream.on('end', function () {
            let result = md5Hash.digest('hex');
            resolve(result)
        });
        stream.on('error', function (err) {
            if (err.code === 'ENOENT') {
                reject(new Error(`文件 MD5 计算失败，因为文件不存在 ${filepath}`))
            } else {
                reject(err);
            }
        })
    });
}

module.exports = md5;