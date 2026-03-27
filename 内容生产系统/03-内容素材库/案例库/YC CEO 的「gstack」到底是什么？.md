---
title: "YC CEO 的「gstack」到底是什么？"
source: "https://mp.weixin.qq.com/s?__biz=MzkwOTMzMzk0MQ==&mid=2247499974&idx=1&sn=b418585e93ba2fff3513581594b52d13&chksm=c0281e7a0fafc67369045f8b547e9c07999a77f0ff19aaf472d992edcdf933eeb9b1402376a8&mpshare=1&scene=1&srcid=0324x9qVtORvNNusTzfAa6N5&sharer_shareinfo=2c84b46d54c0563f49c2ffb4b78dfa91&sharer_shareinfo_first=2c84b46d54c0563f49c2ffb4b78dfa91"
author:
  - "[[renee创业狗]]"
published:
created: 2026-03-27
description: "Use Garry Tan\x26#39;s exact Claude Code setup: 15 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA"
tags:
  - "案例库"
---
原创 renee创业狗 *2026年3月22日 16:32*

YC CEO Garry Tan 用 **gstack** ，把 AI 变成了一个“可管理的工程团队”，并且亲测： **一个人可以写出原来需要 20 人团队才能完成的代码量** 。gstack 也在 Github 上获得了3万多 Star。Github 链接🔗：https://github.com/garrytan/gstack

![图片](https://mmbiz.qpic.cn/mmbiz_png/ibzstT0JU9nh1FDQ9ia5ccJPvAKQhicPX31LDGMYV47cNYqdVdRgT2ibWcpWHlrQABKt3kYxKG1b9LERNvhwOp6L2u7iap6M92ibwSjAyebrUOtXo/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

YC CEO Garry Tan 用 **gstack** 在过去 60 天里：

- 写了 **60 万行生产代码**
- 其中 **35% 是测试代码**
- 每天产出 **1万～2万行可用代码**
- 同时还在做 YC CEO 的全职工作

最近 7 天的数据：

- 140,751 行新增代码
- 362 次 commit
- 净增长约 115k LOC

👉 同一个人：

- 2013 年：772 次 GitHub contributions
- 2026 年截止到目前：1237 次 contributions（而且还在快速增长）
	![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**差别不在人，而在工具。**

## 🧠 gstack：把 AI 变成“工程团队”

gstack 本质上不是一个简单的 coding tool，而是一个：

> **AI 软件工厂（AI-native software factory）**

它做了一件非常关键的事情：

👉 把 Claude Code 变成一个“可分工、可管理”的团队

包括：

- 一个 **CEO** ：重新思考产品方向
- 一个 **工程经理** ：锁定系统架构
- 一个 **设计师** ：避免 AI 生成的“垃圾设计”
- 一个 **偏执审查员** ：找生产环境 bug
- 一个 **QA 负责人** ：真实打开浏览器测试
- 一个 **发布工程师** ：负责上线 PR

总共：

- **18 个专家角色**
- **7 个核心工具**
- 全部通过 **slash commands（斜杠命令）调用**

## ⚙️ 它到底解决了什么问题？

传统 AI coding 最大的问题是只有“写代码能力”，没有“工程体系能力”。而 gstack 做的是：把“工程流程”结构化成 AI 可执行的系统。也就是说，它不仅帮你写代码，还帮你：

- 做产品思考
- 做架构决策
- 做代码评审
- 做测试验证
- 做上线流程

👉 从“写代码”升级到“完整软件交付”。这也是为什么生产力会指数级提升。

## 👥 适合谁用？

Garry 给了很清晰的定位：

### 1️⃣ 创始人 / CEO（尤其是技术背景）

> 一个人，干出 20 人团队的活

### 2️⃣ Claude Code 新手

> 不再面对空白 prompt，而是结构化流程

### 3️⃣ Tech Lead / Staff Engineer

> 把 review、QA、release 自动化

## ⚡ 10 分钟上手流程

作者给了一个非常实用的最小路径：

1. 安装 gstack（30 秒）
2. `/office-hours` ：描述你要做什么（先帮你重构问题）
3. `/plan-ceo-review` ：评审你的功能想法
4. `/review` ：检查代码分支
5. `/qa` ：对 staging 环境做测试

👉 5 分钟内就能跑出第一个结果

> Don’t player hate — appreciate.

这波不是 hype，是生产力范式的变化。你可以选择观望，也可以现在就开始用。但可以确定的是： **软件开发，已经进入下一个时代了。**

## 试用

还是同样，我用 AntiGravity 去安装。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

试着运行一下。然后这个 skills 就开始按照它的规则，去帮我更好地构建我想要的项目了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

Renee 创业随笔

向上滑动看下一个