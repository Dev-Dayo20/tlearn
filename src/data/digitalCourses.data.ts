import type { DigitalCourse } from "@/types/digitalCourse.types";

export const DIGITAL_COURSE_CATEGORIES = [
  "All",
  "Digital Literacy & Productivity",
  "Coding & Software",
  "Data & Analytics",
  "Artificial Intelligence",
  "Design & UI/UX",
  "Digital Marketing & Content",
  "Cybersecurity & Safety",
] as const;

// Helper to construct normalized courses cleanly
const createCourse = (data: {
  id: string;
  title: string;
  slug: string;
  category: string;
  term: "First Term" | "Second Term" | "Third Term";
  pathway?: string;
  shortDescription: string;
  fullDescription: string;
  targetLevel: string;
  eligibleClassLevels: string[];
  duration?: string;
  lessonsCount?: number;
  modulesCount?: number;
  thumbnail: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    organization?: string;
  };
  rating?: number;
  reviewsCount?: number;
  enrolledCount?: number;
  badge?: "Recommended" | "New" | "Featured" | "Trending" | "Popular";
  accentColor?: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  skills: string[];
  prerequisites?: string;
  learningOutcomes: string[];
  curriculum: {
    moduleNumber: number;
    title: string;
    duration: string;
    lessonsCount: number;
    topics: string[];
  }[];
}): DigitalCourse => ({
  ...data,
  duration: data.duration || "10 Weeks (20 Hours)",
  lessonsCount: data.lessonsCount || 20,
  modulesCount: data.modulesCount || data.curriculum.length,
  rating: data.rating || 4.9,
  reviewsCount: data.reviewsCount || 120,
  enrolledCount: data.enrolledCount || 350,
  accentColor: data.accentColor || "indigo",
  prerequisites:
    data.prerequisites || "Open to all students enrolled in this class level.",
  certificateOffered: true,
});

const defaultInstructors = {
  literacy: {
    name: "Amina Adeleke",
    role: "Digital Literacy & Productivity Specialist",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    organization: "TLearn Academy",
  },
  coding: {
    name: "Engr. Emmanuel Kalu",
    role: "Senior Software Engineer & Lead Mentor",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    organization: "TechForward Academy",
  },
  design: {
    name: "Zainab Bello",
    role: "Lead UI/UX Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    organization: "DesignCraft Studio",
  },
  ai: {
    name: "Dr. Chioma Nwachukwu",
    role: "AI Researcher & Youth STEM Director",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    organization: "African AI Institute",
  },
  data: {
    name: "Dr. Olayinka Cole",
    role: "Chief Data Scientist",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    organization: "Africa Data Institute",
  },
  marketing: {
    name: "Tunde Bakare",
    role: "Head of Growth & Digital Strategy",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    organization: "Digital Wave Africa",
  },
  cyber: {
    name: "Ibrahim Sani",
    role: "Security Operations & Ethical Defense Lead",
    avatar:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80",
    organization: "CyberShield Security",
  },
};

const JSS1_LEVELS = [
  "jss 1",
  "jss1",
  "junior secondary 1",
  "grade 7",
  "basic 7",
];
const JSS2_LEVELS = [
  "jss 2",
  "jss2",
  "junior secondary 2",
  "grade 8",
  "basic 8",
];
const JSS3_LEVELS = [
  "jss 3",
  "jss3",
  "junior secondary 3",
  "grade 9",
  "basic 9",
];
const SS1_LEVELS = [
  "ss 1",
  "ss1",
  "sss 1",
  "sss1",
  "senior secondary 1",
  "grade 10",
];
const SS2_LEVELS = [
  "ss 2",
  "ss2",
  "sss 2",
  "sss2",
  "senior secondary 2",
  "grade 11",
];
const SS3_LEVELS = [
  "ss 3",
  "ss3",
  "sss 3",
  "sss3",
  "senior secondary 3",
  "grade 12",
];

