# youdao-cli-translator

[![CircleCI](https://circleci.com/gh/tsq/youdao-cli-translator/tree/main.svg?style=svg)](https://circleci.com/gh/tsq/youdao-cli-translator/tree/main)

一个Node.js命令行工具，用于实现中英互译! 

![](./screenshot/usage.png)

## 使用须知

该工具的翻译API是基于[有道智云](https://ai.youdao.com/login.s)的文本翻译服务，所以使用前，你自己需要先在有道智云上新建一个应用(参考该文档的最后部分)，获取到应用的ID和KEY，获取到之后，只要添加下面两个环境变量即可：

```sh
export YOUDAO_APP_ID=应用的ID
export YOUDAO_APP_KEY=应用的KEY
```

有道智云会为每位新用户提供100元的免费额度，如果是用于个人日常翻译的话，100元我想可以用一辈子了(*PS.我自己用了1年多，目前为止只被扣掉了5毛钱！*)。

## 安装

```sh
npm i -g youdao-cli-translator
```

## 使用方法

安装之后，会产生一个全局的命令`t`，只需要在`t`后面加上想要翻译的单词即可:

```sh
t hello
t 你好
```

如果是一个句子，需要用引号括起来:

```sh
t 'how are you'
```

## 在有道智云上新建一个应用

1. 打开：https://ai.youdao.com/login.s ，用手机或微信号完成登录。
2. 进入控制台后，在左侧**应用管理**中点击菜单项:**我的应用**
3. 点击“创建应用”。
4. 填写"应用名称"和"接入方式", "接入方式"一定要选择**API**。
5. 接着会跳到“应用信息预览”页面，点击“绑定服务”，勾选**自然语言翻译服务-文本翻译**。
6. 创建成功后，即可在应用详情中获取到应用的ID和KEY了。

![](./screenshot/help.png)