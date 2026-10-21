# Visite guidée | 汉法展陈讲解视译

面向汉译法视译课程的纯静态教学网站，首个单元围绕大学校史馆与展陈讲解。

## 网站包含

- 讲解篇章结构：空间路线 + 时间叙事；五项讲解功能。
- 法国高校范例：Université de Strasbourg 的官方历史校园自助导览材料。
- [法国高校精读单元](parcours/strasbourg/)：8页官方手册的七站结构分析、书面指令与现场讲解的语体转换、5类表达、互动判断、排序练习、75秒法语讲解与 SISU 迁移练习。
- 功能分类法语表达库：中文释义、检索、复制。
- SISU 校史馆五组视译实训：原稿、信息层级标注、准备计时、法语口头示范、可选本地录音。
- 自评量表：信息、层级、参观者导向、法语自然度、连续性。
- 后续占位单元：城市简介、历史景点、博物馆。

## 本地打开

直接打开 `index.html`。部分浏览器出于安全原因，使用 `file://` 时会限制麦克风；部署到 HTTPS GitHub Pages 后可正常请求设备权限。其余功能不依赖在线服务。

## 在线网站

- 课程首页：https://chenfangchongqing-dev.github.io/visite-guidee/
- 斯特拉斯堡大学精读：https://chenfangchongqing-dev.github.io/visite-guidee/parcours/strasbourg/

网站发布配置：仓库 Settings → Pages → Deploy from a branch → main / (root)。

本站不依赖第三方跟踪、外部字体或 JS 库。录音、草稿、自评信息都保留在学生自己的浏览器或设备上，不上传到服务器。更换浏览器或清除浏览数据会丢失本地记录。

## 编辑内容

- `index.html`：页面组织和文字。
- `assets/styles.css`：响应式样式。
- `assets/content.js`：范例阅读、表达库、学生实训材料与教师示范译文。
- `assets/app.js`：筛选、标注、计时、录音、反馈等交互逻辑。
- `parcours/strasbourg/index.html`：法国大学原始材料精读单元的页面内容。
- `parcours/strasbourg/lesson.css`：该单元的响应式样式。
- `parcours/strasbourg/lesson.js`：功能识别、顺序重组、口头计时与本机笔记。

新增校史馆练习时，编辑 `assets/content.js` 中的 `exercises` 数组，沿用已有字段即可。

## 材料来源与审校边界

法国高校案例来自 Université de Strasbourg / Jardin des sciences：

- 项目说明：https://jardin-sciences.unistra.fr/scolaires/activites-au-jardin-des-sciences/offre-scolaire-pour-le-cycle-4/parcours-patrimoine
- 学生手册：https://jardin-sciences.unistra.fr/websites/jardin-sciences/Scolaires/Activites_au_Jardin_des_sciences/Cycle_4/Parcours-Palais-U.pdf
- 教师参考：https://jardin-sciences.unistra.fr/websites/jardin-sciences/Scolaires/Activites_au_Jardin_des_sciences/Cycle_4/Corrige-Parcours-Palais-U.pdf

中国校史材料来自课堂使用的《四川外国语大学校史馆讲解词》现场转写稿，并参考：

- 校史沿革：https://www.sisu.edu.cn/xxgk/lsyg/index.htm
- 官方法语简介：https://fr.sisu.edu.cn/wl/wv/
- 校训说明：https://news.sisu.edu.cn/tzgg/ccdbe463f0d447f99e07c2c56a900187.htm

**注意：** 法国材料是学校编制的 **自助参观活动手册**，不是现场讲解逐字稿；网站中的法语示范句均为课程作者的教学改写，不能署名为官方译文。SISU现场转写稿中部分历史人物、日期、展品型号有待对照展板核实；网站没有将存疑信息作为正式核定史实。
