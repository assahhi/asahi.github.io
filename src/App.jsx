import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Briefcase,
  ChartLineUp,
  Code,
  Compass,
  Database,
  EnvelopeSimple,
  FilePdf,
  Gauge,
  GraduationCap,
  LinkSimple,
  ListChecks,
  Pause,
  Play,
  Sparkle,
  WechatLogo,
} from "@phosphor-icons/react";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const chapters = [
  { id: "intro", short: "START", title: "开场" },
  { id: "about", short: "A", title: "About Me" },
  { id: "programme", short: "B1", title: "Programme Courses" },
  { id: "course-plan", short: "B2", title: "My Course Map" },
  { id: "experience", short: "C", title: "Comprehensive Experience" },
  { id: "contact", short: "D", title: "Contact" },
];

const experiencePhotos = Array.from({ length: 17 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    number,
    src: assetUrl(`assets/experience/${number}.jpg`),
  };
});

const experienceRoute = [
  {
    date: "2021.09 — 2025.06",
    title: "浙江大学 · 智能财务",
    note: "会计+数据分析，构成我理解业务的第一组坐标。",
    stat: "GPA 3.83 / 4.00",
  },
  {
    date: "2023.07 — 2025.06",
    title: "五矿、德勤、吉利",
    note: "从系统产品到现金流分析，我开始把“数据准确”推进到“决策有效”。",
    stat: "430 万潜在损失识别",
  },
  {
    date: "2025.09 — 2027.06",
    title: "港中深 · 会计分析",
    note: "用数据可视化、文本分析和预测方法，重新理解会计这门商业语言。",
    stat: "GPA 3.94 / 4.00",
  },
  {
    date: "2026.06 — 至今",
    title: "京东 · 采销",
    note: "走进一线经营现场，在更快的反馈里观察商品、用户与决策。",
    stat: "把分析放进业务现场",
  },
];

// PERSONAL COURSE PLAN — 以后只需要修改这里，即可更新 B2「我的课程安排」整页。
// 可以直接改 title、period、courses 和 note；需要更多课程就在 courses 数组中继续添加。
const personalCoursePlan = [
  {
    index: "01",
    title: "Term1 - Sem1",
    year: "2025",
    period: "9 月 — 12 月",
    courses: ["*企业会计",
              "*管理会计",
              "*经济法",
              "*税法",
              "*思政*2",
              "法务与会计预测",
              "会计数据决策与可视化"
              ],
    note: "体验校园生活+奠定高绩点+铺垫超长实习期",
  },
  {
    index: "02",
    title: "Term1 - Sem2",
    year: "2026",
    period: "1 月 — 5 月",
    courses: ["*企业会计进阶",
              "*审计与认证业务",
              "*财务管理",
              "数据挖掘和商业分析",
              "金融市场的文本分析"],
    note: "完成7必修+4选修，同时投递summer，港中深5月结课即可快速到岗且无导师限制，较其他学校提前2个月，竞争力更强",
  },
  {
    index: "03",
    title: "Term2 - Sem1",
    year: "2026",
    period: "9 月 — 12 月",
    courses: ["完全实习之"],
    note: "选修实习课，summer结束后根据梦中情岗直接投递/补更多实习",
  },
  {
    index: "04",
    title: "Term2 - Sem2",
    year: "2027",
    period: "1 月 — 5 月",
    courses: ["企业估值与财报分析",],
    note: "边实习边上课，完成最后一门选修课，毕业",
  },
];

const termOneRequiredCourses = [
  {
    term: "TERM 1 · SEM 1",
    period: "2025.09 — 2025.12",
    courses: ["企业会计", "管理会计", "经济法", "税法", "思政 · 2 门"],
    note: "第一学期以基础必修为主，先建立会计、税法与商事规则的共同语言。",
  },
  {
    term: "TERM 1 · SEM 2",
    period: "2026.01 — 2026.05",
    courses: ["企业会计进阶", "审计与认证业务", "财务管理"],
    note: "第二学期完成进阶必修，同时把更多精力转向数据、模型与文本分析选修。",
  },
];

