export const SCHOOL = {
  name: "Gurukul School of Music",
  city: "Bangalore",
  tagline: "Nurturing Talent. Enriching Lives.",
  phones: ["9880080535", "6360493447"],
  whatsapp: "9880080535",
  address: "Kaggadasapura Road, Bangalore, Karnataka",
  logo: "/assets/logo.png",
};

export const STATS = [
  { value: "200+", label: "Students Trained" },
  { value: "13+", label: "Years of Excellence" },
  { value: "4+", label: "Music Disciplines" },
  { value: "3–70+", label: "Student Age Range" },
];

export const COURSES = [
  {
    id: "hindustani",
    name: "Hindustani Classical Vocal",
    short: "The foundation of Indian music.",
    description:
      "Learn ragas, bandishes, swar malikas, voice culture, improvisation techniques, and the philosophy behind Indian classical music.",
    age: "5 Years & Above",
    image: "/assets/gallery/trio.jpg",
  },
  {
    id: "rabindra",
    name: "Rabindra Sangeet",
    short: "The music and poetry of Tagore.",
    description:
      "Students learn lyrical expression, musical interpretation, and classical foundations that define this rich tradition.",
    age: "5 Years & Above",
    image: "/assets/gallery/hosts.jpg",
  },
  {
    id: "folk",
    name: "Folk & Semi-Classical",
    short: "Bhajans, Thumri, Dadra & Baul.",
    description:
      "Explore India's vibrant folk and semi-classical traditions, from soulful Bhajans to expressive Thumri and Baul.",
    age: "All Ages",
    image: "/assets/gallery/women-choir.jpg",
  },
  {
    id: "bollywood",
    name: "Bollywood & Contemporary",
    short: "Your favourite songs, sung right.",
    description:
      "Master vocal techniques, breath control, stage confidence and musical understanding behind every contemporary song.",
    age: "5 Years & Above",
    image: "/assets/gallery/kids-choir.jpg",
  },
];

export const LEARNING_OPTIONS = [
  { title: "Individual Classes", text: "One-on-one personalised attention from your Guru.", icon: "user" },
  { title: "Group Classes", text: "Interactive, collaborative learning with fellow students.", icon: "users" },
  { title: "Online Lessons", text: "Available worldwide via Zoom & Google Meet.", icon: "globe" },
  { title: "Offline Classes", text: "At our Bangalore centre, in the Guru-Shishya tradition.", icon: "home" },
];

export const GURUS = [
  {
    name: "Rupali Sen Mukherjee",
    role: "Founder & Principal Vocal Instructor",
    photo: "/assets/teacher-rupali.png?v=2",
    bio: "An accomplished vocalist and dedicated music educator trained at the prestigious Visva Bharati University, Santiniketan. Known for patient, personalised teaching and holistic musical development.",
    qualifications: ["M.A. in Geography (First Class First) — Visva Bharati University, Santiniketan", "B.Ed."],
    expertise: ["Hindustani Classical Vocal", "Rabindra Sangeet", "Folk Music", "Vocal Training"],
    highlights: ["13+ Years Teaching Experience", "Trained 200+ Students", "Mentor to learners aged 3–70+"],
  },
  {
    name: "Nilanjan Sen",
    role: "Co-Founder, Vocal Instructor & Music Director",
    photo: "/assets/teacher-nilanjan.png?v=2",
    bio: "A versatile vocalist, composer, performer, and music director known for blending classical traditions with contemporary musical expression. His passion inspires students to develop confidence, creativity and a lifelong love for music.",
    qualifications: [],
    expertise: [
      "Hindustani Classical Music",
      "Contemporary Music",
      "Folk Music",
      "Performance Training",
      "Music Direction & Composition",
    ],
    highlights: ["Music Director & Composer", "Performance Coach", "Mentor to Performers"],
  },
];

export const GALLERY = {
  2026: [
    { src: "/assets/gallery/hosts.jpg", cat: "Hosts", caption: "Rupali Ma'am & Nilanjan Sir host the evening" },
    { src: "/assets/gallery/women-choir.jpg", cat: "Group Choir", caption: "Women's choir in resplendent red" },
    { src: "/assets/gallery/kids-choir.jpg", cat: "Group Choir", caption: "Our youngest students in chorus" },
    { src: "/assets/gallery/finale-choir.jpg", cat: "Grand Finale", caption: "Grand Finale — 80+ students on stage" },
    { src: "/assets/gallery/trophies-kids.jpg", cat: "Trophy", caption: "Trophy Distribution — beaming smiles" },
    { src: "/assets/gallery/trio.jpg", cat: "Solo & Duet", caption: "A trio in perfect harmony" },
  ],
  2025: [
    { src: "/assets/gallery/lamp-lighting.jpg", cat: "Inauguration", caption: "Lamp lighting ceremony with our chief guest" },
    { src: "/assets/gallery/trophies-kids.jpg", cat: "Trophy", caption: "Trophy Distribution — Annual Day 2025" },
    { src: "/assets/gallery/hosts.jpg", cat: "Hosts", caption: "Rupali Ma'am & Nilanjan Sir on stage" },
    { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1200", cat: "Performance", caption: "Annual Day 2025 highlights" },
    { src: "https://images.unsplash.com/photo-1464375117522-131205112050?auto=format&fit=crop&q=80&w=1200", cat: "Group Choir", caption: "Choir under the lights" },
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200", cat: "Grand Finale", caption: "Closing moments" },
  ],
  2024: [
    { src: "/assets/gallery/finale-choir.jpg", cat: "Group Choir", caption: "Grand choir on stage — Annual Day 2024" },
    { src: "/assets/gallery/trio.jpg", cat: "Solo & Duet", caption: "A trio in perfect harmony" },
    { src: "/assets/gallery/lamp-lighting.jpg", cat: "Inauguration", caption: "Lamp lighting ceremony" },
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200", cat: "Performance", caption: "Annual Day 2024" },
    { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200", cat: "Grand Finale", caption: "Finale tableau" },
    { src: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=1200", cat: "Trophy", caption: "Recognising dedication" },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      "The Guru-Shishya approach at Gurukul is truly unique. Every class is inspiring and enriching.",
    author: "Aparna R.",
    role: "Parent",
  },
  {
    quote: "Rupali Ma'am's patience and dedication transformed my musical journey.",
    author: "Sneha M.",
    role: "Student",
  },
  {
    quote: "Nilanjan Sir brings creativity and professionalism into every lesson.",
    author: "Arjun K.",
    role: "Student",
  },
  {
    quote:
      "The Annual Day performances are beautifully organised and give students tremendous confidence.",
    author: "Mr. & Mrs. Banerjee",
    role: "Parents",
  },
  {
    quote:
      "I joined at 52 to fulfil a lifelong dream. Gurukul welcomed me as warmly as the youngest learner.",
    author: "Lakshmi V.",
    role: "Adult Learner",
  },
];

export const FAQS = [
  { q: "Do I need prior music experience?", a: "No. Beginners are warmly welcome. Our curriculum starts from the very basics." },
  { q: "Are online classes available?", a: "Yes. We conduct online classes via Zoom and Google Meet, available worldwide." },
  { q: "What age groups do you teach?", a: "Students from 3 years to 70+ years. We adapt our pedagogy to every age." },
  { q: "Do you offer individual and group classes?", a: "Yes — both individual one-on-one and small group sessions are available." },
  { q: "Can I attend a trial class?", a: "Absolutely. We offer a free demo class so you can experience our teaching first-hand." },
];
