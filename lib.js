const sha256 = require('./utils/sha256');
const axios = require('./utils/http');
const qs = require('./utils/qs');

const YOUDAO_APP_ID = process.env.YOUDAO_APP_ID;
const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY;

if (!YOUDAO_APP_ID || !YOUDAO_APP_KEY) {
    console.error('缺少有道APPID和APPKEY，请参考这篇文档进行配置: https://github.com/tsq/youdao-cli-translator');
    process.exit(3);
}

/**
 * doc: https://ai.youdao.com/docs/doc-trans-api.s#p07
 */
const run = async q => {
    const from = 'auto';
    const to = 'auto';
    const salt = new Date().getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const str1 = YOUDAO_APP_ID + q + salt + curtime + YOUDAO_APP_KEY;
    const sign = sha256(str1);
    const config = { q: encodeURIComponent(q), appKey: YOUDAO_APP_ID, salt, from, to, curtime, sign, signType: 'v3' };
    const params = qs.stringify(config);

    try {
        const response = await axios(params);
        const data = JSON.parse(response);
        if (data.errorCode !== '0') {
            console.error('error happened! here is response json:');
            console.log(data);
            console.log('find the reason from: https://ai.youdao.com/docs/doc-trans-api.s#p05')
            process.exit(4);
        }
        return data;
    } catch (error) {
        console.error(error);
        console.log('connection fail!');
        process.exit(2);
    }
};

module.exports = run;