const electiveCourseNotes = [
  {
    code: "ACT6201",
    name: "法务会计与预测分析",
    term: "TERM 1 · SEM 1",
    difficulty: 3,
    summary:
      "课堂氛围很轻松，以经典文献为线索学习 Stata 代码，并配有入门教程。课程希望你能用财务数据、统计模型和数字特征，识别、预测与防范财务舞弊、会计操纵及企业破产风险。",
    topics: ["盈余管理动机", "舞弊检测模型", "财务数据的数字特征", "破产预测模型", "市场反应机制"],
    suitable: "有过文献研读经验、想走学术，或喜欢钻研代码逻辑的同学。",
    assessment: [
      { label: "Project 1", weight: "15%", value: 15, note: "近 10 年投资者心理理论验证" },
      { label: "Project 2", weight: "15%", value: 15, note: "中国背景下的公司破产预测分析" },
      { label: "Project 3", weight: "15%", value: 15, note: "F-Score 的应用及失效分析" },
      { label: "Mid Exam", weight: "20%", value: 20, note: "单选、简答与论述，整体有一定难度" },
      { label: "Final Exam", weight: "35%", value: 35, note: "机考；考前有 Review 课，建议参加" },
      { label: "Extra Bonus", weight: "+5%", value: 5, note: "小组汇报额外计入总评，但总评不超过 100", bonus: true },
    ],
  },
  {
    code: "ACT6241",
    name: "数据挖掘和商业分析",
    term: "TERM 1 · SEM 2",
    difficulty: 4,
    summary:
      "从数据清理、特征工程和完整 pipeline 出发，系统介绍决策树、逻辑回归、SVM、KNN、聚类、Bayes 与规则挖掘，并讨论过拟合处理和模型效果评估。听说今年还会增加 AI Agent 应用案例。",
    topics: ["机器学习模型", "特征工程", "过拟合处理", "模型评估", "数据挖掘 Pipeline"],
    suitable: "想做商业分析或数据分析，希望理解模型底层逻辑与适用场景的同学。",
    assessment: [
      { label: "In-class Quiz", weight: "20%", value: 20, note: "6% + 6% + 8%；开卷，以选择与计算为主" },
      { label: "Homework", weight: "10%", value: 10, note: "2 × 5%；小有难度，考察对课堂模型的理解" },
      { label: "Coding", weight: "40%", value: 40, note: "4 × 10%；充分理解教授给出的 sample coding" },
      { label: "Group Project", weight: "20%", value: 20, note: "给定主题与范围，完整走完数据挖掘流程" },
      { label: "Personal Project", weight: "10%", value: 10, note: "用户银行信用分预测；评分标准相对开放" },
    ],
  },
  {
    code: "ACT6242",
    name: "会计数据策略与可视化",
    term: "TERM 1 · SEM 1",
    difficulty: 2,
    summary:
      "课程重点是 SQL 基础与 Tableau 可视化看板搭建。对于进入数据分析岗位很实用，适合作为入门起点；但课程深度有限，需要课后继续刷题并积累函数使用经验。",
    topics: ["SQL 基础", "数据查询", "Tableau", "可视化看板", "业务表达"],
    suitable: "希望补齐数据分析必备 SQL 能力、从零开始搭建可视化作品的同学。",
    resource: { label: "SQLZoo · SQL 练习", url: "https://sqlzoo.net/wiki/SQL_Tutorial" },
    assessment: [
      { label: "Participation", weight: "15%", value: 15, note: "每节课定位签到，并计入课堂互动" },
      { label: "Assignment", weight: "20%", value: 20, note: "通过 Blackboard 完成，主要考察 SQL" },
      { label: "Group Project", weight: "45%", value: 45, note: "重点考验看板审美、信息层次和可视化能力" },
      { label: "Midterm Exam", weight: "20%", value: 20, note: "基础概念、代码逻辑勘误与问题拆解写代码" },
    ],
  },
  {
    code: "ACT6243",
    name: "金融市场的文本分析",
    term: "TERM 1 · SEM 2",
    difficulty: 5,
    summary:
      "学习链路从 Python 基础与 pandas 开始，逐步进入可视化、词云、PDF 文本提取、分词、爬虫、文本复杂度与相似度、主题模型，最后延伸到 LLM 简介。内容密度高，也最能拉升 Coding 能力。",
    topics: ["Python / pandas", "PDF Miner", "爬虫与分词", "文本相似度", "主题模型与 LLM"],
    suitable: "希望走科研方向，或愿意用高强度项目明显提升 Coding 能力的同学。",
    assessment: [
      { label: "Assignments", weight: "40%", value: 40, note: "共 5 次，有难度，但 TA 给分比较友好" },
      { label: "Participation", weight: "10%", value: 10, note: "老师每节课提问；满分次数不公开，需要主动发言" },
      { label: "Proposal", weight: "5%", value: 5, note: "不必过度具体，但要讲清项目想表达的“故事”" },
      { label: "Presentation", weight: "25%", value: 25, note: "考验 PPT 基本功，以及项目标新立异的亮点" },
      { label: "Project Report", weight: "20%", value: 20, note: "重视排版与语言，并要求披露 AI 使用情况" },
    ],
  },
];

