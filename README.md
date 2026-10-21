# Visite guidée | 汉法展陈讲解视译

面向汉译法视译课程的纯静态教学网站，首个单元围绕大学校史馆与展陈讲解。

## 网站包含

- 讲解篇章结构：空间路线 + 时间叙事；五项讲解功能。
- 法国高校范例：Université de Strasbourg 的官方历史校园自助导览材料。
- 功能分类法语表达库：中文释义、检索、复制。
- SISU 校史馆五组视译实训：原稿、信息层级标注、准备计时、法语口头示范、可选本地录音。
- 自评量表：信息、层级、参观者导向、法语自然度、连续性。
- 后续占位单元：城市简介、历史景点、博物馆。

## 本地打开

直接打开 `index.html`。部分浏览器出于安全原因，使用 `file://` 时会限制麦克风；部署到 HTTPS GitHub Pages 后可正常请求设备权限。其余功能不依赖在线服务。

## GitHub Pages 发布

1. 在 https://github.com/new 新建 **public** 仓库 `visite-guidee`，建议不要预先生成 README、许可证或 `.gitignore`（方便一次性上传）。
2. 上传此文件夹中的 `index.html`、`assets/`、`.nojekyll` 和 `README.md` 到仓库根目录。
3. 在仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**、`main`、`/(root)`，保存。
4. 等待构建完成后访问 `https://<你的 GitHub 用户名>.github.io/visite-guidee/`。

此站点无第三方跟踪、无外部字体或 JS 库。录音、练习草稿、评分等不会提交到服务器；笔记与评分保存在用户浏览器 localStorage。下载的录音仅在本机处理。更换浏览器或清除浏览器数据会丢失本地记录。

## 编辑内容

- `index.html`：页面组织和文字。
- `assets/styles.css`：响应式样式。
- `assets/content.js`：范例阅读、表达库、学生实训材料与教师示范译文。
- `assets/app.js`：筛选、标注、计时、录音、反馈等交互逻辑。

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
