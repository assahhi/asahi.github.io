import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  ChartLineUp,
  CheckCircle,
  Compass,
  Database,
  GraduationCap,
  Shuffle,
  Sparkle,
  X,
} from "@phosphor-icons/react";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const chapters = [
  { id: "intro", short: "START", title: "开场" },
  { id: "about", short: "A", title: "About Me" },
  { id: "programme", short: "B1", title: "Programme Courses" },
  { id: "course-plan", short: "B2", title: "My Course Map" },
  { id: "experience", short: "C", title: "Comprehensive Experience" },
];

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
    courses: ["Totally Fully for Intership"],
    note: "选修实习课，summer结束后根据梦中情岗直接投递/补更多实习",
  },
  {
    index: "04",
    title: "Term2 - Sem2",
    year: "2027",
    period: "1 月 — 5 月",
    courses: ["Business Valuation and Financial Statement Analysis",],
    note: "边实习边上课，完成最后一门选修课，毕业",
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
    title: "先搭自己的学习系统",
    copy: "课程密度不低。比起追求工具数量，更重要的是固定一条主线：问题—数据—方法—表达。每门课都留下一份可复用作品。",
  },
  {
    icon: Briefcase,
    index: "02",
    title: "把 24 个月当成职业窗口",
    copy: "深圳的产业与实习机会很近，但机会不会自动发生。尽早确定目标岗位，用课程项目补齐作品集，再用实习校准方向。",
  },
  {
    icon: ChartLineUp,
    index: "03",
    title: "主动经营同伴与节奏",
    copy: "同学的背景会非常多元。多问、多分享、早点组队；给生活留一点缓冲，长期稳定比短期满负荷更容易走远。",
  },
];

function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Brand() {
  return (
    <button className="brand" type="button" onClick={() => scrollToChapter("intro")} aria-label="返回开场">
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
        <span>2026 新生 Orientation 分享</span>
        <span className="chapter-count">
          {String(activeIndex + 1).padStart(2, "0")} <i>/ {String(chapters.length).padStart(2, "0")}</i>
        </span>
      </div>
    </header>
  );
}

function AdvicePanel({ open, loading, advice, onClose, onRefresh }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="advice-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.aside
            className="advice-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="advice-title"
            initial={{ y: 36, opacity: 0, rotate: -1 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 24, opacity: 0 }}
          >
            <button className="icon-button" type="button" onClick={onClose} aria-label="关闭建议">
              <X size={22} weight="bold" />
            </button>
            <p className="eyebrow">FIELD NOTE · SERVER RESPONSE</p>
            <h2 id="advice-title">给新生的一条坐标</h2>
            <div className="advice-copy" aria-live="polite">
              {loading ? <span className="loading-line">正在从路线册里抽取…</span> : advice}
            </div>
            <button className="text-action" type="button" onClick={onRefresh} disabled={loading}>
              <Shuffle size={19} weight="bold" />
              再抽一条
            </button>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
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

function Hero({ onAdvice }) {
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
            <button className="secondary-button" type="button" onClick={onAdvice}>
              <Shuffle size={20} weight="bold" />
              随机抽一条建议
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
            <small>{["22.5431°N", "113.957°E", "22.69°N", "114.06°E"][index]}</small>
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

function PersonalCoursePlan() {
  return (
    <section className="chapter course-plan" id="course-plan" data-chapter="3">
      <div className="section-grid">
        <Reveal className="section-heading course-plan-heading">
          <p className="eyebrow">B2 / 我的课程安排 · PERSONAL COURSE MAP</p>
          <h2>Course Schedule</h2>

        </Reveal>

        <Reveal className="course-plan-note" delay={0.08}>
          <span>EDITABLE PAGE</span>
          <strong>个人内容预留区</strong>
          <small>当前为占位内容，可随时替换</small>
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

function Experience({ onAdvice }) {
  return (
    <section className="chapter experience" id="experience" data-chapter="4">
      <div className="section-grid">
        <Reveal className="section-heading experience-heading">
          <p className="eyebrow">C / 综合体验 · FIELD NOTES</p>
          <h2>我会提前告诉<br />新生的三件事</h2>
          <p className="lead">
            以下是我的个人体验，不是唯一答案。希望它能帮你更早找到自己的节奏。
          </p>
        </Reveal>

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
          <div className="closing-actions">
            <button className="primary-button" type="button" onClick={onAdvice}>
              <Shuffle size={20} weight="bold" />
              抽一条入学建议
            </button>
            <button className="text-action" type="button" onClick={() => scrollToChapter("intro")}>
              回到开场 <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>

        <footer className="site-footer">
          <span>© 2026 刘璨玮 · 会计分析 Orientation 分享</span>
          <span className="backend-status"><CheckCircle size={16} weight="fill" /> 动态建议由后端服务生成</span>
          <span>Designed for new beginnings.</span>
        </footer>
      </div>
    </section>
  );
}

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const [adviceLoading, setAdviceLoading] = useState(false);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (adviceOpen || event.metaKey || event.ctrlKey || event.altKey) return;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(document.activeElement?.tagName)) return;
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowDown", "PageDown"].includes(event.key) ? 1 : -1;
      const next = Math.max(0, Math.min(chapters.length - 1, activeRef.current + direction));
      scrollToChapter(chapters[next].id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [adviceOpen]);

  const loadAdvice = async () => {
    setAdviceLoading(true);
    setAdviceOpen(true);
    try {
      const response = await fetch(`/api/advice?seed=${Date.now()}`);
      if (!response.ok) throw new Error("advice unavailable");
      const data = await response.json();
      setAdvice(data.advice);
    } catch {
      setAdvice("先选一件你愿意持续做一学期的小事。稳定的积累，比一次性的满格状态更有力量。");
    } finally {
      setAdviceLoading(false);
    }
  };

  const contextValue = useMemo(() => ({ activeIndex }), [activeIndex]);

  return (
    <div className="app-shell" data-active-chapter={contextValue.activeIndex}>
      <Header activeIndex={activeIndex} />
      <main>
        <Hero onAdvice={loadAdvice} />
        <About />
        <Programme />
        <PersonalCoursePlan />
        <Experience onAdvice={loadAdvice} />
      </main>
      <ChapterRail activeIndex={activeIndex} />
      <AdvicePanel
        open={adviceOpen}
        loading={adviceLoading}
        advice={advice}
        onClose={() => setAdviceOpen(false)}
        onRefresh={loadAdvice}
      />
    </div>
  );
}