const commonRequiredCourses = [
  "企业会计",
  "企业会计进阶",
  "管理会计",
  "审计与认证业务",
  "财务管理",
  "中国税法",
  "中国经济法与市场监管",
];

const accountingAnalyticsCourses = [
  "会计数据策略与可视化",
  "企业估价和财务报表分析",
  "数据挖掘和商业分析",
  "会计分析研究",
  "法务会计与预测分析",
  "金融市场的文本分析",
];

const professionalAccountingCourses = [
  "收益质量分析",
  "会计和财务战略",
  "企业估价和财务报表分析",
  "当代中国金融市场的问题",
  "中国公司管治与社会责任",
  "会计研究",
];

const programmeVersions = {
  "2025": {
    ratio: "7+5",
    ratioLabel: "必修 + 选修",
    taxLocation: "必修课",
    columns: [
      {
        index: "01",
        kicker: "COMMON CORE",
        title: "必修课",
        badge: "7 门 / 21 学分",
        courses: commonRequiredCourses,
      },
      {
        index: "02",
        kicker: "ACCOUNTING ANALYTICS",
        title: "AA · 会计分析",
        badge: "方向选修",
        courses: accountingAnalyticsCourses,
      },
      {
        index: "03",
        kicker: "PROFESSIONAL ACCOUNTING",
        title: "PA · 专业会计",
        badge: "方向选修",
        courses: professionalAccountingCourses,
      },
    ],
  },
  "2026": {
    ratio: "6+6",
    ratioLabel: "主修 + 选修",
    taxLocation: "PA 选修",
    columns: [
      {
        index: "01",
        kicker: "COMMON CORE",
        title: "主修课",
        badge: "6 门",
        courses: commonRequiredCourses.filter((course) => course !== "中国税法"),
      },
      {
        index: "02",
        kicker: "ACCOUNTING ANALYTICS",
        title: "AA · 会计分析",
        badge: "方向选修",
        courses: accountingAnalyticsCourses,
      },
      {
        index: "03",
        kicker: "PROFESSIONAL ACCOUNTING",
        title: "PA · 专业会计",
        badge: "方向选修 · +1",
        courses: [
          ...professionalAccountingCourses,
          { name: "中国税法", shifted: true },
        ],
      },
    ],
  },
};

const takeaways = [
  {
    icon: Database,
    index: "01",
    title: "搭建学习体系",
    copy: "课程密度不低。比起追求工具数量，更重要的是固定一条主线：问题—数据—方法—表达。每门课都留下一份可复用作品。",
  },
  {
    icon: Briefcase,
    index: "02",
    title: "把握实习机会",
    copy: "深圳的产业与实习机会很近，但机会不会自动发生。尽早确定目标岗位，用课程项目补齐作品集，再用实习校准方向。",
  },
  {
    icon: ChartLineUp,
    index: "03",
    title: "找到志同道合的伙伴",
    copy: "同学的背景会非常多元。多问、多分享、早点组队；给生活留一点缓冲，长期稳定比短期满负荷更容易走远。",
  },
];

function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportAsPdf() {
  window.print();
}

function ExportPdfButton({ className = "" }) {
  return (
    <button
      className={`export-pdf-button ${className}`.trim()}
      type="button"
      onClick={exportAsPdf}
      aria-label="导出为 PDF"
    >
      <FilePdf size={19} weight="bold" aria-hidden="true" />
      <span>导出 PDF</span>
    </button>
  );
}

function Brand({ onClick = () => scrollToChapter("intro"), label = "返回开场" }) {
  return (
    <button className="brand" type="button" onClick={onClick} aria-label={label}>
      <img src={assetUrl("assets/cuhksz-crest.png")} alt="香港中文大学（深圳）校徽" />
      <span>
        <strong>香港中文大学（深圳）</strong>
        <small>The Chinese University of Hong Kong, Shenzhen</small>
      </span>
    </button>
  );
}

function Header({ activeIndex }) {
  return (
    <header className="masthead">
      <Brand />
      <div className="masthead-meta">
        <span>2026 Fall Orientation</span>
        <ExportPdfButton />
        <span className="chapter-count">
          {String(activeIndex + 1).padStart(2, "0")} <i>/ {String(chapters.length).padStart(2, "0")}</i>
        </span>
      </div>
    </header>
  );
}

