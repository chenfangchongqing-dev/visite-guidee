/* Visite guidée — editable teaching data; no build step required. */
window.VG_DATA = {
  strasbourg: [
    {title:"从城市历史进入校园",fr:"Situer dans l'histoire",page:"P. 2 · Contexte historique",intro:"手册先介绍1871年后斯特拉斯堡的法德历史背景及 Neustadt 新城区，再解释大学历史校园的建设背景。",sample:"Avant de découvrir le bâtiment, rappelons brièvement le contexte dans lequel ce campus a été créé.",question:"为什么法国材料没有一开始就逐项介绍建筑立面？"},
    {title:"站在建筑前，引导观察",fr:"Se placer et regarder",page:"P. 3 · Façade",intro:"参观者先站到大学广场，面向 Palais universitaire；手册再引入 Otto Warth、1879—1884年的建造过程与立面特征。",sample:"Nous voici devant le Palais universitaire. Prenez un instant pour regarder l'ensemble de sa façade.",question:"站定位置之后，是先讲建筑师的名字，还是先让观众观察整体？"},
    {title:"由雕塑进入象征意义",fr:"Décrire et interpréter",page:"PP. 3–4 · Sculptures",intro:"手册从雅典娜、Germania、Argentina 等雕塑入手，邀请参观者解释它们代表的知识、学科与政治背景。观察对象不是讲解终点。",sample:"Ces figures ne servent pas seulement à décorer le bâtiment : elles renvoient aussi à son histoire et aux idées de l'époque.",question:"这里如何从“我看见了什么”自然过渡到“它意味着什么”？"},
    {title:"从外立面进入内部空间",fr:"Accompagner le déplacement",page:"PP. 5–6 · Architecture et aula",intro:"材料从建筑外部转入门厅和 atrium（如今的 aula），让参观者换一个位置观察建筑，并体会内部装饰。",sample:"Entrons maintenant dans le bâtiment. Nous allons découvrir un espace central qui a conservé son caractère monumental.",question:"进入建筑时，哪类空间过渡句可以替代机械的“接下来我们看到”？"},
    {title:"由人物雕像连接学术传统",fr:"Rattacher l'objet à une histoire",page:"P. 7 · Figures savantes",intro:"在建筑外部的雕像上，手册又将观察扩展到人物、学科和大学知识传统。导览从具体形象通向更广阔的大学史。",sample:"Ces statues représentent des savants dont les travaux sont liés aux disciplines enseignées à l'université.",question:"如果讲川外校史馆里的学者肖像，怎样避免罗列姓名与头衔？"}
  ],
  filters:[
    {id:"all",name:"全部"},{id:"accueil",name:"欢迎与开场"},{id:"regard",name:"视线与定位"},{id:"histoire",name:"历史叙事"},{id:"objet",name:"展品介绍"},{id:"sens",name:"解释意义"},{id:"suite",name:"参观过渡"}
  ],
  expressions:[
    {cat:"accueil",fr:"Bonjour à toutes et à tous, et bienvenue à…",zh:"向参观者问候并欢迎"},
    {cat:"accueil",fr:"Je vous propose de découvrir ensemble…",zh:"自然引入参观主题"},
    {cat:"accueil",fr:"Notre visite commencera par…",zh:"提前交代参观起点"},
    {cat:"accueil",fr:"Avant de commencer, quelques mots sur…",zh:"进入主题前简要说明背景"},
    {cat:"regard",fr:"Nous voici devant…",zh:"定位：我们现在来到……前"},
    {cat:"regard",fr:"Je vous invite à regarder…",zh:"引导参观者观察"},
    {cat:"regard",fr:"Sur votre gauche / sur votre droite…",zh:"以参观者的位置为参照"},
    {cat:"regard",fr:"Dans la partie supérieure de ce tableau…",zh:"描述画面内部的相对位置"},
    {cat:"regard",fr:"Si vous levez les yeux, vous verrez…",zh:"引导观众抬头看"},
    {cat:"histoire",fr:"L'histoire de cette université remonte à…",zh:"追溯学校历史起点"},
    {cat:"histoire",fr:"À l'origine, ce bâtiment abritait…",zh:"介绍建筑原有用途"},
    {cat:"histoire",fr:"C'est en … que l'établissement a été fondé.",zh:"强调创办年份"},
    {cat:"histoire",fr:"À cette époque, l'université…",zh:"交代某一时期的情况"},
    {cat:"histoire",fr:"Quelques années plus tard, …",zh:"推进历史时间线"},
    {cat:"histoire",fr:"Cet événement marque une nouvelle étape dans…",zh:"说明历史节点的重要性"},
    {cat:"objet",fr:"Cette vitrine présente…",zh:"介绍展柜中的实物"},
    {cat:"objet",fr:"Ce document date de…",zh:"交代档案材料年代"},
    {cat:"objet",fr:"Sur cette photographie, on peut voir…",zh:"指认历史照片中的内容"},
    {cat:"objet",fr:"Cet objet servait autrefois à…",zh:"说明物件从前的用途"},
    {cat:"objet",fr:"Ce bas-relief représente…",zh:"介绍浮雕表现的画面"},
    {cat:"sens",fr:"Cette sculpture symbolise…",zh:"解释雕塑的象征意义"},
    {cat:"sens",fr:"Cet objet témoigne de…",zh:"展品见证了某段历史"},
    {cat:"sens",fr:"Ce détail permet de mieux comprendre…",zh:"由细节引出背景或理解"},
    {cat:"sens",fr:"Ce qui est intéressant ici, c'est que…",zh:"突出特别值得解释之处"},
    {cat:"sens",fr:"Il ne s'agit pas seulement de…",zh:"从表面描述深入到意义（慎用）"},
    {cat:"suite",fr:"Poursuivons notre visite…",zh:"继续参观"},
    {cat:"suite",fr:"Passons maintenant à la salle suivante.",zh:"前往下一展厅"},
    {cat:"suite",fr:"Nous allons maintenant nous arrêter devant…",zh:"在某件展品前停留"},
    {cat:"suite",fr:"À présent, intéressons-nous à…",zh:"转入新的展陈主题"}
  ],
  roles:{guide:"现场指引",fact:"核心事实",context:"历史背景",meaning:"意义解释",transition:"参观过渡"},
  exercises:[
    {id:"accueil",title:"进入校史馆 · 欢迎参观",fr:"Accueillir et annoncer la visite",level:"入门",goal:"任务：30—40秒内用自然法语欢迎外国参观者，并清楚交代参观主题。",question:"“开川外门，见山外山”是一句校史宣传语。在一般法语现场导览的开场中，保留还是转化？你的依据是什么？",units:[{role:"context",text:"开川外门，见山外山。"},{role:"guide",text:"大家好，欢迎大家来到四川外国语大学校史馆。"},{role:"transition",text:"接下来，我们将一起开启校史探寻之旅。"}],model:"Bonjour à toutes et à tous, et bienvenue au musée de l'histoire de l'Université des Études internationales du Sichuan, ou SISU.\n\nJe vous propose de découvrir ensemble les grandes étapes de l'histoire de notre université.",insight:"直接建立讲解员与参观者的关系。“开川外门，见山外山”在普通导览中可以不作字面转换；若属于本次活动指定主题，则需保留其宣传功能。"},
    {id:"devise",title:"校训题字 · 从文字到精神",fr:"Présenter une devise",level:"基础",goal:"任务：结合参观者眼前的书法题字，介绍其性质、题写者及文化含义。",question:"如果参观者不懂汉字，只说一遍“海纳百川，学贯中外”的法语直译，是否完成讲解？",units:[{role:"guide",text:"大家可以看到，墙上有一幅题词“海纳百川，学贯中外”，"},{role:"fact",text:"这是我校的校训，"},{role:"context",text:"是由时任外交部部长杨洁篪为我校建校60周年所写的题字。"}],model:"Sur ce mur, vous pouvez voir une inscription calligraphiée par Yang Jiechi, alors ministre chinois des Affaires étrangères, à l'occasion du soixantième anniversaire de SISU, en 2010.\n\nCette formule a été officiellement adoptée comme devise de notre université en 2020. Elle évoque l'ouverture aux différentes cultures et la volonté de faire dialoguer les savoirs chinois et étrangers.",insight:"先指认题字、交代题写背景，再说明今天的校训身份与文化含义。不必硬把两个四字表达塞进一个对仗的法语口号中。原稿及其层级标注保持不变。经官方资料核实，该表述自2008年用于学校宣传，2010年由杨洁篪为建校60周年题写，2020年正式确定为校训。正式通知落款为9月16日，官网刊登日期为9月21日（见页末两份官方资料）。示范中的2010年和2020年是核实后的教学补充，并非原稿已有的信息。"},
    {id:"relief",title:"铜质浮雕 · 由形象走向象征",fr:"Décrire un bas-relief",level:"核心",goal:"任务：按照参观者观察顺序讲解浮雕：整体、画面细节、象征意义。",question:"讲解的重心究竟是“浮雕上有什么”，还是“大桥为什么被放在画面中央”？如何把两者联系起来？",units:[{role:"guide",text:"接下来，大家可以看到这一面大型的铜质浮雕。"},{role:"fact",text:"在浮雕的右侧，是我校历史最悠久的一栋楼——培英楼。"},{role:"guide",text:"在浮雕左侧，我们可以看到有一座大桥。"},{role:"fact",text:"在这一座大桥的对岸，有着像埃菲尔铁塔、卢浮宫等国际著名景点。"},{role:"meaning",text:"这一座大桥从川外、从重庆连接向世界各地，象征着我校积极架设重庆与各国、各城市之间的合作交流桥梁。"}],model:"Arrêtons-nous un instant devant ce grand bas-relief en bronze.\n\nÀ droite, vous pouvez reconnaître le bâtiment Peiying, l'un des plus anciens de notre université. À gauche, un pont mène vers plusieurs monuments célèbres, parmi lesquels la tour Eiffel et le Louvre.\n\nCe pont a une valeur symbolique : il représente l'ouverture de SISU sur le monde et les liens qu'elle cherche à développer entre Chongqing et d'autres villes et pays.",insight:"先让观众看见大桥，再解释大桥的象征意义。把画面中左右位置和参观者的左右方向区分开；此处依照现场转写稿整理，具体画面仍应以展品为准。"},
    {id:"histoire",title:"学校沿革 · 形成时间线",fr:"Raconter une histoire institutionnelle",level:"进阶",goal:"任务：面对若干历史节点，优先保留创办、迁址和更名的核心事实，避免连续堆叠年份。",question:"原稿涉及建校、历史传承、更名、迁址四类信息。哪几项是第一遍口译必须稳住的主干？",units:[{role:"fact",text:"学校创建于1950年5月，"},{role:"context",text:"有着深厚的军大传统、红色基因，"},{role:"fact",text:"历经六易校名、五迁校址，"},{role:"fact",text:"1970年定址在我们现在的位置——沙坪坝烈士墓壮志路33号。"},{role:"fact",text:"2013年正式更名为四川外国语大学。"}],model:"L'histoire de notre université commence en 1950, avec un centre de formation en russe issu de l'enseignement militaire.\n\nAprès plusieurs changements de nom et de lieu, elle s'installe sur le site actuel en 1970. C'est en 2013 qu'elle prend son nom actuel, Université des Études internationales du Sichuan.",insight:"教学示范暂不机械复述“六易校名、五迁校址”及1950年月份，原因是这些细节在不同公开介绍中存在口径差异，需核实后才进入正式讲解。年份1950、1970和2013作为结构主干。"},
    {id:"objets",title:"早期教学设备 · 介绍展品用途",fr:"Présenter un objet historique",level:"基础",goal:"任务：介绍展柜中的早期教学设备，说明用途，并以一句话联系学校的外语教学史。",question:"“它是什么”“它用来做什么”“它见证了什么”中，哪两个问题最能帮助普通外国参观者理解展品？",units:[{role:"guide",text:"展柜中陈列着我校建校初期的一些珍贵文物。"},{role:"fact",text:"右侧最大的这个物件是我校早期使用的落地收音机，"},{role:"fact",text:"它融合了广播收音、唱片、录音三种功能。"},{role:"meaning",text:"当时，我们的师生就靠它与世界链接。"},{role:"fact",text:"其他展柜里还有打字机等早期教学设备。"}],model:"Cette vitrine réunit plusieurs objets utilisés dans les premières années de notre université.\n\nVous remarquerez notamment cet ancien poste de radio sur pied, qui permettait d'écouter la radio, de lire des disques et d'enregistrer des sons.\n\nPour les enseignants et les étudiants de l'époque, ce type d'équipement jouait un rôle important dans l'apprentissage des langues et l'accès aux informations venues de l'étranger. D'autres vitrines présentent notamment des machines à écrire.",insight:"这里强调功能与历史用途。现场转写中的具体型号、‘国内最大’等细节尚未核实，所以没有进入练习原文和示范译文。"}
  ],
  rubric:[
    {id:"information",title:"信息准确与完整",desc:"历史事实、专名、数字没有明显误译；重要内容未无故遗漏。"},
    {id:"hierarchy",title:"信息层级与篇章组织",desc:"能够区分核心信息与补充说明；展品和历史之间有清楚的联系。"},
    {id:"visitor",title:"参观者导向",desc:"视线指引与空间定位准确，讲解照顾听众正在看什么。"},
    {id:"oral",title:"法语表达自然度",desc:"句子适合现场说出口，避免中文词序与宣传套语的生硬复制。"},
    {id:"flow",title:"口头输出的连续性",desc:"停顿可控，完成整段讲解，不反复重译或中断。"}
  ]
};
