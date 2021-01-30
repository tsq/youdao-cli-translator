const chalk = require('./utils/chalk');
const lib = require('./lib');

const outputYoudao = body => {
    console.log(chalk('yellow'), '翻译:', chalk('red'), body.translation[0]);

    if (body.basic) {
        let basic = body.basic;
        const usPho = basic['us-phonetic'];
        const pho = basic['phonetic'];
        const ukPho = basic['uk-phonetic'];
        const examType = basic['exam_type'];
        if (pho && usPho && ukPho) {
            console.log(chalk('yellow'), '音标:', chalk('cyan'), `默认:[${pho}]`, chalk('green'), `美式:[${usPho}]`, chalk('magenta'), `英式:[${ukPho}]`);
        } else if (pho && usPho) {
            console.log(chalk('yellow'), '音标:', chalk('green'), `美式:[${usPho}]`);
        } else if (pho && ukPho) {
            console.log(chalk('yellow'), '音标:', chalk('magenta'), `英式:[${ukPho}]`);
        } else if (pho) {
            console.log(chalk('yellow'), '音标:', chalk('cyan'), `默认:[${pho}]`);
        }

        if (examType && examType.length) {
            console.log(chalk('yellow'), '考试:', chalk('cyan'), examType.join(', '));
        }
        console.log(chalk('yellow'), '释义:');

        basic.explains.forEach((item, index) => {
            console.log(chalk('white'), `  ${index + 1}.`, chalk('cyan'), item);
        });
    }
    if (body.web) {
        let web = body.web;
        console.log(chalk('yellow'), '其他:');
        web.forEach((item, index) => {
            console.log(chalk('white'), `  ${index + 1}.`, chalk('gray'), item.key);
            console.log(chalk('cyan'), '      ' + item.value.toString());
        });
    }
};

module.exports = async word => {
    const data = await lib(word);
    outputYoudao(data);
}