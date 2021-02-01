const sha256 = require('./utils/sha256');
const md5 = require('./utils/md5');
const baidu_http = require('./utils/baidu_http');
const youdao_http = require('./utils/youdao_http');
const qs = require('./utils/qs');

const YOUDAO_APP_ID = process.env.YOUDAO_APP_ID;
const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY;
const BAIDU_APP_ID = process.env.BAIDU_APP_ID;
const BAIDU_APP_KEY = process.env.BAIDU_APP_KEY;

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
        const response = await youdao_http(params);
        const data = JSON.parse(response);
        const errorCode = data.errorCode;
        if (errorCode !== '0') {
            if (errorCode === '202') {
                if (BAIDU_APP_ID && BAIDU_APP_KEY) {
                    const appid = BAIDU_APP_ID;
                    const strToBeMD5 = appid + q + salt + BAIDU_APP_KEY;
                    const baidSign = md5(strToBeMD5);
                    const config = {
                        q: encodeURIComponent(q),
                        from,
                        to,
                        salt,
                        appid,
                        sign: baidSign
                    };

                    const baiduResponse = await baidu_http(qs.stringify(config));
                    const baiduData = JSON.parse(baiduResponse);
                    return {
                        data: baiduData['trans_result'][0].dst,
                        from: 'baidu'
                    };
                } else {
                    console.error('抱歉！！！翻译不了。');
                    process.exit(5);
                }
            } else {
                console.error('error happened! here is response json:');
                console.log(data);
                console.log('find the reason from: https://ai.youdao.com/docs/doc-trans-api.s#p05')
                process.exit(4);
            }
        }
        return {
            data,
            from: 'youdao'
        };
    } catch (error) {
        console.error(error);
        console.log('connection fail!');
        process.exit(2);
    }
};

module.exports = run;