function ChapterRail({ activeIndex }) {
  return (
    <nav className="chapter-rail" aria-label="章节导航">
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          className={activeIndex === index ? "is-active" : ""}
          onClick={() => scrollToChapter(chapter.id)}
          aria-label={`前往${chapter.title}`}
          aria-current={activeIndex === index ? "step" : undefined}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}

function Reveal({ children, className = "", delay = 0, y = 24 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="chapter hero" id="intro" data-chapter="0">
      <div className="hero-content">
        <div className="hero-copy">
          <motion.div
            className="display-mask"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <h1>ORIENTATION<br />FIELD NOTES</h1>
          </motion.div>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
          >
            一份新生开学路线图
          </motion.h2>
          <motion.div
            className="byline"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.68 }}
          >
            <Compass size={23} weight="duotone" aria-hidden="true" />
            <strong>刘璨玮 · 会计分析</strong>
          </motion.div>
          <motion.p
            className="hero-summary"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
          >
            从自我介绍，到项目拆解，再到真实体验——
            <br />
            把我走过的路，变成你更好出发的坐标。
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88 }}
          >
            <button className="primary-button" type="button" onClick={() => scrollToChapter("about")}>
              <Compass size={20} weight="fill" />
              开始探索
            </button>
          </motion.div>
        </div>

        <div className="hero-visual" aria-label="刘璨玮个人照片">
          <motion.div
            className="coordinate-stamp"
            initial={reduceMotion ? false : { opacity: 0, rotate: -5, scale: 0.92 }}
            animate={{ opacity: 1, rotate: -2, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            22.5431°N, 114.0579°E
          </motion.div>
          <motion.div
            className="portrait-frame"
            initial={reduceMotion ? false : { opacity: 0, x: 42, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={assetUrl("assets/liu-canwei-portrait-web.jpg")} alt="刘璨玮证件照" />
          </motion.div>
          <motion.img
            className="route-overlay"
            src={assetUrl("assets/route-overlay.png")}
            alt=""
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 1.45, delay: 0.55, ease: "easeInOut" }}
          />
          <motion.div
            className="field-seal"
            initial={reduceMotion ? false : { opacity: 0, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -6, scale: 1 }}
            transition={{ duration: 0.65, delay: 1.02 }}
          >
            <img src={assetUrl("assets/cuhksz-crest.png")} alt="" />
            <span>FIELD GUIDE</span>
          </motion.div>
        </div>
      </div>

      <div className="hero-chapters" aria-label="主要内容">
        {chapters.slice(1).map((chapter, index) => (
          <button key={chapter.id} type="button" onClick={() => scrollToChapter(chapter.id)}>
            <span>{chapter.short} / {chapter.title}</span>
            <small>{["22.5431°N", "113.957°E", "22.69°N", "114.06°E", "KEEP IN TOUCH"][index]}</small>
          </button>
        ))}
        <button className="scroll-cue" type="button" onClick={() => scrollToChapter("about")}>
          <span>SCROLL TO MOVE · 向下探索</span>
          <ArrowDown size={23} />
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="chapter about" id="about" data-chapter="1">
      <div className="section-grid">
        <Reveal className="section-heading">
          <p className="eyebrow">A / 关于我 · ORIGIN</p>
          <h2>从智能财务出发，<br />把数据带进业务现场</h2>
          <p className="lead">
            我关心的不只是数字对不对，更是它能否让一个真实问题变得清楚、可解释、可行动。
          </p>
        </Reveal>

        <div className="route-list">
          {experienceRoute.map((item, index) => (
            <Reveal className="route-item" key={item.title} delay={index * 0.08} y={18}>
              <div className="route-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="route-main">
                <time>{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
              <strong>{item.stat}</strong>
            </Reveal>
          ))}
        </div>

        <Reveal className="data-strip" delay={0.18}>
          <div>
            <GraduationCap size={24} weight="duotone" />
            <span><strong>3.94</strong> 港中深 GPA</span>
          </div>
          <div>
            <Database size={24} weight="duotone" />
            <span><strong>40,000+</strong> 份年报清洗</span>
          </div>
          <div>
            <ChartLineUp size={24} weight="duotone" />
            <span><strong>31</strong> 个行业主题挖掘</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Programme() {
  const reduceMotion = useReducedMotion();
  const [programmeYear, setProgrammeYear] = useState("2025");
  const programmeSectionRef = useRef(null);
  const programmeTimerRef = useRef(null);
  const programmeAnimationPlayedRef = useRef(false);
  const programmeVersion = programmeVersions[programmeYear];

  useEffect(() => {
    const section = programmeSectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || programmeAnimationPlayedRef.current) return;
        programmeAnimationPlayedRef.current = true;
        setProgrammeYear("2025");
        programmeTimerRef.current = window.setTimeout(
          () => setProgrammeYear("2026"),
          reduceMotion ? 0 : 1250,
        );
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (programmeTimerRef.current) window.clearTimeout(programmeTimerRef.current);
    };
  }, [reduceMotion]);

  const selectProgrammeYear = (year) => {
    if (programmeTimerRef.current) window.clearTimeout(programmeTimerRef.current);
    setProgrammeYear(year);
  };

  return (
    <section className="chapter programme" id="programme" data-chapter="2" ref={programmeSectionRef}>
      <div className="section-grid">
        <Reveal className="section-heading programme-heading">
          <p className="eyebrow">B1 / 项目介绍 · COURSE CATALOGUE</p>
          <h2>课纲升级，方向更清晰</h2>
          <p className="lead">
            2026 级将课程结构从 7+5 调整为 6+6，并把“中国税法”由必修课转入 PA 方向选修课。
          </p>
        </Reveal>

        <Reveal className="curriculum-control" delay={0.08}>
          <div className="curriculum-switch" role="group" aria-label="选择课纲年份">
            {Object.keys(programmeVersions).map((year) => (
              <button
                type="button"
                key={year}
                className={programmeYear === year ? "is-active" : ""}
                aria-pressed={programmeYear === year}
                onClick={() => selectProgrammeYear(year)}
              >
                {year} 级
              </button>
            ))}
          </div>
          <motion.div
            className="programme-facts"
            key={programmeYear}
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span><strong>{programmeYear}</strong> 级课纲</span>
            <span><strong>36</strong> 专业学分</span>
            <span><strong>{programmeVersion.ratio}</strong> {programmeVersion.ratioLabel}</span>
            <span><strong>TAX</strong> {programmeVersion.taxLocation}</span>
          </motion.div>
        </Reveal>

        <Reveal className="curriculum-shift" delay={0.12}>
          <div className="curriculum-shift-copy">
            <span>CURRICULUM SHIFT · 2025 → 2026</span>
            <strong>7+5 调整为 6+6</strong>
            <small>一门主修课转为方向选修课</small>
          </div>
          <div className="tax-shift-map" aria-label="中国税法由2025级必修课调整为2026级PA方向选修课">
            <motion.div
              className={`tax-shift-node${programmeYear === "2025" ? " is-active" : ""}`}
              animate={{ opacity: programmeYear === "2025" ? 1 : 0.32, scale: programmeYear === "2025" ? 1 : 0.96 }}
            >
              <small>2025 · 必修课</small>
              <strong>中国税法</strong>
            </motion.div>
            <motion.div
              className="tax-shift-arrow"
              animate={reduceMotion ? undefined : { x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={24} weight="bold" />
            </motion.div>
            <motion.div
              className={`tax-shift-node${programmeYear === "2026" ? " is-active" : ""}`}
              animate={{ opacity: programmeYear === "2026" ? 1 : 0.32, scale: programmeYear === "2026" ? 1 : 0.96 }}
            >
              <small>2026 · PA 选修</small>
              <strong>中国税法</strong>
            </motion.div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="programme-columns"
            key={programmeYear}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {programmeVersion.columns.map((column, index) => (
              <motion.article
                className="programme-column"
                key={column.title}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <div className="course-column-meta">
                  <span className="column-index">{column.index}</span>
                  <span className="course-kicker">{column.kicker}</span>
                  <span className="course-badge">{column.badge}</span>
                </div>
                <h3>{column.title}</h3>
                <ol className="course-list">
                  {column.courses.map((course, courseIndex) => {
                    const courseName = typeof course === "string" ? course : course.name;
                    const shifted = typeof course === "object" && course.shifted;
                    return (
                      <li className={shifted ? "is-shifted" : ""} key={courseName}>
                        <span>{String(courseIndex + 1).padStart(2, "0")}</span>
                        {courseName}
                        {shifted ? <em>FROM CORE</em> : null}
                      </li>
                    );
                  })}
                </ol>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal className="programme-foot" delay={0.2}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={programmeYear}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
            >
              {programmeYear === "2025"
                ? "2025级：7 门必修 + 5 门选修；中国税法属于必修课。"
                : "2026级改革：6 门主修 + 6 门选修；中国税法调整为 PA 方向选修课。"}
            </motion.p>
          </AnimatePresence>
          <div className="programme-links">
            <a href="https://msacct.cuhk.edu.cn/zh-hans/curriculum" target="_blank" rel="noreferrer">
              课程设置 <ArrowRight size={17} />
            </a>
            <a href="https://msacct.cuhk.edu.cn/zh-hans/teaching-arrangment" target="_blank" rel="noreferrer">
              教学安排 <ArrowRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PersonalCoursePlan({ onOpenCourseGuide }) {
  return (
    <section className="chapter course-plan" id="course-plan" data-chapter="3">
      <div className="section-grid">
        <Reveal className="section-heading course-plan-heading">
          <p className="eyebrow">B2 / 我的课程安排 · PERSONAL COURSE MAP</p>
          <h2>My Schedule</h2>

        </Reveal>

        <Reveal className="course-plan-entry-wrap" delay={0.08}>
          <button className="course-plan-note" type="button" onClick={onOpenCourseGuide}>
            <span>TERM 1 · COURSE NOTES</span>
            <strong>查看课程理解</strong>
            <small>选修 · 内容与考核拆解</small>
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </button>
        </Reveal>

        <div className="personal-term-grid">
          {personalCoursePlan.map((term, index) => (
            <Reveal className="personal-term" key={term.title} delay={index * 0.06}>
              <div className="term-head">
                <span>{term.index}</span>
                <div className="term-date">
                  <strong>{term.year}</strong>
                  <small>{term.period}</small>
                </div>
              </div>
              <h3>{term.title}</h3>
              <ul>
                {term.courses.map((course) => <li key={course}>{course}</li>)}
              </ul>
              <p>{term.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="course-plan-foot" delay={0.18}>
          <button className="text-action" type="button" onClick={() => scrollToChapter("experience")}>
            下一页：综合体验 <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function DifficultyMeter({ level }) {
  return (
    <div className="difficulty-meter" aria-label={`课程难度 ${level}/5`}>
      <span>难度</span>
      <div aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <i className={index < level ? "is-filled" : ""} key={index} />
        ))}
      </div>
      <strong>{level}/5</strong>
    </div>
  );
}

function AssessmentBreakdown({ items }) {
  const scoredItems = items.filter((item) => !item.bonus);

  return (
    <div className="assessment-block">
      <div className="assessment-title">
        <span><ListChecks size={20} weight="duotone" /> ASSESSMENT MAP</span>
        <small>考核结构</small>
      </div>
      <div className="assessment-bar" aria-hidden="true">
        {scoredItems.map((item) => (
          <i key={item.label} style={{ width: `${item.value}%` }} />
        ))}
      </div>
      <div className="assessment-list">
        {items.map((item) => (
          <div className={`assessment-row${item.bonus ? " is-bonus" : ""}`} key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.weight}</span>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElectiveCourseCard({ course, index }) {
  return (
    <motion.article
      className="course-note-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="course-note-summary">
        <div className="course-note-meta">
          <span>{course.code}</span>
          <small>{course.term}</small>
        </div>
        <h2>{course.name}</h2>
        <DifficultyMeter level={course.difficulty} />
        <p className="course-note-copy">{course.summary}</p>
        <div className="topic-tags" aria-label="课程重点">
          {course.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
        <div className="suitable-note">
          <Gauge size={21} weight="duotone" aria-hidden="true" />
          <p><strong>适合谁</strong>{course.suitable}</p>
        </div>
        {course.resource ? (
          <a className="course-resource-link" href={course.resource.url} target="_blank" rel="noreferrer">
            <Code size={19} weight="duotone" />
            {course.resource.label}
            <ArrowRight size={17} />
          </a>
        ) : null}
      </div>
      <AssessmentBreakdown items={course.assessment} />
    </motion.article>
  );
}

function RequiredCourseOverview() {
  return (
    <motion.div
      className="required-course-view"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <div className="required-intro-card">
        <BookOpenText size={32} weight="duotone" aria-hidden="true" />
        <div>
          <span>TERM 1 · REQUIRED ROUTE</span>
          <h2>7 门专业必修，分两个学期完成</h2>
          <p>这里先呈现我的修读节奏；当前个人课程理解重点放在四门选修课，必修课评价会随学习继续补充。</p>
        </div>
      </div>
      <div className="required-term-grid">
        {termOneRequiredCourses.map((term, index) => (
          <article key={term.term}>
            <div className="required-term-head">
              <span>0{index + 1}</span>
              <div>
                <strong>{term.term}</strong>
                <small>{term.period}</small>
              </div>
            </div>
            <ul>
              {term.courses.map((course) => <li key={course}>{course}</li>)}
            </ul>
            <p>{term.note}</p>
          </article>
        ))}
      </div>
    </motion.div>
  );
}

function CourseGuide({ onBack }) {
  const [courseType, setCourseType] = useState("elective");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Term 1 课程理解 · Orientation Field Notes";
    document.documentElement.classList.add("course-guide-mode");
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("course-guide-mode");
    };
  }, []);

  return (
    <div className="course-guide-page">
      <header className="masthead course-guide-masthead">
        <Brand onClick={onBack} label="返回课程安排" />
        <div className="course-guide-header-actions">
          <ExportPdfButton />
          <button className="guide-back-button" type="button" onClick={onBack}>
            <ArrowLeft size={19} weight="bold" />
            返回课程地图
          </button>
        </div>
      </header>

      <main className="course-guide-main">
        <section className="course-guide-hero">
          <div>
            <p className="eyebrow">B2.1 / TERM 1 · PERSONAL COURSE NOTES</p>
            <h1>我的课程理解</h1>
            <p className="course-guide-lead">
              不只列课程名，也把学习内容、适合人群与真实考核结构放在同一张路线图里。
            </p>
          </div>
          <div className="course-guide-stamp">
            <span>4 ELECTIVES</span>
            <strong>2 SEMESTERS</strong>
            <small>2025.09 — 2026.05</small>
          </div>
        </section>

        <div className="course-type-toolbar">
          <div className="course-type-switch" role="tablist" aria-label="切换必修与选修课程">
            <button
              type="button"
              role="tab"
              aria-selected={courseType === "required"}
              className={courseType === "required" ? "is-active" : ""}
              onClick={() => setCourseType("required")}
            >
              必修课程 <span>7</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={courseType === "elective"}
              className={courseType === "elective" ? "is-active" : ""}
              onClick={() => setCourseType("elective")}
            >
              选修课程 <span>4</span>
            </button>
          </div>
          <a href="https://www.runoob.com" target="_blank" rel="noreferrer">
            <LinkSimple size={18} weight="bold" />
            综合学习入口 · 菜鸟教程
          </a>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {courseType === "elective" ? (
            <motion.section
              className="course-notes-grid"
              key="elective"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="选修课个人理解"
            >
              {electiveCourseNotes.map((course, index) => (
                <ElectiveCourseCard course={course} index={index} key={course.code} />
              ))}
            </motion.section>
          ) : (
            <RequiredCourseOverview key="required" />
          )}
        </AnimatePresence>

        <footer className="course-guide-footer">
          <button className="secondary-button" type="button" onClick={onBack}>
            <ArrowLeft size={18} weight="bold" /> 返回我的课程安排
          </button>
          <span>PERSONAL FIELD NOTES · 内容基于个人修读体验</span>
        </footer>
      </main>
    </div>
  );
}

function ExperienceReel() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const isPaused = paused || reduceMotion;
  const reelPhotos = [...experiencePhotos, ...experiencePhotos];

  return (
    <Reveal className="project-reel" delay={0.1} y={14}>
      <div className="project-reel-heading">
        <div>
          <span>PROJECT MOMENTS</span>
          <strong>项目剪影</strong>
        </div>
        <button
          type="button"
          aria-label={isPaused ? "播放项目剪影" : "暂停项目剪影"}
          aria-pressed={isPaused}
          disabled={reduceMotion}
          onClick={() => setPaused((value) => !value)}
        >
          {isPaused ? <Play size={15} weight="fill" /> : <Pause size={15} weight="fill" />}
          {isPaused ? "播放" : "暂停"}
        </button>
      </div>
      <div className="project-reel-window" aria-label="按文件名顺序自动滚动的项目照片">
        <div className={`project-reel-track${isPaused ? " is-paused" : ""}`}>
          {reelPhotos.map((photo, index) => {
            const duplicate = index >= experiencePhotos.length;
            return (
              <figure aria-hidden={duplicate || undefined} key={`${photo.number}-${duplicate ? "copy" : "original"}`}>
                <img
                  src={photo.src}
                  alt={duplicate ? "" : `项目剪影 ${photo.number}`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{photo.number}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <small>01—17 · 按文件名顺序循环</small>
    </Reveal>
  );
}

function Experience() {
  return (
    <section className="chapter experience" id="experience" data-chapter="4">
      <div className="section-grid">
        <div className="experience-intro">
          <Reveal className="section-heading experience-heading">
            <div className="experience-title-block">
              <p className="eyebrow">C / 综合体验 · FIELD NOTES</p>
              <h2>综合体验</h2>
            </div>
            <div className="experience-advice-lines">
              <p>焦虑是因为你有解决问题的能力。</p>
            </div>
          </Reveal>
          <ExperienceReel />
        </div>

        <div className="takeaway-list">
          {takeaways.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="takeaway" key={item.title} delay={index * 0.08}>
                <div className="takeaway-meta">
                  <Icon size={27} weight="duotone" />
                  <span>{item.index}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="closing-note" delay={0.14}>
          <Sparkle size={26} weight="fill" aria-hidden="true" />
          <blockquote>
            “项目给的是工具，真正的成长来自你如何连接课程、实习与同伴。”
          </blockquote>
        </Reveal>

      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="chapter contact" id="contact" data-chapter="5">
      <div className="section-grid">
        <Reveal className="contact-heading">
          <div>
            <p className="eyebrow">D / 联系方式 · CONTACT FIELD NOTE</p>
            <h2>联系方式</h2>
          </div>
          <div className="contact-stamp" aria-label="保持联系坐标章">
            <span>FIELD NOTE · 04</span>
            <strong>KEEP IN TOUCH</strong>
            <small>深圳 · 22°32′N / 114°03′E</small>
          </div>
        </Reveal>

        <Reveal className="contact-details" delay={0.08}>
          <a className="contact-row" href="mailto:canweiliu@link.cuhk.edu.cn">
            <span className="contact-label">
              <EnvelopeSimple size={27} weight="duotone" aria-hidden="true" />
              <small>EMAIL</small>
            </span>
            <strong>canweiliu@link.cuhk.edu.cn</strong>
            <ArrowRight size={22} weight="bold" aria-hidden="true" />
          </a>
          <div className="contact-row">
            <span className="contact-label">
              <WechatLogo size={27} weight="duotone" aria-hidden="true" />
              <small>WECHAT</small>
            </span>
            <strong>Asahhi_Liu</strong>
            <span className="contact-row-note">扫码添加好友</span>
          </div>
        </Reveal>

        <Reveal className="wechat-card" delay={0.12} y={16}>
          <div className="wechat-card-meta">
            <span>WECHAT CONTACT</span>
            <strong>Asahi</strong>
          </div>
          <img
            src={assetUrl("assets/wechat-qr.jpg")}
            alt="Asahi 的微信联系二维码"
            loading="lazy"
            decoding="async"
          />
          <small>使用微信扫描二维码，添加我为好友</small>
        </Reveal>

        <Reveal className="contact-closing" delay={0.16}>
          <Sparkle size={27} weight="fill" aria-hidden="true" />
          <blockquote>新的故事会在秋风中慢慢开始</blockquote>
          <button className="text-action" type="button" onClick={() => scrollToChapter("intro")}>
            回到开场 <ArrowRight size={18} />
          </button>
        </Reveal>

        <footer className="site-footer contact-footer">
          <span>© 2026 Asahi · AA</span>
          <span>Based On Personal Experience</span>
          <span>Designed for Freshers.</span>
        </footer>
      </div>
    </section>
  );
}

export function App() {
  const [currentView, setCurrentView] = useState(() => (
    window.location.hash === "#course-guide" ? "course-guide" : "main"
  ));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    const syncViewWithHash = () => {
      setCurrentView(window.location.hash === "#course-guide" ? "course-guide" : "main");
    };
    window.addEventListener("hashchange", syncViewWithHash);
    return () => window.removeEventListener("hashchange", syncViewWithHash);
  }, []);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (currentView !== "main") return undefined;
    const nodes = [...document.querySelectorAll("[data-chapter]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveIndex(Number(visible.target.dataset.chapter));
      },
      { threshold: [0.35, 0.55, 0.75] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [currentView]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (currentView !== "main" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(document.activeElement?.tagName)) return;
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowDown", "PageDown"].includes(event.key) ? 1 : -1;
      const next = Math.max(0, Math.min(chapters.length - 1, activeRef.current + direction));
      scrollToChapter(chapters[next].id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentView]);

  const openCourseGuide = () => {
    window.location.hash = "course-guide";
  };

  const closeCourseGuide = () => {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setCurrentView("main");
    window.setTimeout(() => scrollToChapter("course-plan"), 0);
  };

  const contextValue = useMemo(() => ({ activeIndex }), [activeIndex]);

  if (currentView === "course-guide") {
    return <CourseGuide onBack={closeCourseGuide} />;
  }

  return (
    <div className="app-shell" data-active-chapter={contextValue.activeIndex}>
      <Header activeIndex={activeIndex} />
      <main>
        <Hero />
        <About />
        <Programme />
        <PersonalCoursePlan onOpenCourseGuide={openCourseGuide} />
        <Experience />
        <Contact />
      </main>
      <ChapterRail activeIndex={activeIndex} />
    </div>
  );
}