export const DIGITAL_COURSES: DigitalCourse[] = [
  // ==========================================
  // JSS 1 COURSES
  // ==========================================
  createCourse({
    id: "jss1-t1",
    title: "Computer & Digital Literacy",
    slug: "jss1-computer-digital-literacy",
    category: "Digital Literacy & Productivity",
    term: "First Term",
    shortDescription:
      "Essential foundations of computer hardware, operating systems, file structures, and everyday computing skills.",
    fullDescription:
      "Introduces JSS 1 students to modern computing. Learn input/output devices, operating system navigation, file organization, folders, desktop customization, and fundamental troubleshooting.",
    targetLevel: "JSS 1",
    eligibleClassLevels: JSS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.literacy,
    badge: "Recommended",
    accentColor: "sky",
    skills: [
      "Computer Hardware & Software",
      "File Management",
      "OS Navigation",
      "System Settings",
    ],
    learningOutcomes: [
      "Understand computer architecture (CPU, RAM, Storage, I/O)",
      "Organize school documents cleanly with directories and folders",
      "Navigate Windows and cloud drive interfaces with confidence",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Hardware and Operating Systems",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Input/Output devices",
          "Storage drives vs RAM",
          "Starting and shutting down safely",
        ],
      },
      {
        moduleNumber: 2,
        title: "Files, Folders & Storage Management",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Creating and renaming folders",
          "Moving, copying, deleting files",
          "Search and file extensions",
        ],
      },
      {
        moduleNumber: 3,
        title: "Desktop Ergonomics & Settings",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Customizing display settings",
          "Keyboard and mouse accessibility",
          "Basic system diagnostics",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss1-t2",
    title: "Typing & Productivity Skills",
    slug: "jss1-typing-productivity-skills",
    category: "Digital Literacy & Productivity",
    term: "Second Term",
    shortDescription:
      "Master home-row touch typing, speed building, keyboard shortcuts, and document creation hygiene.",
    fullDescription:
      "Develop rapid touch typing and fundamental document creation habits. Students practice finger positioning, achieve 35+ words per minute, and format clean essays with headers and bullet lists.",
    targetLevel: "JSS 1",
    eligibleClassLevels: JSS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.literacy,
    badge: "Popular",
    accentColor: "emerald",
    skills: [
      "Touch Typing",
      "Speed & Accuracy (WPM)",
      "Keyboard Shortcuts",
      "Document Formatting",
    ],
    learningOutcomes: [
      "Type accurately without looking at keyboard keys",
      "Master essential productivity shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S)",
      "Format clean academic papers with paragraphs, margins, and headings",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Home Row Technique & Posture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Ergonomic seating",
          "Home row keys (ASDF JKL;)",
          "Spacebar and thumb coordination",
        ],
      },
      {
        moduleNumber: 2,
        title: "Upper & Lower Keys + Punctuation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Top row reaches",
          "Bottom row reaches",
          "Capital letters and punctuation keys",
        ],
      },
      {
        moduleNumber: 3,
        title: "Speed Drills & Word Processing Formatting",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "WPM speed challenges",
          "Formatting titles and paragraphs",
          "Final typing proficiency badge",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss1-t3",
    title: "Internet & Online Safety + Google/Microsoft Productivity Tools",
    slug: "jss1-internet-safety-productivity-tools",
    category: "Cybersecurity & Safety",
    term: "Third Term",
    shortDescription:
      "Safe internet browsing, cyber hygiene, password security, and introduction to Google Docs and Word.",
    fullDescription:
      "Equips students to navigate the web securely, recognize online threats, create unbreakable passwords, and create professional school assignments using Google Docs and MS Word.",
    targetLevel: "JSS 1",
    eligibleClassLevels: JSS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Featured",
    accentColor: "violet",
    skills: [
      "Online Safety & Privacy",
      "Password Security",
      "Google Docs / MS Word",
      "Safe Web Search",
    ],
    learningOutcomes: [
      "Identify phishing links, suspicious popups, and cyber risks",
      "Draft, format, and share assignments via Google Docs",
      "Practice positive digital citizenship and safe communication",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "The Safe Internet Explorer",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "How the web works",
          "URLs, HTTPS and padlock indicators",
          "Recognizing scams and suspicious links",
        ],
      },
      {
        moduleNumber: 2,
        title: "Password Vault & Digital Footprint",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Strong passwords and passphrases",
          "Protecting personal privacy",
          "Digital footprint awareness",
        ],
      },
      {
        moduleNumber: 3,
        title: "Cloud Productivity Essentials",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Google Docs & Word essentials",
          "Inserting images and tables",
          "Collaborative assignment submission",
        ],
      },
    ],
  }),

  // ==========================================
  // JSS 2 COURSES
  // ==========================================
  createCourse({
    id: "jss2-t1",
    title: "Google Collaboration Tools",
    slug: "jss2-google-collaboration-tools",
    category: "Digital Literacy & Productivity",
    term: "First Term",
    shortDescription:
      "Collaborative teamwork with Google Drive, Docs, Sheets, Slides, Forms, and Google Classroom.",
    fullDescription:
      "Master real-time team collaboration in the cloud. Students build group presentations in Google Slides, collect survey data with Google Forms, analyze simple tables in Sheets, and manage shared Drive folders.",
    targetLevel: "JSS 2",
    eligibleClassLevels: JSS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.literacy,
    badge: "Recommended",
    accentColor: "sky",
    skills: [
      "Google Drive",
      "Google Slides",
      "Google Sheets",
      "Google Forms",
      "Real-Time Collaboration",
    ],
    learningOutcomes: [
      "Create interactive group presentation slide decks",
      "Collect and organize survey responses using Google Forms",
      "Manage permissions, comments, and real-time co-authoring",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Drive Architecture & Sharing Permissions",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Drive organization",
          "Viewer vs Editor permissions",
          "Team shared folders",
        ],
      },
      {
        moduleNumber: 2,
        title: "Interactive Slides & Visual Presentations",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Slide layouts and themes",
          "Transitions and media embedding",
          "Co-presenting with classmates",
        ],
      },
      {
        moduleNumber: 3,
        title: "Forms & Sheets Data Collection",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Designing school surveys in Forms",
          "Viewing responses in Sheets",
          "Formatting tables and charts",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss2-t2",
    title: "Graphic Design",
    slug: "jss2-graphic-design",
    category: "Design & UI/UX",
    term: "Second Term",
    shortDescription:
      "Visual design principles, color theory, typography, branding, and digital poster creation with Canva & tools.",
    fullDescription:
      "Unlock your artistic vision for digital screens! JSS 2 students learn visual hierarchy, complementary color palettes, typography selection, logo design, and produce high-impact school flyers and event posters.",
    targetLevel: "JSS 2",
    eligibleClassLevels: JSS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Popular",
    accentColor: "rose",
    skills: [
      "Visual Hierarchy",
      "Color Psychology",
      "Typography",
      "Canva / Vector Tools",
      "Poster Design",
    ],
    learningOutcomes: [
      "Apply color theory and typography rules to creative graphics",
      "Design branded school banners, social flyers, and certificates",
      "Export high-resolution graphics for digital and print formats",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Design Fundamentals & Visual Balance",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Rule of thirds and alignment",
          "Whitespace and visual weight",
          "Contrast and readability",
        ],
      },
      {
        moduleNumber: 2,
        title: "Colors & Typography in Action",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Color wheel and mood palettes",
          "Serif vs Sans-Serif fonts",
          "Pairing header and body fonts",
        ],
      },
      {
        moduleNumber: 3,
        title: "Publishing Your Design Showcase",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Creating event posters",
          "Designing school badges and logos",
          "Portfolio compilation",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss2-t3",
    title: "Introduction to Animation",
    slug: "jss2-introduction-to-animation",
    category: "Design & UI/UX",
    term: "Third Term",
    shortDescription:
      "Keyframe animation, timing principles, stop-motion concepts, and 2D character movement for digital media.",
    fullDescription:
      "Breathe life into static graphics! Learn the 12 principles of animation including squash-and-stretch, easing, anticipation, and timing. Create 2D animated explainers, moving logo stings, and character walks.",
    targetLevel: "JSS 2",
    eligibleClassLevels: JSS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Trending",
    accentColor: "amber",
    skills: [
      "Keyframe Animation",
      "Easing & Timing",
      "2D Motion Graphics",
      "Storyboarding",
      "Audio Syncing",
    ],
    learningOutcomes: [
      "Apply animation timing and easing principles",
      "Create storyboard sketches for narrative animations",
      "Export smooth MP4 and GIF animated clips",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Principles of Motion & Timing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "FPS and timing charts",
          "Squash & stretch ball bounce",
          "Easing in and out",
        ],
      },
      {
        moduleNumber: 2,
        title: "Storyboarding & Scene Design",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Shot composition and camera angles",
          "Designing character poses",
          "Background parallax",
        ],
      },
      {
        moduleNumber: 3,
        title: "Motion Project & Sound Mixing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Animating a 15-second story scene",
          "Syncing sound effects and music",
          "Exporting for digital showcase",
        ],
      },
    ],
  }),

  // ==========================================
  // JSS 3 COURSES
  // ==========================================
  createCourse({
    id: "jss3-t1",
    title: "Scratch/Block Programming",
    slug: "jss3-scratch-block-programming",
    category: "Coding & Software",
    term: "First Term",
    shortDescription:
      "Advanced block coding, variables, game physics, broadcast events, and interactive game studio projects.",
    fullDescription:
      "Develop algorithmic thinking before text code. Build complex multi-level platformer games, arcade simulations, and interactive quizzes while mastering variables, lists, nested logic, and cloning.",
    targetLevel: "JSS 3",
    eligibleClassLevels: JSS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Recommended",
    accentColor: "emerald",
    skills: [
      "Variables & Conditionals",
      "Game Physics & Collisions",
      "Cloning & Loops",
      "Algorithmic Logic",
    ],
    learningOutcomes: [
      "Program complete playable games with score, lives, and timers",
      "Implement Cartesian coordinate movement and gravity simulations",
      "Debug logic errors using step-by-step troubleshooting",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Coordinates & Dynamic Motion",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "X/Y coordinate plane",
          "Smooth arrow-key controls",
          "Collision boundaries",
        ],
      },
      {
        moduleNumber: 2,
        title: "Variables, Clones & Game States",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Global vs sprite variables",
          "Cloning enemy waves",
          "Start, Win, and Game-Over states",
        ],
      },
      {
        moduleNumber: 3,
        title: "Platformer Physics & Final Game",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Gravity and jump mechanics",
          "Level transitions and sound fx",
          "Publishing games online",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss3-t2",
    title: "HTML & CSS",
    slug: "jss3-html-and-css",
    category: "Coding & Software",
    term: "Second Term",
    shortDescription:
      "Build real websites using semantic HTML5 tags, CSS3 styling, Flexbox layout, and mobile responsiveness.",
    fullDescription:
      "Transition from blocks to professional code! Students write clean HTML5 page structures and CSS stylesheets, styling headers, cards, navigation menus, and responsive school websites.",
    targetLevel: "JSS 3",
    eligibleClassLevels: JSS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Popular",
    accentColor: "indigo",
    skills: [
      "Semantic HTML5",
      "CSS3 Selectors & Box Model",
      "Flexbox Layout",
      "Responsive Mobile Design",
    ],
    learningOutcomes: [
      "Structure multi-page websites with HTML5 semantic elements",
      "Style modern user interfaces with colors, fonts, margins, and padding",
      "Create mobile-friendly web pages that adjust to any screen size",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "HTML5 Document Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Tags, attributes, headings, paragraphs",
          "Images and anchor links",
          "Tables, lists, and forms",
        ],
      },
      {
        moduleNumber: 2,
        title: "CSS Styling & The Box Model",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Classes, IDs, and element selectors",
          "Margin, border, padding, and content",
          "Google Fonts and color schemes",
        ],
      },
      {
        moduleNumber: 3,
        title: "Flexbox & Responsive Web Project",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Flex direction and alignment",
          "Media queries for mobile screens",
          "Deploying a personal website",
        ],
      },
    ],
  }),
  createCourse({
    id: "jss3-t3",
    title: "UI/UX Design + Introduction to Artificial Intelligence",
    slug: "jss3-ui-ux-design-intro-to-ai",
    category: "Design & UI/UX",
    term: "Third Term",
    shortDescription:
      "Figma wireframing, mobile app prototyping, and fundamental Artificial Intelligence & machine learning concepts.",
    fullDescription:
      "The capstone journey for JSS 3! Students prototype smartphone apps in Figma, conduct user empathy testing, and explore how AI computer vision, speech recognition, and generative tools work under the hood.",
    targetLevel: "JSS 3",
    eligibleClassLevels: JSS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "Figma Prototyping",
      "UI Wireframing",
      "AI & Machine Learning Basics",
      "Prompt Engineering",
    ],
    learningOutcomes: [
      "Create clickable mobile app prototypes in Figma",
      "Understand machine learning training data and prediction models",
      "Design an AI-powered smartphone app concept for school",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "UI/UX Wireframing in Figma",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "User personas and problem statements",
          "Paper sketches to Figma wireframes",
          "Button components and inputs",
        ],
      },
      {
        moduleNumber: 2,
        title: "Interactive Mobile Prototyping",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Screen transitions and click gestures",
          "Mobile app navigation bars",
          "Testing with classmates",
        ],
      },
      {
        moduleNumber: 3,
        title: "AI Fundamentals & Smart Apps",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "How computers learn from data",
          "Vision and speech AI demos",
          "AI app capstone presentation",
        ],
      },
    ],
  }),

  // ==========================================
  // SS 1 — CAREER EXPLORATION & FOUNDATION
  // ==========================================
  // First Term — Common Foundation:
  createCourse({
    id: "ss1-t1-c1",
    title: "Python Programming",
    slug: "ss1-python-programming",
    category: "Coding & Software",
    term: "First Term",
    pathway: "Common Foundation",
    shortDescription:
      "Comprehensive Python basics: data types, control flow, functions, loops, and algorithmic problem solving.",
    fullDescription:
      "Build a rock-solid coding foundation with Python. Students write clean scripts, manipulate lists and dictionaries, define reusable functions, and create practical calculators, games, and automation tools.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Recommended",
    accentColor: "indigo",
    skills: [
      "Python Syntax",
      "Conditionals & Loops",
      "Data Structures",
      "Functions & Modules",
    ],
    learningOutcomes: [
      "Write idiomatic Python scripts in modern IDEs",
      "Process text, numbers, and structured data collections",
      "Solve algorithmic challenges with structured control flow",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Python Environment & Syntax",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Installing Python & VS Code",
          "Variables, types, user input",
          "Math and string operations",
        ],
      },
      {
        moduleNumber: 2,
        title: "Conditionals & Repetition",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "If-elif-else logic",
          "For loops and range()",
          "While loops and break/continue",
        ],
      },
      {
        moduleNumber: 3,
        title: "Data Structures & Functions",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Lists, tuples, dictionaries",
          "Custom functions and return values",
          "Building a CLI application",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t1-c2",
    title: "Data Literacy & Spreadsheet Analysis",
    slug: "ss1-data-literacy-spreadsheet-analysis",
    category: "Data & Analytics",
    term: "First Term",
    pathway: "Common Foundation",
    shortDescription:
      "Data literacy, Excel & Google Sheets formulas, pivot tables, and statistical data visualization.",
    fullDescription:
      "Become data-fluent! Learn how numbers drive decisions in science, business, and tech. Master spreadsheet formulas (SUM, AVERAGE, VLOOKUP, IF), clean messy survey datasets, and build visual dashboards.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Featured",
    accentColor: "emerald",
    skills: [
      "Spreadsheet Formulas",
      "Pivot Tables",
      "Data Visualization",
      "Statistical Analysis",
    ],
    learningOutcomes: [
      "Use advanced spreadsheet functions (VLOOKUP, COUNTIF, IF)",
      "Summarize multi-column datasets with pivot tables",
      "Build insightful bar charts, pie graphs, and trendlines",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Data Essentials & Formulas",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Data types and hygiene",
          "Basic & conditional formulas",
          "Relative vs absolute cell references",
        ],
      },
      {
        moduleNumber: 2,
        title: "Pivot Tables & Aggregations",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Filtering and sorting tables",
          "Generating pivot summaries",
          "VLOOKUP and XLOOKUP",
        ],
      },
      {
        moduleNumber: 3,
        title: "Charts & Executive Dashboard",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Choosing the right chart type",
          "Formatting visual dashboards",
          "Presenting data insights",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t1-c3",
    title: "Generative AI Fundamentals",
    slug: "ss1-generative-ai-fundamentals",
    category: "Artificial Intelligence",
    term: "First Term",
    pathway: "Common Foundation",
    shortDescription:
      "Prompt engineering, Large Language Models (LLMs), AI productivity, and ethical principles of generative tech.",
    fullDescription:
      "Learn to collaborate with AI effectively. Understand how generative models work, craft advanced structured prompts, use AI for research, coding assistance, creative writing, and analyze ethical considerations.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "Prompt Engineering",
      "LLM Mechanics",
      "AI Co-Working",
      "Ethical AI & Bias",
    ],
    learningOutcomes: [
      "Write multi-step contextual prompts for research and study",
      "Use generative AI to debug code and draft written work",
      "Critically assess hallucinations, bias, and copyright",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Inside Generative Models",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Neural networks and tokens",
          "How LLMs predict words",
          "Text, image, and audio models",
        ],
      },
      {
        moduleNumber: 2,
        title: "Prompt Engineering Mastery",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Role, context, constraint framework",
          "Few-shot and chain-of-thought prompting",
          "AI research workflows",
        ],
      },
      {
        moduleNumber: 3,
        title: "AI Ethics & Future of Work",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Detecting misinformation and bias",
          "Academic integrity with AI tools",
          "Building custom AI assistants",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t1-c4",
    title: "Digital Marketing Fundamentals",
    slug: "ss1-digital-marketing-fundamentals",
    category: "Digital Marketing & Content",
    term: "First Term",
    pathway: "Common Foundation",
    shortDescription:
      "Audience targeting, brand storytelling, social media strategies, SEO basics, and digital analytics.",
    fullDescription:
      "Discover how top global brands grow online. Students learn customer segmentation, content funnels, search engine optimization (SEO), email marketing, and analyze web engagement metrics.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Popular",
    accentColor: "amber",
    skills: [
      "Brand Identity",
      "Social Media Strategy",
      "SEO Basics",
      "Content Marketing Funnels",
    ],
    learningOutcomes: [
      "Define target customer personas and brand voice",
      "Plan social media marketing content calendars",
      "Understand organic search rankings and conversion metrics",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "The Digital Marketing Landscape",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Inbound vs outbound marketing",
          "Customer personas and journeys",
          "Brand positioning",
        ],
      },
      {
        moduleNumber: 2,
        title: "Content Strategy & SEO Basics",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Search engines and keywords",
          "Creating engaging copy",
          "Social media channel strategies",
        ],
      },
      {
        moduleNumber: 3,
        title: "Campaign Planning & Analytics",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Designing a launch campaign",
          "Tracking impressions, clicks, and CTR",
          "Campaign performance audit",
        ],
      },
    ],
  }),

  // SS 1 Second Term Courses:
  createCourse({
    id: "ss1-t2-c1",
    title: "Web Development",
    slug: "ss1-web-development",
    category: "Coding & Software",
    term: "Second Term",
    pathway: "Technical Track",
    shortDescription:
      "HTML5, CSS3, responsive layouts, and introductory JavaScript DOM manipulation for interactive websites.",
    fullDescription:
      "Advance your web development skills. Create full interactive websites with CSS Grid, Flexbox, responsive navbar menus, forms, and JavaScript event listeners.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Recommended",
    accentColor: "indigo",
    skills: [
      "HTML5 & CSS3",
      "JavaScript DOM",
      "CSS Grid & Flexbox",
      "Web Responsiveness",
    ],
    learningOutcomes: [
      "Code complete responsive multi-section web interfaces",
      "Add interactive JavaScript buttons, modals, and forms",
      "Deploy live websites using modern web hosting",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Modern CSS Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "CSS Grid systems",
          "Custom properties (CSS Variables)",
          "Fluid responsive typography",
        ],
      },
      {
        moduleNumber: 2,
        title: "JavaScript Interactivity Basics",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Selecting DOM elements",
          "Event listeners (click, input)",
          "Toggling themes (Dark/Light)",
        ],
      },
      {
        moduleNumber: 3,
        title: "Interactive Web Project",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building a dynamic portfolio",
          "Form validation with JS",
          "Publishing to the web",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t2-c2",
    title: "Data Analytics",
    slug: "ss1-data-analytics",
    category: "Data & Analytics",
    term: "Second Term",
    pathway: "Data Track",
    shortDescription:
      "SQL queries, data cleaning, relational databases, and visual analytics for actionable business insights.",
    fullDescription:
      "Learn to query and manipulate large datasets using SQL (SELECT, WHERE, JOIN, GROUP BY). Clean real-world datasets and create interactive visual reports.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Popular",
    accentColor: "emerald",
    skills: [
      "SQL Fundamentals",
      "Data Cleaning",
      "Relational Databases",
      "Data Visualization",
    ],
    learningOutcomes: [
      "Write multi-table SQL queries to extract data",
      "Identify and remediate missing, duplicate, or corrupted values",
      "Translate raw numbers into executive summary charts",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Relational Databases & SQL",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Database tables and schema",
          "SELECT, WHERE, ORDER BY",
          "Filtering and sorting queries",
        ],
      },
      {
        moduleNumber: 2,
        title: "Aggregations & Joins",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "GROUP BY and HAVING",
          "INNER and LEFT JOIN",
          "Combining multi-table records",
        ],
      },
      {
        moduleNumber: 3,
        title: "Analytics Project & Dashboards",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Data storytelling principles",
          "Creating automated reports",
          "Final case study presentation",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t2-c3",
    title: "UI/UX Design",
    slug: "ss1-ui-ux-design",
    category: "Design & UI/UX",
    term: "Second Term",
    pathway: "Design Track",
    shortDescription:
      "User research, information architecture, design systems, Figma auto-layout, and interactive prototyping.",
    fullDescription:
      "Deep dive into product design. Learn user interview techniques, journey mapping, wireframing, building design tokens, Figma auto-layout, and interactive app prototypes.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Featured",
    accentColor: "rose",
    skills: [
      "Figma Mastery",
      "User Research & Journey Maps",
      "Design Systems",
      "Prototyping",
    ],
    learningOutcomes: [
      "Create scalable design systems with reusable components",
      "Conduct user research and translate insights into wireframes",
      "Build high-fidelity smartphone app prototypes",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Research & User Personas",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Conducting user interviews",
          "Journey maps and user flows",
          "Information architecture",
        ],
      },
      {
        moduleNumber: 2,
        title: "Figma Components & Auto-Layout",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Auto-layout responsive cards",
          "Variants and interactive components",
          "Design tokens (colors, typography)",
        ],
      },
      {
        moduleNumber: 3,
        title: "Full App Prototype & Usability Testing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Smart animate transitions",
          "Moderated usability test sessions",
          "Refining design based on feedback",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t2-c4",
    title: "Digital Marketing and Content Creation",
    slug: "ss1-digital-marketing-content-creation",
    category: "Digital Marketing & Content",
    term: "Second Term",
    pathway: "Creative Track",
    shortDescription:
      "Copywriting, video content production, podcasting basics, brand voice, and social growth algorithms.",
    fullDescription:
      "Master modern content creation across digital platforms. Learn scriptwriting, short-form video production (Reels, TikTok, YouTube), graphic carousel design, and engagement analytics.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Trending",
    accentColor: "amber",
    skills: [
      "Content Creation",
      "Short-Form Video Production",
      "Copywriting",
      "Audience Growth",
    ],
    learningOutcomes: [
      "Script, record, and edit high-quality short-form videos",
      "Write compelling headlines, captions, and call-to-actions",
      "Analyze algorithm metrics to grow organic reach",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Storytelling & Copywriting",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Hook, story, offer framework",
          "Writing persuasive headlines",
          "Content pillars and calendars",
        ],
      },
      {
        moduleNumber: 2,
        title: "Video Production & Editing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Lighting, audio, framing",
          "Mobile video editing tools",
          "Adding captions, B-roll, and music",
        ],
      },
      {
        moduleNumber: 3,
        title: "Multi-Platform Campaign Launch",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Repurposing content across channels",
          "Measuring engagement and reach",
          "Final content portfolio",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t2-c5",
    title: "Cyber Security Fundamentals",
    slug: "ss1-cyber-security-fundamentals",
    category: "Cybersecurity & Safety",
    term: "Second Term",
    pathway: "Security Track",
    shortDescription:
      "Network architecture, encryption algorithms, threat modeling, social engineering, and defense practices.",
    fullDescription:
      "Gain foundational understanding of modern cybersecurity. Explore network packets, firewalls, symmetric/asymmetric cryptography, common cyber attack vectors, and incident response.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Popular",
    accentColor: "sky",
    skills: [
      "Network Security",
      "Cryptography",
      "Threat Modeling",
      "Defensive Security",
    ],
    learningOutcomes: [
      "Understand the CIA triad (Confidentiality, Integrity, Availability)",
      "Explain encryption algorithms and digital certificate mechanics",
      "Identify social engineering and malware exploitation techniques",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "The Security Landscape & CIA Triad",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Confidentiality, integrity, availability",
          "Threat actors and attack vectors",
          "Malware types (Ransomware, Trojans)",
        ],
      },
      {
        moduleNumber: 2,
        title: "Networks & Cryptography",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "IP addressing and ports",
          "Symmetric vs asymmetric keys",
          "How SSL/TLS certificates secure traffic",
        ],
      },
      {
        moduleNumber: 3,
        title: "Defensive Tactics & Security Audit",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Firewalls and multi-factor auth",
          "Social engineering defense",
          "Conducting a basic security audit",
        ],
      },
    ],
  }),

  // SS 1 Third Term — Hands-on Project Modules:
  createCourse({
    id: "ss1-t3-c1",
    title: "Build a Website (Project)",
    slug: "ss1-build-a-website-project",
    category: "Coding & Software",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Plan, code, polish, and launch a production-ready website from scratch.",
    fullDescription:
      "Hands-on capstone project where students architect, code, and deploy a full multi-page website (such as an NGO portal, school club, or personal brand) live to the web.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Featured",
    accentColor: "indigo",
    skills: [
      "Full Web Deployment",
      "HTML/CSS/JS Project",
      "Responsive Design",
      "Project Management",
    ],
    learningOutcomes: [
      "Plan wireframes and user flows",
      "Write clean HTML, CSS, and JS",
      "Deploy live URL on GitHub Pages",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Project Scoping & Wireframing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Client brief and requirements",
          "Paper wireframes and layout plan",
        ],
      },
      {
        moduleNumber: 2,
        title: "Coding & Interactive Features",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Structuring sections",
          "Styling responsive UI",
          "Adding JavaScript interactions",
        ],
      },
      {
        moduleNumber: 3,
        title: "Testing, Launch & Presentation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Cross-browser testing",
          "Live deployment",
          "Final project demo",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t3-c2",
    title: "Design a Mobile App (Project)",
    slug: "ss1-design-a-mobile-app-project",
    category: "Design & UI/UX",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Research user needs, design a Figma prototype, and test an interactive mobile app.",
    fullDescription:
      "Transform a solution concept into an interactive smartphone application mockup in Figma, complete with onboarding, user flows, and usability test results.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Popular",
    accentColor: "rose",
    skills: [
      "Mobile UI/UX",
      "Figma Interactive Prototypes",
      "Usability Testing",
      "Design Presentation",
    ],
    learningOutcomes: [
      "Design high-fidelity screens",
      "Build interactive click transitions",
      "Present prototype demo",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Concept & User Research",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Problem statement", "User personas and journey"],
      },
      {
        moduleNumber: 2,
        title: "High-Fidelity App Screens",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Designing 6-8 key app screens", "Components and styling"],
      },
      {
        moduleNumber: 3,
        title: "Prototyping & Feedback",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Wiring interactive prototype", "Conducting test sessions"],
      },
    ],
  }),
  createCourse({
    id: "ss1-t3-c3",
    title: "Analyse a Dataset (Project)",
    slug: "ss1-analyse-a-dataset-project",
    category: "Data & Analytics",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Clean a real-world dataset, query key trends, and present visual data insights.",
    fullDescription:
      "Apply your data analytics skills to a real dataset in education, sports, or finance. Uncover patterns, generate charts, and present actionable findings.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Recommended",
    accentColor: "emerald",
    skills: [
      "Data Wrangling",
      "Statistical Insight",
      "Chart Creation",
      "Data Storytelling",
    ],
    learningOutcomes: [
      "Clean raw dataset",
      "Perform statistical aggregations",
      "Create an executive dashboard report",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Dataset Selection & Cleaning",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Sourcing data", "Cleaning duplicates and nulls"],
      },
      {
        moduleNumber: 2,
        title: "Exploratory Analysis",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Calculating averages and distributions",
          "Finding correlations",
        ],
      },
      {
        moduleNumber: 3,
        title: "Visual Dashboard & Report",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Designing visual report", "Presenting data storytelling"],
      },
    ],
  }),
  createCourse({
    id: "ss1-t3-c4",
    title: "Create an AI Solution (Project)",
    slug: "ss1-create-an-ai-solution-project",
    category: "Artificial Intelligence",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Build an AI model or automated intelligent workflow addressing a school or community problem.",
    fullDescription:
      "Build a functioning AI application or automated solution using computer vision, generative AI prompts, or custom machine learning models.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "AI Model Training",
      "Automation Workflows",
      "Problem Framing",
      "AI System Evaluation",
    ],
    learningOutcomes: [
      "Train or configure an AI model",
      "Integrate model into a functioning app or workflow",
      "Evaluate accuracy and ethics",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Problem Framing & Training Data",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Identifying AI opportunities", "Gathering data"],
      },
      {
        moduleNumber: 2,
        title: "Building & Connecting the Model",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Training model", "Connecting with user interface"],
      },
      {
        moduleNumber: 3,
        title: "Testing & Ethical Review",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Testing edge cases", "Final solution presentation"],
      },
    ],
  }),
  createCourse({
    id: "ss1-t3-c5",
    title: "Develop a Digital Marketing Campaign (Project)",
    slug: "ss1-develop-a-digital-marketing-campaign-project",
    category: "Digital Marketing & Content",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Plan, design creatives, write copy, and launch a complete simulated digital campaign.",
    fullDescription:
      "Put marketing theory into practice! Plan an end-to-end promotional campaign for a school event or product launch, produce all social creatives, copy, and tracking plans.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Popular",
    accentColor: "amber",
    skills: [
      "Campaign Strategy",
      "Creative Production",
      "Copywriting",
      "Performance Analytics",
    ],
    learningOutcomes: [
      "Produce multi-channel creative assets",
      "Write ad copy and captions",
      "Present full campaign pitch deck",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Campaign Strategy & Personas",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Setting campaign KPIs", "Defining audience personas"],
      },
      {
        moduleNumber: 2,
        title: "Creative & Copy Production",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Designing banners and posts",
          "Writing email and social copy",
        ],
      },
      {
        moduleNumber: 3,
        title: "Campaign Launch & Pitch",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Publishing campaign assets",
          "Presenting campaign pitch deck",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss1-t3-c6",
    title: "Conduct a Cybersecurity Assessment (Project)",
    slug: "ss1-conduct-a-cybersecurity-assessment-project",
    category: "Cybersecurity & Safety",
    term: "Third Term",
    pathway: "Capstone Project",
    shortDescription:
      "Complete project: Perform a structured security assessment on a digital system, identify risks, and write recommendations.",
    fullDescription:
      "Learn how security consultants operate. Perform an audit on password policies, network setups, phishing vulnerabilities, and compile an actionable security defense report.",
    targetLevel: "SS 1",
    eligibleClassLevels: SS1_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Featured",
    accentColor: "sky",
    skills: [
      "Vulnerability Assessment",
      "Risk Scoring",
      "Security Auditing",
      "Technical Reporting",
    ],
    learningOutcomes: [
      "Identify security weaknesses in simulated networks",
      "Score risks using industry metrics",
      "Write a professional remediation report",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Assessment Scoping",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Audit scope and rules of engagement",
          "Reconnaissance techniques",
        ],
      },
      {
        moduleNumber: 2,
        title: "Scanning & Risk Identification",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Configuration checks", "Identifying vulnerabilities"],
      },
      {
        moduleNumber: 3,
        title: "Remediation & Defense Report",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Drafting security recommendations", "Executive presentation"],
      },
    ],
  }),

  // ==========================================
  // SS 2 — SPECIALISATION & PATHWAYS
  // ==========================================
  // Core Track:
  createCourse({
    id: "ss2-core-t1",
    title: "Intermediate Python Programming",
    slug: "ss2-intermediate-python-programming",
    category: "Coding & Software",
    term: "First Term",
    pathway: "Software Specialisation",
    shortDescription:
      "Object-Oriented Programming (OOP), file I/O, error handling, algorithms, and modular Python development.",
    fullDescription:
      "Advance your Python mastery. Learn classes, inheritance, polymorphism, working with JSON/CSV files, lambda functions, and build structured software applications.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Recommended",
    accentColor: "indigo",
    skills: [
      "Object-Oriented Programming (OOP)",
      "File I/O & JSON",
      "Exception Handling",
      "Modular Architecture",
    ],
    learningOutcomes: [
      "Design class hierarchies and object models",
      "Read, write, and persist data in JSON and CSV files",
      "Implement robust error handling with try/except",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "OOP: Classes and Objects",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Defining classes and attributes",
          "Methods and constructors (__init__)",
          "Encapsulation and getters/setters",
        ],
      },
      {
        moduleNumber: 2,
        title: "Inheritance & Polymorphism",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Class inheritance",
          "Overriding parent methods",
          "Polymorphism and abstract designs",
        ],
      },
      {
        moduleNumber: 3,
        title: "File Handling & Project",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Reading/writing files",
          "JSON data serialization",
          "Building an OOP student manager",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-core-t2",
    title: "Front-End Web Development",
    slug: "ss2-frontend-web-development",
    category: "Coding & Software",
    term: "Second Term",
    pathway: "Software Specialisation",
    shortDescription:
      "Modern JavaScript (ES6+), async/await, API data fetching, and component-based frontend web development.",
    fullDescription:
      "Build dynamic, data-driven web experiences. Learn modern JavaScript features, array methods (map, filter, reduce), promises, fetching REST APIs, and component architecture.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Popular",
    accentColor: "sky",
    skills: [
      "JavaScript ES6+",
      "REST API Integration",
      "Async / Await",
      "Component UI Patterns",
    ],
    learningOutcomes: [
      "Fetch and render dynamic data from cloud APIs",
      "Implement live search and filtering UI",
      "Structure scalable frontend codebases",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "ES6+ Modern JavaScript",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Destructuring and spread operators",
          "Arrow functions and array methods",
          "Modules import and export",
        ],
      },
      {
        moduleNumber: 2,
        title: "Asynchronous JavaScript & APIs",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Promises and async/await",
          "Fetch API and JSON payloads",
          "Handling loading and error states",
        ],
      },
      {
        moduleNumber: 3,
        title: "Dynamic Web Application",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building a live movie/weather app",
          "Client-side routing concepts",
          "Production deployment",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-core-t3",
    title: "Web & Digital Product Development",
    slug: "ss2-web-and-digital-product-development",
    category: "Coding & Software",
    term: "Third Term",
    pathway: "Software Specialisation",
    shortDescription:
      "Full digital product lifecycle: architecture, state management, UI frameworks, authentication, and launch.",
    fullDescription:
      "From concept to shipped product! Students assemble full digital products combining frontend interfaces, database storage, responsive layout, and user authentication.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "Product Architecture",
      "State Management",
      "Full-Stack Concepts",
      "Product Launch",
    ],
    learningOutcomes: [
      "Architect a complete digital web product",
      "Implement client-side state and storage",
      "Launch production application live",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Product Requirements & Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "User stories and technical specs",
          "Database schema planning",
        ],
      },
      {
        moduleNumber: 2,
        title: "Full Application Assembly",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building component trees",
          "Connecting persistent data storage",
        ],
      },
      {
        moduleNumber: 3,
        title: "Polishing & Product Launch",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Performance optimization", "Deploying and user testing"],
      },
    ],
  }),

  // SS 2 PATHWAY 2 — DATA, AI & MACHINE LEARNING:
  createCourse({
    id: "ss2-p2-t1",
    title: "Intermediate Python for Data",
    slug: "ss2-intermediate-python-for-data",
    category: "Data & Analytics",
    term: "First Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "NumPy arrays, Pandas DataFrames, data wrangling, and numerical analysis for data science workflows.",
    fullDescription:
      "Master Python's core data science stack. Learn NumPy vectorized math, Pandas DataFrames, multi-index sorting, filtering, merging datasets, and automated cleaning.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Recommended",
    accentColor: "emerald",
    skills: [
      "Pandas DataFrames",
      "NumPy Vectorization",
      "Data Wrangling",
      "Data Science Python",
    ],
    learningOutcomes: [
      "Load and clean complex multi-thousand row datasets",
      "Perform vectorized numerical operations in NumPy",
      "Filter and aggregate data with Pandas",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "NumPy Arrays & Math",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "N-dimensional arrays",
          "Array slicing and indexing",
          "Vectorized calculations",
        ],
      },
      {
        moduleNumber: 2,
        title: "Pandas Foundations",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Series and DataFrames",
          "Reading CSV and Excel files",
          "Cleaning missing and invalid data",
        ],
      },
      {
        moduleNumber: 3,
        title: "Data Aggregation & Analysis",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "GroupBy and pivot tables in Python",
          "Merging and joining DataFrames",
          "Data science case study",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p2-t2",
    title: "Data Analytics & Visualization",
    slug: "ss2-data-analytics-and-visualization",
    category: "Data & Analytics",
    term: "Second Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "Matplotlib, Seaborn, interactive visual charts, exploratory data analysis (EDA), and data storytelling.",
    fullDescription:
      "Transform raw data into compelling visual stories. Learn to craft publication-ready plots with Matplotlib and Seaborn, conduct Exploratory Data Analysis, and uncover hidden trends.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Popular",
    accentColor: "emerald",
    skills: [
      "Matplotlib & Seaborn",
      "Exploratory Data Analysis (EDA)",
      "Data Storytelling",
      "Statistical Plots",
    ],
    learningOutcomes: [
      "Generate custom statistical charts and heatmaps",
      "Execute structured Exploratory Data Analysis (EDA)",
      "Present executive data presentations",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Plotting with Matplotlib",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Line, bar, and scatter charts",
          "Labels, legends, and styling",
          "Subplots and figure layouts",
        ],
      },
      {
        moduleNumber: 2,
        title: "Statistical Graphics with Seaborn",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Histograms and box plots",
          "Heatmaps and correlation matrices",
          "Pairplots for multi-variable analysis",
        ],
      },
      {
        moduleNumber: 3,
        title: "EDA Project & Visual Story",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Conducting a full EDA project",
          "Building an interactive dashboard",
          "Presenting data insights",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p2-t3",
    title: "AI & Machine Learning Fundamentals",
    slug: "ss2-ai-and-machine-learning-fundamentals",
    category: "Artificial Intelligence",
    term: "Third Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "Supervised & unsupervised learning, Scikit-Learn, regression, classification, and model evaluation.",
    fullDescription:
      "Train your first real machine learning models! Learn linear regression, decision trees, k-nearest neighbors, train/test splitting, and evaluate accuracy, precision, and recall.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "Scikit-Learn",
      "Supervised Learning",
      "Regression & Classification",
      "Model Evaluation",
    ],
    learningOutcomes: [
      "Train predictive machine learning algorithms in Python",
      "Evaluate model performance using confusion matrices",
      "Deploy an ML predictor to make real forecasts",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Machine Learning Concepts",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Supervised vs unsupervised models",
          "Feature engineering and scaling",
          "Train/test dataset splits",
        ],
      },
      {
        moduleNumber: 2,
        title: "Classification & Regression",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Linear and Logistic Regression",
          "Decision Trees and Random Forests",
          "KNN classification",
        ],
      },
      {
        moduleNumber: 3,
        title: "Model Evaluation & Deployment",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Accuracy, precision, recall, F1",
          "Cross-validation techniques",
          "End-to-end ML project",
        ],
      },
    ],
  }),

  // SS 2 PATHWAY 3 — UI/UX & DIGITAL PRODUCT DESIGN:
  createCourse({
    id: "ss2-p3-t1",
    title: "Advanced UI/UX Design",
    slug: "ss2-advanced-ui-ux-design",
    category: "Design & UI/UX",
    term: "First Term",
    pathway: "UI/UX & Digital Product Design",
    shortDescription:
      "Advanced Figma design tokens, component libraries, accessibility (WCAG), and responsive interface systems.",
    fullDescription:
      "Master industry design systems in Figma. Build atomic design component libraries, define accessible color palettes (WCAG compliant), and create responsive desktop and mobile viewports.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Recommended",
    accentColor: "rose",
    skills: [
      "Design Systems",
      "Figma Variants",
      "Accessibility (WCAG)",
      "Atomic Design",
    ],
    learningOutcomes: [
      "Build scalable Figma design component libraries",
      "Ensure high-contrast accessible design",
      "Design responsive adaptive interfaces",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Design Systems & Atomic Design",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Atoms, molecules, organisms", "Design tokens and styles"],
      },
      {
        moduleNumber: 2,
        title: "Figma Components & Properties",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Component variants and boolean props",
          "Nested responsive auto-layout",
        ],
      },
      {
        moduleNumber: 3,
        title: "Accessibility & Guidelines",
        duration: "3h",
        lessonsCount: 4,
        topics: ["WCAG contrast standards", "Designing for screen readers"],
      },
    ],
  }),
  createCourse({
    id: "ss2-p3-t2",
    title: "Product Design & Prototyping",
    slug: "ss2-product-design-and-prototyping",
    category: "Design & UI/UX",
    term: "Second Term",
    pathway: "UI/UX & Digital Product Design",
    shortDescription:
      "Complex state animations, micro-interactions, mobile transitions, and user testing workflows.",
    fullDescription:
      "Take interactive prototypes to high fidelity. Create realistic micro-animations, slide gestures, smart animate component states, and conduct moderated usability test interviews.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Popular",
    accentColor: "rose",
    skills: [
      "Micro-Interactions",
      "Smart Animate",
      "Usability Testing",
      "Interactive Prototyping",
    ],
    learningOutcomes: [
      "Design realistic interactive transitions in Figma",
      "Run user testing sessions and document friction",
      "Iterate UI based on qualitative feedback",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Interactive States & Micro-Animations",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Hover, active, and focus states",
          "Smart animate timing curves",
        ],
      },
      {
        moduleNumber: 2,
        title: "Multi-Screen Interactive Flows",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Onboarding and checkout journeys",
          "Overlays and modal drawers",
        ],
      },
      {
        moduleNumber: 3,
        title: "Usability Testing Lab",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Test script creation",
          "Recording user metrics",
          "Final prototype walkthrough",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p3-t3",
    title: "Digital Product Development",
    slug: "ss2-digital-product-development-design",
    category: "Design & UI/UX",
    term: "Third Term",
    pathway: "UI/UX & Digital Product Design",
    shortDescription:
      "Collaborating with developers, design handoff, design specs, and launching digital products.",
    fullDescription:
      "Bridge the gap between design and engineering. Learn developer handoff in Figma (Dev Mode), inspect CSS values, export assets, and design a product ready for commercial launch.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "Developer Handoff",
      "Figma Dev Mode",
      "Design QA",
      "Product Launch",
    ],
    learningOutcomes: [
      "Prepare design files for software engineers",
      "Inspect and translate UI into CSS code specs",
      "Create a digital product case study",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Design Handoff & Documentation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Annotating design specs",
          "Asset export formats (SVG, PNG, WebP)",
        ],
      },
      {
        moduleNumber: 2,
        title: "Developer Collaboration & QA",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Figma Dev Mode workflow", "Conducting design QA checks"],
      },
      {
        moduleNumber: 3,
        title: "Case Study & Portfolio Launch",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Writing a UX case study", "Publishing to digital portfolio"],
      },
    ],
  }),

  // SS 2 PATHWAY 4 — DIGITAL MARKETING & CREATIVE TECHNOLOGY:
  createCourse({
    id: "ss2-p4-t1",
    title: "Advanced Graphic Design",
    slug: "ss2-advanced-graphic-design",
    category: "Design & UI/UX",
    term: "First Term",
    pathway: "Digital Marketing & Creative Technology",
    shortDescription:
      "Brand identity systems, vector illustrations, editorial typography, and commercial advertising design.",
    fullDescription:
      "Master corporate visual communication. Students develop complete brand identity kits including logos, color guides, stationery, vector illustration, and print advertising materials.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Recommended",
    accentColor: "amber",
    skills: [
      "Brand Identity Kits",
      "Vector Illustration",
      "Commercial Advertising",
      "Editorial Design",
    ],
    learningOutcomes: [
      "Build a complete brand guidelines manual",
      "Create custom vector icons and illustrations",
      "Design commercial ad campaigns",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Brand Identity Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Logo design and mark geometry",
          "Brand style guides and palettes",
        ],
      },
      {
        moduleNumber: 2,
        title: "Vector Artwork & Layouts",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Pen tool and bezier curves", "Editorial magazine layouts"],
      },
      {
        moduleNumber: 3,
        title: "Commercial Advertising Suite",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Billboards and digital display ads",
          "Packaging design concepts",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p4-t2",
    title: "Animation & Motion Design",
    slug: "ss2-animation-and-motion-design",
    category: "Design & UI/UX",
    term: "Second Term",
    pathway: "Digital Marketing & Creative Technology",
    shortDescription:
      "Motion graphics, dynamic video titles, animated social ads, visual effects, and audio synchronization.",
    fullDescription:
      "Bring graphics to life for modern digital campaigns. Learn motion design software, animated typography, logo stings, kinetic text, and commercial promo video production.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Popular",
    accentColor: "violet",
    skills: [
      "Motion Graphics",
      "Kinetic Typography",
      "Logo Animation",
      "Video Editing",
    ],
    learningOutcomes: [
      "Animate kinetic typography and logo intros",
      "Create animated video promotions for social media",
      "Sync animations with voiceover and audio tracks",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Motion Principles & Keyframing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Timeline mastery and keyframe curves",
          "Position, scale, rotation transforms",
        ],
      },
      {
        moduleNumber: 2,
        title: "Kinetic Typography & Titles",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Animating text and lower-thirds",
          "Masking and shape morphing",
        ],
      },
      {
        moduleNumber: 3,
        title: "Promo Video Production",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Full 30-second commercial promo", "Sound design and export"],
      },
    ],
  }),
  createCourse({
    id: "ss2-p4-t3",
    title: "Digital Marketing & Content Strategy",
    slug: "ss2-digital-marketing-and-content-strategy",
    category: "Digital Marketing & Content",
    term: "Third Term",
    pathway: "Digital Marketing & Creative Technology",
    shortDescription:
      "Performance marketing, email funnels, paid ad campaign simulation, and growth metrics.",
    fullDescription:
      "Master conversion-driven marketing. Learn how digital growth teams allocate budgets, create high-converting landing pages, set up email drip campaigns, and analyze ROAS.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Trending",
    accentColor: "amber",
    skills: [
      "Performance Marketing",
      "Email Automation",
      "Conversion Optimization",
      "Marketing Analytics",
    ],
    learningOutcomes: [
      "Plan a full multi-channel digital campaign",
      "Build automated email marketing workflows",
      "Calculate and optimize customer acquisition costs",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Performance Marketing & Ad Funnels",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Top, middle, bottom of funnel strategy",
          "Landing page conversion design",
        ],
      },
      {
        moduleNumber: 2,
        title: "Email Automation & Retargeting",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Lead magnets and email sequences",
          "Segmentation and personalization",
        ],
      },
      {
        moduleNumber: 3,
        title: "Analytics & Strategy Pitch",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Attribution and ROI modeling",
          "Final growth strategy presentation",
        ],
      },
    ],
  }),

  // SS 2 PATHWAY 5 — CYBERSECURITY & EMERGING TECHNOLOGY:
  createCourse({
    id: "ss2-p5-t1",
    title: "Cybersecurity Fundamentals",
    slug: "ss2-cybersecurity-fundamentals-deep",
    category: "Cybersecurity & Safety",
    term: "First Term",
    pathway: "Cybersecurity & Emerging Technology",
    shortDescription:
      "TCP/IP networking, packet analysis, cryptography implementations, authentication systems, and Linux CLI.",
    fullDescription:
      "Gain technical cybersecurity depth. Learn network packet analysis with Wireshark, explore Linux system administration, configure firewalls, and study secure authentication protocols.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Recommended",
    accentColor: "sky",
    skills: [
      "Wireshark Packet Analysis",
      "Linux Terminal",
      "TCP/IP Networking",
      "Authentication Protocols",
    ],
    learningOutcomes: [
      "Capture and inspect network traffic in Wireshark",
      "Navigate and secure Linux operating systems",
      "Implement secure key pair cryptography",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Networking & Protocol Analysis",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "OSI model headers",
          "Capturing packets with Wireshark",
          "DNS, DHCP, and HTTP inspection",
        ],
      },
      {
        moduleNumber: 2,
        title: "Linux Administration for Security",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "File permissions and user management",
          "Bash scripting basics",
          "System logging and processes",
        ],
      },
      {
        moduleNumber: 3,
        title: "Cryptography & Secure Auth",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "RSA and ECC public keys",
          "SSH key authentication",
          "Security lab audit",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p5-t2",
    title: "AI & Automation",
    slug: "ss2-ai-and-automation",
    category: "Artificial Intelligence",
    term: "Second Term",
    pathway: "Cybersecurity & Emerging Technology",
    shortDescription:
      "Automating digital tasks with Python, API webhooks, AI agents, and robotic process automation (RPA).",
    fullDescription:
      "Automate repetitive digital workflows! Students write Python scripts to automate spreadsheets, scrape web data ethically, connect API webhooks, and deploy AI-driven automated assistants.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Popular",
    accentColor: "violet",
    skills: [
      "Python Automation",
      "Web Scraping",
      "API Webhooks",
      "AI Agents & RPA",
    ],
    learningOutcomes: [
      "Build Python automation bots for repetitive tasks",
      "Integrate third-party webhooks and APIs",
      "Design intelligent task automation workflows",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Python Task Automation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "File renaming and organization bots",
          "Automating Excel reports",
          "Sending automated email notifications",
        ],
      },
      {
        moduleNumber: 2,
        title: "Web Scraping & APIs",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "BeautifulSoup and requests",
          "Handling JSON endpoints",
          "Rate limiting and ethical scraping",
        ],
      },
      {
        moduleNumber: 3,
        title: "AI-Powered Automated Agents",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Connecting LLMs to tool functions",
          "Building an automated research bot",
          "End-to-end automation demo",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss2-p5-t3",
    title: "Applied Cybersecurity & Emerging Technologies",
    slug: "ss2-applied-cybersecurity-emerging-technologies",
    category: "Cybersecurity & Safety",
    term: "Third Term",
    pathway: "Cybersecurity & Emerging Technology",
    shortDescription:
      "Ethical hacking simulations, cloud security, IoT protection, blockchain security, and defensive incident response.",
    fullDescription:
      "Explore the frontiers of defensive technology. Conduct controlled vulnerability scans, understand cloud computing security (AWS/Azure basics), IoT device protection, and incident response handling.",
    targetLevel: "SS 2",
    eligibleClassLevels: SS2_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Trending",
    accentColor: "sky",
    skills: [
      "Vulnerability Scanning",
      "Cloud Security",
      "IoT Defense",
      "Incident Response",
    ],
    learningOutcomes: [
      "Perform vulnerability scans in sandboxed labs",
      "Configure cloud access security policies",
      "Draft an incident response containment plan",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Vulnerability Scanning & OWASP",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Vulnerability scanners",
          "Web vulnerabilities (SQLi, XSS)",
          "Patch management",
        ],
      },
      {
        moduleNumber: 2,
        title: "Cloud & IoT Security",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Cloud security shared responsibility",
          "Securing IoT hardware",
          "Zero-Trust architecture",
        ],
      },
      {
        moduleNumber: 3,
        title: "Incident Response Simulation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Containment and eradication",
          "Digital forensics basics",
          "Post-incident reporting",
        ],
      },
    ],
  }),

  // ==========================================
  // SS 3 — ADVANCED SPECIALISATION
  // ==========================================
  // Pathway 1: Software & Web Development
  createCourse({
    id: "ss3-sw-01",
    title: "Advanced Web Development",
    slug: "ss3-advanced-web-development",
    category: "Coding & Software",
    term: "First Term",
    pathway: "Software & Web Development",
    shortDescription:
      "React.js architecture, hooks, state management, dynamic routing, and component design patterns.",
    fullDescription:
      "Master modern single-page application engineering with React.js. Build scalable user interfaces with custom hooks, context state management, optimized rendering, and client routing.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Recommended",
    accentColor: "indigo",
    skills: [
      "React.js",
      "Custom Hooks",
      "State Management",
      "Component Patterns",
    ],
    learningOutcomes: [
      "Build scalable SPA applications in React",
      "Manage complex state with Context and reducers",
      "Optimize component re-renders",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "React Architecture & JSX",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Virtual DOM and component lifecycle",
          "Props and custom hooks",
          "Component composition",
        ],
      },
      {
        moduleNumber: 2,
        title: "State Management & Routing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Context API and useReducer",
          "React Router dynamic routes",
          "Data fetching patterns",
        ],
      },
      {
        moduleNumber: 3,
        title: "Production App Build",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Performance audits",
          "Testing components",
          "Live cloud deployment",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-sw-02",
    title: "Full-Stack Development",
    slug: "ss3-full-stack-development",
    category: "Coding & Software",
    term: "Second Term",
    pathway: "Software & Web Development",
    shortDescription:
      "Node.js, Express, REST APIs, database integration (PostgreSQL/Prisma), and user authentication.",
    fullDescription:
      "Become a full-stack engineer! Connect React frontends to Node.js backend servers, design relational databases with Prisma ORM, implement JWT authentication, and build complete cloud applications.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Popular",
    accentColor: "indigo",
    skills: [
      "Node.js & Express",
      "Prisma ORM & SQL",
      "RESTful APIs",
      "JWT Authentication",
    ],
    learningOutcomes: [
      "Build REST API endpoints in Node.js",
      "Design relational database schemas",
      "Implement secure user registration and login",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Node.js & Express Backends",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Node runtime and npm modules",
          "Express routing and middleware",
          "Building REST endpoints",
        ],
      },
      {
        moduleNumber: 2,
        title: "Databases & Prisma ORM",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Relational schemas with Prisma",
          "CRUD database operations",
          "Data validation with Zod",
        ],
      },
      {
        moduleNumber: 3,
        title: "Authentication & Full-Stack Integration",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Password hashing and JWT tokens",
          "Connecting frontend to backend",
          "Full-stack cloud deployment",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-sw-03",
    title: "AI-Assisted Software Development",
    slug: "ss3-ai-assisted-software-development",
    category: "Coding & Software",
    term: "First Term",
    pathway: "Software & Web Development",
    shortDescription:
      "Coding with AI assistants (Copilot, Claude, Gemini), automated unit testing, code review, and refactoring.",
    fullDescription:
      "Multiply your engineering speed. Learn how software professionals use AI agents to scaffold architectures, generate unit tests, debug edge cases, refactor legacy code, and write technical documentation.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Trending",
    accentColor: "violet",
    skills: [
      "AI Pair Programming",
      "Automated Testing",
      "Code Refactoring",
      "Technical Documentation",
    ],
    learningOutcomes: [
      "Use AI tools to accelerate development workflows",
      "Generate comprehensive unit test suites",
      "Conduct automated code audits and security reviews",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "AI Pair Programming Tools",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Prompting for code generation",
          "Scaffolding architectures",
          "Context window management",
        ],
      },
      {
        moduleNumber: 2,
        title: "Automated Testing & Debugging",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Generating Jest and unit tests",
          "Debugging syntax and logic bugs",
          "Refactoring for performance",
        ],
      },
      {
        moduleNumber: 3,
        title: "CI/CD & Documentation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Generating README and API specs",
          "Automated code review pipelines",
          "Production delivery",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-sw-04",
    title: "Digital Product Development & Capstone Portfolio",
    slug: "ss3-digital-product-development-capstone",
    category: "Coding & Software",
    term: "Third Term",
    pathway: "Software & Web Development",
    shortDescription:
      "Comprehensive capstone project: build, test, polish, and publish a professional software product and portfolio.",
    fullDescription:
      "The pinnacle engineering experience. Students build an original software product from scratch, write user manuals, implement automated tests, and launch an impressive digital portfolio for university and career opportunities.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.coding,
    badge: "Featured",
    accentColor: "indigo",
    skills: [
      "Full Product Lifecycle",
      "Capstone Architecture",
      "Digital Portfolio",
      "Tech Presentation",
    ],
    learningOutcomes: [
      "Ship a complete production-grade software product",
      "Publish a high-impact developer portfolio",
      "Present project demo to tech mentors",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Capstone Scoping & MVP Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Product requirement documents",
          "Database and system design",
          "Sprint planning",
        ],
      },
      {
        moduleNumber: 2,
        title: "Development & QA Testing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Full-stack implementation",
          "User testing and bug squashing",
          "Security checklist",
        ],
      },
      {
        moduleNumber: 3,
        title: "Portfolio Deployment & Defense",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building digital portfolio site",
          "Hosting live demo on custom domain",
          "Capstone presentation",
        ],
      },
    ],
  }),

  // Pathway 2: Data, AI & Machine Learning
  createCourse({
    id: "ss3-ai-01",
    title: "Applied Artificial Intelligence & Machine Learning",
    slug: "ss3-applied-ai-machine-learning",
    category: "Artificial Intelligence",
    term: "First Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "Deep learning concepts, neural networks with TensorFlow/PyTorch, computer vision, and NLP applications.",
    fullDescription:
      "Dive into cutting-edge AI. Understand how multi-layer neural networks work, train image classification and natural language models, and evaluate AI accuracy and safety.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.ai,
    badge: "Recommended",
    accentColor: "violet",
    skills: [
      "Neural Networks",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
    ],
    learningOutcomes: [
      "Train deep learning models using Python libraries",
      "Build computer vision classification pipelines",
      "Fine-tune natural language models",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Neural Networks & Backpropagation",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Perceptrons and activation functions",
          "Loss functions and gradient descent",
          "Building models in Python",
        ],
      },
      {
        moduleNumber: 2,
        title: "Computer Vision & CNNs",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Convolutional neural networks",
          "Image classification and detection",
          "Transfer learning techniques",
        ],
      },
      {
        moduleNumber: 3,
        title: "NLP & Transformers",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Embeddings and attention mechanisms",
          "Sentiment analysis models",
          "Deploying AI inference APIs",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-ai-02",
    title: "Advanced Data Analytics, Generative AI & Automation",
    slug: "ss3-advanced-data-analytics-gen-ai",
    category: "Data & Analytics",
    term: "Second Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "Big data analytics, LLM fine-tuning, automated pipelines, and building intelligent data agents.",
    fullDescription:
      "Combine big data analysis with generative AI agents. Process massive datasets with Python, build intelligent data extraction pipelines, and automate analytical reports.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Popular",
    accentColor: "emerald",
    skills: [
      "Big Data Analytics",
      "Generative AI Agents",
      "Automated Pipelines",
      "Data Strategy",
    ],
    learningOutcomes: [
      "Build end-to-end automated data ingestion pipelines",
      "Leverage generative AI to query and summarize data",
      "Design executive intelligence reports",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Advanced Data Engineering",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "ETL pipelines in Python",
          "Working with unstructured data",
          "Automated validation",
        ],
      },
      {
        moduleNumber: 2,
        title: "Generative AI Data Agents",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Retrieval-Augmented Generation (RAG)",
          "Vector databases and embeddings",
          "Natural language queries on SQL",
        ],
      },
      {
        moduleNumber: 3,
        title: "AI Automation System",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Automating analysis reports",
          "Deploying interactive data apps",
          "Case study presentation",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-ai-03",
    title: "Data/AI Capstone Project & Portfolio",
    slug: "ss3-data-ai-capstone-portfolio",
    category: "Data & Analytics",
    term: "Third Term",
    pathway: "Data, AI & Machine Learning",
    shortDescription:
      "Solve a real-world predictive challenge, compile datasets, train custom models, and launch your portfolio.",
    fullDescription:
      "Capstone project showcasing your mastery of data and machine learning. Solve a predictive challenge in healthcare, climate, or finance, document methodologies, and publish your Data/AI portfolio.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.data,
    badge: "Featured",
    accentColor: "emerald",
    skills: [
      "End-to-End ML Pipeline",
      "Data Storytelling",
      "Model Deployment",
      "Technical Portfolio",
    ],
    learningOutcomes: [
      "Publish a production predictive machine learning project",
      "Create an interactive Streamlit or web dashboard",
      "Compile a professional Data/AI portfolio",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Project Proposal & Data Collection",
        duration: "3h",
        lessonsCount: 4,
        topics: ["Problem definition", "Data collection and preprocessing"],
      },
      {
        moduleNumber: 2,
        title: "Model Development & Optimization",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Experimentation tracking",
          "Hyperparameter tuning",
          "Model benchmarking",
        ],
      },
      {
        moduleNumber: 3,
        title: "Deployment & Portfolio Showcase",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building live interactive app",
          "Publishing GitHub portfolio",
          "Capstone presentation",
        ],
      },
    ],
  }),

  // Pathway 3: UI/UX & Digital Product Design
  createCourse({
    id: "ss3-ux-01",
    title: "Advanced UI/UX, Design Systems & Product Design",
    slug: "ss3-advanced-ui-ux-design-systems",
    category: "Design & UI/UX",
    term: "First Term",
    pathway: "UI/UX & Digital Product Design",
    shortDescription:
      "Enterprise design systems, multi-platform product architecture, design tokens, and user research methodologies.",
    fullDescription:
      "Master enterprise product design. Build scalable multi-brand design systems in Figma, conduct deep qualitative user research, and architect comprehensive software experiences across web and mobile.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Recommended",
    accentColor: "rose",
    skills: [
      "Enterprise Design Systems",
      "User Research",
      "Multi-Platform UI",
      "Design Tokens",
    ],
    learningOutcomes: [
      "Architect production design systems with tokens",
      "Conduct in-depth user interviews and surveys",
      "Design unified desktop, tablet, and phone interfaces",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Enterprise Design System Architecture",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Multi-tier token architecture",
          "Component variants and slots",
          "Documentation standards",
        ],
      },
      {
        moduleNumber: 2,
        title: "Advanced User Research & Synthesis",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Affinity diagramming",
          "Usability benchmarking",
          "Mapping complex user journeys",
        ],
      },
      {
        moduleNumber: 3,
        title: "Cross-Platform Product Design",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Responsive web + native mobile apps",
          "Accessibility audit",
          "Design system release",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-ux-02",
    title: "AI for Design, Product Development & Capstone Portfolio",
    slug: "ss3-ai-for-design-product-capstone",
    category: "Design & UI/UX",
    term: "Third Term",
    pathway: "UI/UX & Digital Product Design",
    shortDescription:
      "AI generative design tools, high-fidelity prototypes, developer handoff, and launching a professional design portfolio.",
    fullDescription:
      "The ultimate UI/UX capstone. Leverage AI tools for rapid ideation and asset generation, produce high-fidelity interactive prototypes, and publish a showcase design portfolio.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.design,
    badge: "Featured",
    accentColor: "rose",
    skills: [
      "AI-Assisted Design",
      "High-Fidelity Prototyping",
      "Design Portfolio",
      "Design Handoff",
    ],
    learningOutcomes: [
      "Use AI design tools for rapid concept generation",
      "Build a production-level interactive Figma prototype",
      "Publish a case study design portfolio",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "AI-Augmented Design Workflows",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "AI image and vector generation",
          "Automated wireframing and copywriting",
          "Visual exploration",
        ],
      },
      {
        moduleNumber: 2,
        title: "Capstone Product Prototyping",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Building high-fidelity product prototype",
          "Usability test recordings",
          "Refining micro-interactions",
        ],
      },
      {
        moduleNumber: 3,
        title: "Case Study & Portfolio Launch",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Writing structured UX case studies",
          "Publishing digital design portfolio",
          "Capstone presentation",
        ],
      },
    ],
  }),

  // Pathway 4: Digital Marketing & Creative Technology
  createCourse({
    id: "ss3-mkt-01",
    title: "Advanced Digital Marketing, Brand Strategy & Creative AI",
    slug: "ss3-advanced-digital-marketing-creative-ai",
    category: "Digital Marketing & Content",
    term: "First Term",
    pathway: "Digital Marketing & Creative Technology",
    shortDescription:
      "Omnichannel brand strategy, generative AI for creative work, content strategy, and motion graphics.",
    fullDescription:
      "Lead modern creative marketing. Learn strategic brand positioning, harness generative AI for ad copy and visuals, plan omnichannel content distribution, and produce high-impact motion commercials.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Recommended",
    accentColor: "amber",
    skills: [
      "Brand Strategy",
      "Generative AI for Marketing",
      "Omnichannel Growth",
      "Motion Graphics",
    ],
    learningOutcomes: [
      "Develop comprehensive commercial brand guidelines",
      "Leverage AI tools for creative campaign generation",
      "Produce motion graphics commercials for social media",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Strategic Brand Positioning",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Brand architecture and values",
          "Market differentiation and voice",
          "Audience persona matrices",
        ],
      },
      {
        moduleNumber: 2,
        title: "Generative AI & Creative Production",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "AI prompt craft for ad visuals and copy",
          "Rapid creative testing",
          "Video and motion graphics ads",
        ],
      },
      {
        moduleNumber: 3,
        title: "Omnichannel Campaign Execution",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Social, search, and email alignment",
          "Conversion rate optimization",
          "Analytics modeling",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-mkt-02",
    title: "Capstone Campaign & Creative Portfolio",
    slug: "ss3-capstone-campaign-creative-portfolio",
    category: "Digital Marketing & Content",
    term: "Third Term",
    pathway: "Digital Marketing & Creative Technology",
    shortDescription:
      "Execute a full simulated commercial campaign, track live performance metrics, and launch your creative portfolio.",
    fullDescription:
      "The capstone project for creative strategists. Plan, produce, launch, and optimize a full brand campaign, document conversion metrics, and publish an agency-ready creative portfolio.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.marketing,
    badge: "Featured",
    accentColor: "amber",
    skills: [
      "End-to-End Campaign",
      "Creative Portfolio",
      "Marketing Analytics",
      "Client Pitching",
    ],
    learningOutcomes: [
      "Deliver a multi-asset commercial advertising campaign",
      "Analyze engagement and ROI performance",
      "Publish a standout digital creative portfolio",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Campaign Brief & Strategy Proposal",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Client brief analysis",
          "Media planning and budget allocation",
        ],
      },
      {
        moduleNumber: 2,
        title: "Creative Production & Launch",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Producing all video, visual, and copy assets",
          "Publishing simulated campaign",
        ],
      },
      {
        moduleNumber: 3,
        title: "Performance Review & Portfolio Defense",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Compiling campaign results deck",
          "Launching creative website portfolio",
          "Pitch presentation",
        ],
      },
    ],
  }),

  // Pathway 5: Cybersecurity & Emerging Technology
  createCourse({
    id: "ss3-sec-01",
    title: "Advanced Cybersecurity, Network & Web Security",
    slug: "ss3-advanced-cybersecurity-network-web-security",
    category: "Cybersecurity & Safety",
    term: "First Term",
    pathway: "Cybersecurity & Emerging Technology",
    shortDescription:
      "Web application penetration testing, network defense, AI-driven threat detection, and ethical practices.",
    fullDescription:
      "Step into the shoes of a cybersecurity analyst. Learn penetration testing methodologies, defend web applications against OWASP top vulnerabilities, configure SIEM logging, and study ethical hacking frameworks.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Recommended",
    accentColor: "sky",
    skills: [
      "Penetration Testing",
      "Web Application Security",
      "AI Threat Detection",
      "Ethical Security",
    ],
    learningOutcomes: [
      "Execute controlled web vulnerability assessments",
      "Analyze security event logs using SIEM concepts",
      "Implement hardened server defense configurations",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Web Security & Penetration Testing",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "OWASP Top 10 hands-on labs",
          "SQL injection and XSS defense",
          "Burp Suite fundamentals",
        ],
      },
      {
        moduleNumber: 2,
        title: "Network Defense & SIEM Monitoring",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Intrusion detection systems (IDS/IPS)",
          "Analyzing security telemetry logs",
          "Automated threat response",
        ],
      },
      {
        moduleNumber: 3,
        title: "Cloud Security & Ethical Hacking Standards",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Cloud IAM and bucket security",
          "Rules of engagement and ethics",
          "Security assessment report",
        ],
      },
    ],
  }),
  createCourse({
    id: "ss3-sec-02",
    title: "Cybersecurity Capstone Project & Professional Portfolio",
    slug: "ss3-cybersecurity-capstone-portfolio",
    category: "Cybersecurity & Safety",
    term: "Third Term",
    pathway: "Cybersecurity & Emerging Technology",
    shortDescription:
      "Conduct an end-to-end security architecture audit, build defensive tools, and launch a professional cyber portfolio.",
    fullDescription:
      "The capstone project for aspiring security specialists. Conduct a full security audit of a simulated infrastructure, implement hardening controls, and publish a professional cybersecurity portfolio.",
    targetLevel: "SS 3",
    eligibleClassLevels: SS3_LEVELS,
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    instructor: defaultInstructors.cyber,
    badge: "Featured",
    accentColor: "sky",
    skills: [
      "Security Architecture Audit",
      "Hardening & Defense",
      "Professional Portfolio",
      "Incident Response",
    ],
    learningOutcomes: [
      "Perform comprehensive security audit and vulnerability assessment",
      "Implement automated defense monitoring scripts",
      "Publish a professional cybersecurity portfolio",
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Audit Scope & Threat Assessment",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Defining audit scope",
          "Threat modeling and attack surface mapping",
        ],
      },
      {
        moduleNumber: 2,
        title: "Hardening & Automated Defense",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Implementing security controls",
          "Writing Python defense scripts",
        ],
      },
      {
        moduleNumber: 3,
        title: "Remediation Defense & Portfolio Showcase",
        duration: "3h",
        lessonsCount: 4,
        topics: [
          "Writing professional audit report",
          "Publishing cybersecurity portfolio",
          "Final defense presentation",
        ],
      },
    ],
  }),
];
