export interface EquipmentItem {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'functional' | 'legs';
  categoryLabel: string;
  description: string;
  targetMuscle: string;
  workoutPurpose: string;
  branchId: 'op-road' | 'fatehgunj';
  branchName: string;
  image: string;
  alt: string;
  specs: string[];
}

export interface LocationBranch {
  id: 'op-road' | 'fatehgunj';
  name: string;
  city: string;
  locality: string;
  badge: string;
  isFlagship: boolean;
  address: string;
  contactNumber: string;
  contactNumberFormatted: string;
  whatsappUrl: string;
  hoursSummary: string;
  highlights: string;
  mapImage: string;
  mapAlt: string;
  googleMapsUrl: string;
  timings: {
    day: string;
    hours: string;
  }[];
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  badgeLabel: string;
  experience: string;
  bio: string;
  quote: string;
  certifications: string[];
  keyHighlights: string[];
  image: string;
  alt: string;
  instagramHandle: string;
  instagramUrl: string;
  branchName: string;
}

export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  badgeLabel: string;
  isSeniorTrainer?: boolean;
  experience: string;
  qualification?: string;
  bio: string;
  certifications: string[];
  image: string;
  alt: string;
  instagramHandle: string;
  instagramUrl: string;
  branchName: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  badge?: string;
  statHighlight: string;
  duration: string;
  quote: string;
  image: string;
  alt: string;
  branch: string;
  featured?: boolean;
}

export interface StudioVideo {
  id: string;
  title: string;
  subtitle: string;
  category: 'Zumba & Group Fitness' | 'Facility Walkthrough';
  branchId: 'op-road' | 'fatehgunj' | 'both';
  branchName: string;
  address: string;
  videoUrl: string;
  posterImage?: string;
  posterUrl?: string;
  description: string;
  duration: string;
  highlights: string[];
  isPortrait?: boolean;
}

export const BRAND_ASSETS = {
  logo: '/assets/aistudio/image_1ee5e714.png',
  heroBg:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0k_qWigK5zZcWVrb5l_ifC8Z8e84Yi9uGHIgpYvZGrO4nisnN-gJnGg8PJmV84SDxL-3o5LyRBO36LpntHF2-j5q2ASJUi3iO4S4m5cg-SDUtHRcHvmSTghRC-1ve8A8d2E-d22VqXAGwACgZppOKfUuvUDsTotC24vyygLl2JuXcNk9J-48iDHjYParYjRYCbdWnQBbWASfAE7kksdZkKDJcDBKFnDBpybIu_3O5pjajpwcwJ3bDuw',
  // Default primary contact (Fatehgunj)
  defaultPhone: '8733944072',
  defaultPhoneFormatted: '+91 8733944072',
  // OP Road branch specific
  opRoadPhone: '6354661053',
  opRoadPhoneFormatted: '+91 6354661053',
  // Fatehgunj branch specific
  fatehgunPhone: '8733944072',
  fatehgunPhoneFormatted: '+91 8733944072',
  instagramUrl: 'https://www.instagram.com/fitxfreakgym/',
  instagramHandle: '@fitxfreakgym',
  youtubeUrl: 'https://youtube.com/@fitxfreak',
  facebookUrl: 'https://facebook.com/fitxfreakvadodara',
};

export const WHY_US_FEATURES = [
  {
    icon: 'fitness_center',
    title: 'Olympic & Imported Equipment',
    description:
      'Vadodara’s highest-grade biomechanical machines, heavy calibrated dumbbells, and competition lifting platforms across OP Road and Fatehgunj.',
  },
  {
    icon: 'verified',
    title: 'Certified Personal Trainers',
    description:
      'Led by Founder Irfan Shaikh and Senior Trainer Shehab Pathan (15 Yrs Exp), our certified coaching team ensures guaranteed transformations.',
  },
  {
    icon: 'bolt',
    title: 'Luxury Obsidian Atmosphere',
    description:
      'Acoustically tuned sound systems, neon adrenaline lighting, and a high-energy workout environment engineered for intense beast focus.',
  },
  {
    icon: 'schedule',
    title: 'Split Morning & Evening Batches',
    description:
      'Morning 6:00 AM – 12:00 PM and Evening 4:00 PM – 10:00 PM access (Mon–Sat · Sunday Closed) for focused training around your routine.',
  },
  {
    icon: 'group',
    title: 'Custom Transformation & Zumba',
    description:
      'Targeted personalized tracks for fat loss, muscle hypertrophy, powerlifting, high-energy Zumba classes, and strength building.',
  },
  {
    icon: 'sanitizer',
    title: 'Ultra-Hygienic & Air Conditioned',
    description:
      'Hospital-grade air filtration, continuous sanitization protocols, luxury shower facilities, and pristine workout floors across both clubs.',
  },
];

export const LOCATIONS: LocationBranch[] = [
  {
    id: 'op-road',
    name: 'FIT X FREAK – OP Road',
    city: 'Vadodara, Gujarat',
    locality: 'Old Padra Road',
    badge: 'OP Road Flagship · 7-8th Floor',
    isFlagship: true,
    address:
      '7-8th Floor, Avishkar Complex, Old Padra Road, Near McDonald\'s, Opposite Bankars Heart Hospital, Near GEB, IOC Nagar, Haripura, Vadodara, Gujarat – 390007',
    contactNumber: '6354661053',
    contactNumberFormatted: '+91 6354661053',
    whatsappUrl: 'https://wa.me/916354661053',
    hoursSummary: 'Morning: 6:00 AM - 12:00 PM · Evening: 4:00 PM - 10:00 PM · Sun: Closed',
    highlights: '7-8th Floor Rooftop Elevation, Imported Biomechanical Racks, Olympic Free Weight Deck',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmAeeRyQizVdVFnZTm8fvZmqShYiSp1yTZmJBj9MegMG9gEdB4djdNWGyX_0q5kiCfjeWtys9RDM_3qMwQj5NHgSiE27GpIIJzXpmOL1HxI5pia5VD7-JWuqbZYoz1WHUQZAJhlh7vQ9UgnHPMRr5ivGSvw0mN_LcAN9r1wir7r9HrrvbfG4aKXWU1N99muOgC3YTJdsfkt6lJeqdDRrnnxsfsdvqVi3BQrllLWKrxLXJGqQTT17PvtA',
    mapAlt: 'Map view of FIT X FREAK – OP Road Gym Vadodara',
    googleMapsUrl: 'https://maps.google.com/?q=Avishkar+Complex+Old+Padra+Road+Vadodara+Gujarat+390007',
    timings: [
      { day: 'Morning (Mon - Sat)', hours: '06:00 AM - 12:00 PM' },
      { day: 'Evening (Mon - Sat)', hours: '04:00 PM - 10:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
  },
  {
    id: 'fatehgunj',
    name: 'FIT X FREAK – Fatehgunj',
    city: 'Vadodara, Gujarat',
    locality: 'Fatehgunj',
    badge: 'Fatehgunj · 1st & 2nd Floor',
    isFlagship: false,
    address:
      '1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj, Vadodara, Gujarat – 390008',
    contactNumber: '8733944072',
    contactNumberFormatted: '+91 8733944072',
    whatsappUrl: 'https://wa.me/918733944072',
    hoursSummary: 'Morning: 6:00 AM - 12:00 PM · Evening: 4:00 PM - 10:00 PM · Sun: Closed',
    highlights: 'Astoria Complex Dual-Floor Club, Zumba Studio, High-Octane Hypertrophy & Cable Suites',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC78NFgKosCBM00OP_6BXqL99nI5cahk-v2HdPCpLE6Jq_GTYfgAfqATztA8jDiRMjNrSf7w78b8baoHcU8wswb_Ab4RiOzqB8Dd2IttnWMcj0lEiUfwNEmgOousvexFFwHege5lLr10ZGpGyY21xPuLO-PCKBmS5Rx9vhz9tHQxHmhJKDoQ71cOg1D3mur7e4Uk_iH1nyoxkqi8ShQSBFqc7xu9bt_abVzIpjA8F0VIMIBmq5GG63LIQ',
    mapAlt: 'Map view of FIT X FREAK – Fatehgunj Gym Vadodara',
    googleMapsUrl:
      'https://maps.google.com/?q=Astoria+Complex+Beside+Seven+Seas+Mall+Fatehgunj+Vadodara+Gujarat+390008',
    timings: [
      { day: 'Morning (Mon - Sat)', hours: '06:00 AM - 12:00 PM' },
      { day: 'Evening (Mon - Sat)', hours: '04:00 PM - 10:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
  },
];

// ==========================================
// FOUNDERS PROFILES (Irfan Shaikh & Ronak Parmar)
// ==========================================
export const FOUNDERS: FounderProfile[] = [
  {
    id: 'founder-irfan',
    name: 'Irfan Shaikh',
    role: 'Founder',
    badgeLabel: 'FOUNDER',
    experience: 'Founder & Visionary Head Coach',
    bio: 'Founder and visionary behind FIT X FREAK Vadodara. Under his leadership and coaching philosophy, hundreds of athletes and fitness enthusiasts have achieved life-changing body transformations across our OP Road and Fatehgunj clubs. Driven by a passion for relentless discipline, biomechanical precision, and elite gym culture in Gujarat.',
    quote:
      'FIT X FREAK was built to give Vadodara an uncompromising workout atmosphere where raw beast energy meets imported luxury equipment.',
    certifications: [
      'Founder & Head Coach',
      'Transformation Specialist',
      'Gym Management & Fitness Leadership',
      'Biomechanical Movement & Hypertrophy Expert',
    ],
    keyHighlights: [
      '500+ Documented Client Transformations',
      'Dual Flagship Gyms in Vadodara: OP Road & Fatehgunj',
      'Curated Olympic Lifting & Imported Machinery Suites',
      'Elite Certified Coaching Team',
    ],
    image: '/assets/aistudio/IRFAN_SHAIKH_2fc42d39.jpg',
    alt: 'Irfan Shaikh - Founder of FIT X FREAK Vadodara',
    instagramHandle: '@Irfan_fitxfreak',
    instagramUrl: 'https://www.instagram.com/Irfan_fitxfreak/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'founder-ronak',
    name: 'Ronak Parmar',
    role: 'Founder',
    badgeLabel: 'FOUNDER',
    experience: 'Founder & Conditioning Specialist',
    bio: 'Co-driving the vision and daily training standards of FIT X FREAK Vadodara alongside Irfan Shaikh. Dynamic and results-driven Founder specializing in hypertrophy training, metabolic conditioning, and high-performance strength programming across OP Road & Fatehgunj.',
    quote:
      'Consistency, heavy foundational lifts, and relentless mindset turn everyday members into unstoppable transformations.',
    certifications: [
      'Founder & Conditioning Coach',
      'Strength & Hypertrophy Specialist',
      'Functional Movement',
      'Certified Fitness Trainer',
    ],
    keyHighlights: [
      'Hands-On Floor Leadership & Coaching Standards',
      'Strength, Hypertrophy & Metabolic Conditioning',
      'OP Road & Fatehgunj Member Mentoring',
      'High-Energy Transformation Culture',
    ],
    image: '/assets/aistudio/Ronak_parmar_a178fc4a.jpg',
    alt: 'Ronak Parmar - Founder of FIT X FREAK Vadodara',
    instagramHandle: '@ronak_sdc',
    instagramUrl: 'https://www.instagram.com/ronak_sdc/',
    branchName: 'OP Road & Fatehgunj',
  },
];

export const FOUNDER: FounderProfile = FOUNDERS[0];

// ==========================================
// CERTIFIED TRAINERS (Exclusively Coaches)
// 1. Shehab Pathan – Senior Trainer
// 2. Arif Shaikh – Trainer
// 3. David Macwan – Trainer
// 4. Rehan Nanno – Trainer
// 5. Ahmad Shaikh – Trainer
// 6. Taksh – Trainer
// 7. Aehfaz – Trainer
// ==========================================
export const TRAINERS: TrainerProfile[] = [
  {
    id: 'tr-shehab',
    name: 'Shehab Pathan',
    role: 'Senior Trainer & Master Coach',
    badgeLabel: 'SENIOR TRAINER',
    isSeniorTrainer: true,
    experience: '15 Years Experience',
    bio: 'Senior fitness authority with 15 years in strength training, biomechanics, and martial arts. Specializes in advanced hypertrophy periodization, high-performance conditioning, and postural rehabilitation.',
    certifications: [
      'Certification in Fitness and Nutrition',
      'Diploma from K11 Fitness Academy',
      'AKFA – Kettlebell Certification',
      'Physique Elite – Level 1',
      'Physique Elite – Level 2',
      'CrossFit Certification',
      'Karate Black Belt',
    ],
    image: '/assets/aistudio/Shehab_pathan_72151612.jpg',
    alt: 'Shehab Pathan - Senior Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@shehabpathan',
    instagramUrl: 'https://www.instagram.com/shehabpathan/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-arif',
    name: 'Arif Shaikh',
    role: 'Certified Fitness Trainer',
    badgeLabel: 'TRAINER',
    experience: '5 Years Experience',
    bio: 'Dedicated personal trainer specializing in progressive overload, customized muscle building splits, and body recomposition routines.',
    certifications: ['Certification in Fitness'],
    image: '/assets/aistudio/Arif__c997aac4.jpg',
    alt: 'Arif Shaikh - Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@fitxfreakgym',
    instagramUrl: 'https://www.instagram.com/fitxfreakgym/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-david',
    name: 'David Macwan',
    role: 'Fitness Trainer',
    badgeLabel: 'TRAINER',
    experience: '2.5 Years Experience',
    qualification: '12th Pass',
    bio: 'Focused and energetic trainer motivating members through structured resistance training, endurance routines, and form perfection.',
    certifications: ['Fitness Training (General)'],
    image: '/assets/aistudio/David_Macwan_98ba9382.jpg',
    alt: 'David Macwan - Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@david_fit222',
    instagramUrl: 'https://www.instagram.com/david_fit222/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-rehan',
    name: 'Rehan Nanno',
    role: 'Certified Fitness Coach',
    badgeLabel: 'TRAINER',
    experience: '2 Years Experience',
    qualification: 'Currently pursuing B.Com Honours',
    bio: 'INFS Certified fitness coach combining academic discipline with practical nutritional guidance and functional strength workouts.',
    certifications: ['INFS Certified'],
    image: '/assets/aistudio/REHAN_c5cf0a11.jpg',
    alt: 'Rehan Nanno - INFS Certified Trainer at FIT X FREAK',
    instagramHandle: '@_rehxn.05',
    instagramUrl: 'https://www.instagram.com/_rehxn.05/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-ahmad',
    name: 'Ahmad Shaikh',
    role: 'Certified Fitness Trainer',
    badgeLabel: 'TRAINER',
    experience: '2 Years Experience',
    bio: 'Goal-oriented coach focusing on beginner lifting foundations, core stability, and athletic fat loss programs.',
    certifications: ['Certification in Fitness'],
    image: '/assets/aistudio/Ahmad_faaf40c0.jpg',
    alt: 'Ahmad Shaikh - Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@ahmed_sk.07',
    instagramUrl: 'https://www.instagram.com/ahmed_sk.07/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-taksh',
    name: 'Taksh',
    role: 'Personal Fitness Coach',
    badgeLabel: 'TRAINER',
    experience: 'Certified Fitness Coach',
    bio: 'Passionate about athletic performance, progressive overload fundamentals, and injury-free functional muscle gain.',
    certifications: ['Certified Fitness Trainer', 'Form & Mobility Training'],
    image: '/assets/aistudio/Taksh_746a2d0c.jpg',
    alt: 'Taksh - Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@fitxfreakgym',
    instagramUrl: 'https://www.instagram.com/fitxfreakgym/',
    branchName: 'OP Road & Fatehgunj',
  },
  {
    id: 'tr-aehfaz',
    name: 'Aehfaz',
    role: 'Personal Fitness Coach',
    badgeLabel: 'TRAINER',
    experience: 'Certified Fitness Coach',
    bio: 'Specializes in resistance training routines, cardiovascular fitness, and structured body transformation guidance.',
    certifications: ['Strength Training Specialist', 'Body Conditioning'],
    image: '/assets/aistudio/Aehfaz__be8fda2d.jpg',
    alt: 'Aehfaz - Trainer at FIT X FREAK Vadodara',
    instagramHandle: '@aehfazshkk_',
    instagramUrl: 'https://www.instagram.com/aehfazshkk_/',
    branchName: 'OP Road & Fatehgunj',
  },
];

// OP ROAD EQUIPMENT
export const OP_ROAD_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-op-1',
    name: 'Commercial Treadmill & Studio Spin Bike Suite',
    category: 'cardio',
    categoryLabel: 'Cardio',
    description:
      'FitKing W-919 heavy motorized treadmills with shock-absorption running tracks and precision studio spin bikes for intense cardiovascular conditioning.',
    targetMuscle: 'Full Body / Cardio & Lower Body',
    workoutPurpose: 'Walking, running, aerobic stamina building, HIIT sprints, and high-volume calorie expenditure.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9409_cd54590e.jpg',
    alt: 'Commercial Treadmills and Spin Bikes at FIT X FREAK OP Road Vadodara',
    specs: ['FitKing W-919 Commercial Motor', 'Up to 22 km/h Sprint Speed', 'Shock-Absorbing Orthopedic Belt'],
  },
  {
    id: 'eq-op-2',
    name: 'Being Strong Leg Extension & Seated Leg Curl',
    category: 'legs',
    categoryLabel: 'Legs',
    description:
      'Heavy-duty Being Strong selectorized machine designed for isolated quadriceps extension and seated hamstring curl execution with ergonomic pivot pads.',
    targetMuscle: 'Quadriceps & Hamstrings',
    workoutPurpose: 'Isolated knee extension and flexion for lower-body muscle definition and knee joint stabilization.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9410_1d770f93.jpg',
    alt: 'Being Strong Leg Extension and Curl Machine at FIT X FREAK OP Road',
    specs: ['Adjustable Shin Rollers', 'Variable Cam Resistance Ratio', 'Heavy Selectorized Pin Stack'],
  },
  {
    id: 'eq-op-3',
    name: '45° Plate-Loaded Linear Bearing Leg Press',
    category: 'legs',
    categoryLabel: 'Legs',
    description:
      'Commercial 45-degree angle sled featuring an extra-wide diamond footplate, heavy-gauge steel frame, and dual hand safety catches.',
    targetMuscle: 'Quadriceps, Glutes, Hamstrings & Calves',
    workoutPurpose: 'Heavy lower-body compound pressing without spinal loading, maximizing quad hypertrophy and leg power.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9411_8ba97b0e.jpg',
    alt: '45 Degree Leg Press Machine at FIT X FREAK OP Road Vadodara',
    specs: ['700 kg Load Capacity', 'Extra-Wide Footplate', 'Dual Hand Safety Stops'],
  },
  {
    id: 'eq-op-4',
    name: 'Olympic Deadlift Platform & Competition Bumper Plates',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'IWF-standard shock-absorbing hardwood lifting platform paired with a knurled Olympic competition barbell, calibrated rubber bumper plates, and Deadlift Leaderboard.',
    targetMuscle: 'Hamstrings, Glutes, Erector Spinae, Traps & Forearms',
    workoutPurpose: 'Heavy deadlifts, clean pulls, powerlifting, and maximal posterior-chain power development.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9415_47bd5aea.jpg',
    alt: 'Olympic Deadlift Platform with Barbell and Plates at FIT X FREAK OP Road',
    specs: ['Solid Hardwood Center Drop Zone', 'IWF Calibrated Bumper Plates', '20kg Knurled Powerlifting Barbell'],
  },
  {
    id: 'eq-op-5',
    name: 'Plate-Loaded Incline Chest Press & Lat Row Bay',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'Converging biomechanical lever-arm press station that replicates natural chest pressing biomechanics with independent left/right resistance.',
    targetMuscle: 'Upper Pectorals, Anterior Deltoids & Triceps',
    workoutPurpose: 'Upper chest hypertrophy and controlled unilateral pressing without barbell joint strain.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9417_ca51d3a3.jpg',
    alt: 'Plate Loaded Incline Chest Press Machine at FIT X FREAK OP Road',
    specs: ['Converging Axis Movement', 'Independent Arm Resistance', 'High-Density Ergonomic Lumbar Seat'],
  },
  {
    id: 'eq-op-6',
    name: 'Powerlifting Squat Rack & Free Weight Deck',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'Commercial gauge steel power cage with multi-level J-cups, safety spotter arms, pull-up handles, and rubberized Olympic weight trees.',
    targetMuscle: 'Quadriceps, Glutes, Core & Upper Body',
    workoutPurpose: 'Compound squats, overhead presses, barbell lunges, and heavy free-weight barbell training.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9418_265c8ef6.jpg',
    alt: 'Squat Rack and Barbells at FIT X FREAK OP Road',
    specs: ['Heavy-Gauge 3x3 Steel Box Tubing', 'UHMW Bar Protective Liners', 'Multi-Grip Pull-Up Bars'],
  },
  {
    id: 'eq-op-7',
    name: 'Hall of Fame & Member Transformation Board',
    category: 'functional',
    categoryLabel: 'Results Wall',
    description:
      'Dedicated results showcase displaying verified before-and-after client transformations achieved under Founder Irfan Sir and the coaching team.',
    targetMuscle: 'Full Body Transformation & Body Recomposition',
    workoutPurpose: 'Documented fat loss and muscle building progress tracking for FIT X FREAK members.',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    image: '/assets/aistudio/IMG_9414_5d5d9fb5.jpg',
    alt: 'Member Transformation Hall of Fame Wall at FIT X FREAK OP Road',
    specs: ['Dozens of Documented Transformations', 'Coach-Specific Transformation Logs', 'Real Member Weight Loss Records'],
  },
];

// FATEHGUNJ EQUIPMENT
export const FATEHGUNJ_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-fat-1',
    name: 'Commercial Motorized Cardio Treadmills',
    category: 'cardio',
    categoryLabel: 'Cardio',
    description:
      'Commercial high-speed treadmills featuring digital workout metrics, variable incline settings, and impact-cushioned running belts.',
    targetMuscle: 'Cardiovascular System & Lower Body',
    workoutPurpose: 'Cardiovascular endurance, HIIT intervals, aerobic fat burning, and warm-up conditioning.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0005_2dac4c14.jpg',
    alt: 'Cardio Treadmill Section at FIT X FREAK Fatehgunj Vadodara',
    specs: ['Up to 22 km/h Running Speed', '15% Motorized Incline', 'Cushioned Shock Absorption'],
  },
  {
    id: 'eq-fat-2',
    name: 'Rubber Hex Dumbbell Station & Adjustable Benches',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'Full range commercial dumbbells paired with commercial multi-angle incline, decline, and flat benches for free-weight movements.',
    targetMuscle: 'Full Body / Shoulders, Chest, Arms & Back',
    workoutPurpose: 'Unilateral dumbbell presses, bicep curls, lateral raises, dumbbell rows, and targeted muscle sculpting.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0009_03227aeb.jpg',
    alt: 'Dumbbell Zone and Benches at FIT X FREAK Fatehgunj Gym',
    specs: ['Full Weight Increments from 2.5kg to 45kg+', 'Multi-Angle Incline/Decline Benches', 'Mirror-Lined Free Weight Wall'],
  },
  {
    id: 'eq-fat-3',
    name: 'Biomechanical Plate-Loaded Shoulder & Chest Press',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'Selectorized converging press machine designed to match natural human shoulder articulation with counterbalanced levers.',
    targetMuscle: 'Deltoids, Upper Pectorals & Triceps',
    workoutPurpose: 'Overhead shoulder pressing, upper pectoral development, and controlled deltoid hypertrophy.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0011_61b98dda.jpg',
    alt: 'Biomechanical Press Machine at FIT X FREAK Fatehgunj',
    specs: ['Biomechanical Converging Movement', 'Quick-Pin Height Adjustment', 'Smooth Cable & Pulley Tracking'],
  },
  {
    id: 'eq-fat-4',
    name: 'Multi-Stack Cable Crossover & Functional Pulley Station',
    category: 'functional',
    categoryLabel: 'Functional',
    description:
      'Multi-station dual pulley cable tower with high/low adjustable car tracks, tricep ropes, straight bars, and close-grip attachments.',
    targetMuscle: 'Chest, Biceps, Triceps, Lats & Core',
    workoutPurpose: 'Cable chest flyes, tricep pushdowns, cable curls, face pulls, and continuous resistance isolation.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0013_7bb3d484.jpg',
    alt: 'Cable Crossover Station at FIT X FREAK Fatehgunj Gym Vadodara',
    specs: ['Multi-Stack Stations', 'Aircraft Grade Steel Cables', 'Comprehensive Cable Attachments'],
  },
  {
    id: 'eq-fat-5',
    name: 'Seated Cable Row & Lat Hypertrophy Station',
    category: 'strength',
    categoryLabel: 'Strength',
    description:
      'Selectorized low-row machine with textured foot bracing plates and ergonomic handles for isolated mid-back retraction.',
    targetMuscle: 'Latissimus Dorsi, Rhomboids & Middle Trapezius',
    workoutPurpose: 'Horizontal pulling exercises to build back thickness, lat width, and improve posterior posture.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0018_7cb025be.jpg',
    alt: 'Seated Row and Back Machine at FIT X FREAK Fatehgunj',
    specs: ['Contoured Comfort Seat', 'Direct Resistance Pulley Ratio', 'Heavy 120kg Weight Stack'],
  },
  {
    id: 'eq-fat-6',
    name: 'Leg Extension & Lower Body Isolation Suite',
    category: 'legs',
    categoryLabel: 'Legs',
    description:
      'Precision leg extension machine with self-aligning shin rollers, quick-pull seat pin, and heavy selectorized weight stack.',
    targetMuscle: 'Quadriceps & Patellar Tendon Stabilizers',
    workoutPurpose: 'Isolated knee extension for quadriceps definition, teardrop (VMO) growth, and pre-exhaust leg training.',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    image: '/assets/aistudio/IMG-20261014-WA0020_0041d054.jpg',
    alt: 'Leg Extension Machine at FIT X FREAK Fatehgunj',
    specs: ['Adjustable Backrest & Shin Rollers', 'Self-Aligning Roller Pad', 'Full Quadriceps Isolation'],
  },
];

// UNIFIED GYM EQUIPMENT: Best commercial hardware curated across both OP Road & Fatehgunj
export const UNIFIED_EQUIPMENT: EquipmentItem[] = [
  ...OP_ROAD_EQUIPMENT.filter((item) => item.id !== 'eq-op-7'),
  ...FATEHGUNJ_EQUIPMENT,
];

// Fallback alias
export const ALL_EQUIPMENT: EquipmentItem[] = UNIFIED_EQUIPMENT;

// ==========================================
// STUDIO VIDEOS: ZUMBA & FACILITY TOURS
// ==========================================
export const STUDIO_VIDEOS: StudioVideo[] = [
  {
    id: 'vid-zumba-session',
    title: 'High-Energy Zumba & Dance Fitness',
    subtitle: 'Live Studio Choreography & Cardio Burn',
    category: 'Zumba & Group Fitness',
    branchId: 'both',
    branchName: 'FIT X FREAK – OP Road & Fatehgunj',
    address: 'OP Road (Avishkar Complex) & Fatehgunj (Astoria Complex), Vadodara',
    videoUrl: '/assets/aistudio/Zumba_web.mp4',
    posterImage: '/assets/aistudio/Zumba_poster.jpg',
    posterUrl: '/assets/aistudio/Zumba_poster.jpg',
    description:
      'Experience high-octane Zumba & rhythmic group cardio sessions at FIT X FREAK. Torch calories, elevate stamina, and train with unmatched community energy.',
    duration: 'Studio Reel #1',
    highlights: [
      'Full-Body Cardio Burn',
      'Synchronized Choreography',
      'All Fitness Levels',
      'Acoustic Neon Studio',
    ],
    isPortrait: true,
  },
  {
    id: 'vid-zumba-outdoor',
    title: 'Outdoor Community Zumba Session',
    subtitle: 'Morning Park Rhythm & Group Conditioning',
    category: 'Zumba & Group Fitness',
    branchId: 'both',
    branchName: 'FIT X FREAK – Vadodara Community',
    address: 'Special Outdoor Community Fitness Meetup · Vadodara',
    videoUrl: '/assets/aistudio/Zumba2_web.mp4',
    posterImage: '/assets/aistudio/Zumba2_poster.jpg',
    posterUrl: '/assets/aistudio/Zumba2_poster.jpg',
    description:
      'Fresh air, high-energy Bollywood beats, and full-squad outdoor Zumba sessions bringing Vadodara fitness lovers together for joyful fat loss and endurance.',
    duration: 'Outdoor Session #2',
    highlights: [
      'Open-Air Group Energy',
      'Endurance & Stamina',
      'Bollywood Cardio Mix',
      'Community Fitness',
    ],
    isPortrait: true,
  },
  {
    id: 'vid-zumba-indoor',
    title: 'Indoor Hardwood Floor Zumba Batch',
    subtitle: 'Mirrored Studio Choreography & Fat Torch',
    category: 'Zumba & Group Fitness',
    branchId: 'both',
    branchName: 'FIT X FREAK – Studio Floor',
    address: 'OP Road (Avishkar Complex) & Fatehgunj (Astoria Complex), Vadodara',
    videoUrl: '/assets/aistudio/Zumba3_web.mp4',
    posterImage: '/assets/aistudio/Zumba3_poster.jpg',
    posterUrl: '/assets/aistudio/Zumba3_poster.jpg',
    description:
      'Train inside our mirrored hardwood Zumba floor under signature red & black lighting—combining explosive dance intervals with nonstop calorie burn.',
    duration: 'Indoor Batch #3',
    highlights: [
      'Mirrored Studio Floor',
      'High-Calorie HIIT Rhythm',
      'Guided Coach Cues',
      'Beginner Friendly',
    ],
    isPortrait: true,
  },
  {
    id: 'vid-op-road',
    title: 'FIT X FREAK – OP Road Facility Walkthrough',
    subtitle: '7-8th Floor Flagship Training Sanctuary',
    category: 'Facility Walkthrough',
    branchId: 'op-road',
    branchName: 'FIT X FREAK – OP Road',
    address: '7-8th Floor, Avishkar Complex, Old Padra Road, Vadodara',
    videoUrl: '/assets/aistudio/op_road_tour_web.mp4',
    posterImage: '/assets/aistudio/IMG_9409_cd54590e.jpg',
    posterUrl: '/assets/aistudio/IMG_9409_cd54590e.jpg',
    description:
      'Take a virtual walk through our flagship OP Road club. Equipped with competition deadlift bays, Olympic squat cages, Being Strong selectorized machines, and a vibrant beast aesthetic.',
    duration: 'Full Floor Tour',
    highlights: ['Multi-Level Workout Floor', 'Being Strong Machine Suite', 'Olympic Deadlift Platform', 'Spin & Cardio Deck'],
    isPortrait: true,
  },
  {
    id: 'vid-fatehgunj',
    title: 'FIT X FREAK – Fatehgunj Facility Walkthrough',
    subtitle: 'Astoria Complex Beast Training Club',
    category: 'Facility Walkthrough',
    branchId: 'fatehgunj',
    branchName: 'FIT X FREAK – Fatehgunj',
    address: '1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj, Vadodara',
    videoUrl: '/assets/aistudio/fatehgunj_tour_web.mp4',
    posterImage: '/assets/aistudio/IMG-20261014-WA0005_2dac4c14.jpg',
    posterUrl: '/assets/aistudio/IMG-20261014-WA0005_2dac4c14.jpg',
    description:
      'Experience the intense training atmosphere at our Fatehgunj club beside Seven Seas Mall. Featuring heavy dumbbell decks, multi-stack cable crossover towers, and biomechanical presses.',
    duration: 'Full Floor Tour',
    highlights: ['Astoria Complex 1st & 2nd Floor', 'Multi-Stack Cable Towers', 'Heavy Dumbbell Free-Weight Deck', 'Cardio Suite'],
    isPortrait: true,
  },
];

// Legacy alias kept for clean compatibility
export type FacilityVideo = StudioVideo;
export const FACILITY_VIDEOS: StudioVideo[] = STUDIO_VIDEOS;

// ==========================================
// PROVEN RESULTS IN VADODARA (Member Transformations)
// 1. 62 kg -> 68 kg (+6 kg Lean Muscle Gain)
// 2. 52 kg -> 64 kg (+12 kg Lean Muscle Gain)
// 3-10. Verified Member Transformations (02..09)
// ==========================================
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'trans-nitish',
    name: '62 kg → 68 kg Lean Muscle Gain',
    statHighlight: '62 kg → 68 kg (+6 kg Lean Muscle Gain)',
    duration: '+6 kg Lean Muscle',
    quote:
      'Structured progressive overload, clean nutrition tracking, and dedicated strength coaching at FIT X FREAK helped add 6 kg of dense lean muscle mass with visible vascularity and athletic strength.',
    image: '/assets/aistudio/Nitish_s_62_68_kg_Transformation_2683f972.jpg',
    alt: '62 kg to 68 kg lean muscle transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – OP Road',
    featured: true,
  },
  {
    id: 'trans-anmol',
    name: '52 kg → 64 kg Stronger Gain',
    statHighlight: '52 kg → 64 kg (+12 kg Lean Muscle Gain)',
    duration: '+12 kg Lean Muscle',
    quote:
      'Going from 52 kg to a solid, athletic 64 kg (+12 kg lean gain) took relentless consistency, compound lifting programming, and daily guidance from the FIT X FREAK coaching team.',
    image: '/assets/aistudio/52_to_64_kg__Stronger_Transformation_72da4994.jpg',
    alt: '52 kg to 64 kg stronger transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – Fatehgunj',
    featured: true,
  },
  {
    id: 'trans-02',
    name: 'Complete Fat Loss & Toning',
    badge: 'BODY TONING',
    statHighlight: 'Inches Lost & Core Sculpting',
    duration: 'Fat Loss & Toning',
    quote:
      'Consistent strength circuits and personalized nutrition coaching delivered dramatic waist reduction, posture improvement, and lasting energy.',
    image: '/assets/aistudio/02_379d90bf.jpeg',
    alt: 'FIT X FREAK Vadodara female body toning and fat loss transformation',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-03',
    name: 'Lean Arm & Upper Body Mass',
    badge: 'MUSCLE GAIN',
    statHighlight: 'Biceps, Delts & Lean Frame',
    duration: 'Hypertrophy Focus',
    quote:
      'Targeted hypertrophy training and high-protein discipline turned a slender frame into a sharp, muscular upper-body physique.',
    image: '/assets/aistudio/03_0d3c1b60.jpeg',
    alt: 'FIT X FREAK Vadodara lean muscle and arm definition transformation',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-04',
    name: 'Inch Loss & Lifestyle Transformation',
    badge: 'FAT LOSS',
    statHighlight: 'Full-Body Conditioning & Confidence',
    duration: 'Metabolic Training',
    quote:
      'Structured strength + cardio routines sculpted a leaner silhouette while building everyday stamina and athletic confidence.',
    image: '/assets/aistudio/04_bf1a51ef.jpeg',
    alt: 'FIT X FREAK Vadodara weight loss and body toning transformation',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-05',
    name: 'Extreme Body Recomposition',
    badge: 'WEIGHT LOSS',
    statHighlight: 'Major Belly Fat & Waistline Drop',
    duration: 'Full Transformation',
    quote:
      'Disciplined resistance sessions combined with sustainable caloric balance transformed overall physique, posture, and metabolic health.',
    image: '/assets/aistudio/05_1d89c39d.jpeg',
    alt: 'FIT X FREAK Vadodara extreme weight loss and body recomposition transformation',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-06',
    name: '64 kg → 55 kg → 63 kg Recomp',
    badge: 'RECOMPOSITION',
    statHighlight: 'Fat Loss Followed by Lean Muscle Gain',
    duration: '3-Phase Journey',
    quote:
      'First stripped stubborn fat from 64 kg down to 55 kg, then built functional athletic muscle up to a toned, strong 63 kg.',
    image: '/assets/aistudio/06_be40df7e.jpeg',
    alt: '64 kg to 55 kg fat loss and 63 kg muscle gain transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-07',
    name: '87 kg → 75 kg Shred',
    badge: '-12 KG FAT LOSS',
    statHighlight: '87 kg → 75 kg (-12 kg Fat Loss)',
    duration: '12 kg Fat Drop',
    quote:
      'Dropped 12 kg of stubborn body fat while tightening the midsection, revealing chest and shoulder definition through heavy compound lifts.',
    image: '/assets/aistudio/07_5649f077.jpeg',
    alt: '87 kg to 75 kg fat loss transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-08',
    name: '50 kg → 62 kg Hardgainer Gain',
    badge: '+12 KG MUSCLE',
    statHighlight: '50 kg → 62 kg (+12 kg Lean Muscle)',
    duration: '+12 kg Gain',
    quote:
      'Built 12 kg of athletic muscle mass with zero fluff—filling out shoulders, arms, and upper frame with disciplined hypertrophy training.',
    image: '/assets/aistudio/08_18943957.jpeg',
    alt: '50 kg to 62 kg lean muscle gain transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – Vadodara',
  },
  {
    id: 'trans-09',
    name: '77 kg → 65 kg Lean Cut',
    badge: '-12 KG CUT',
    statHighlight: '77 kg → 65 kg (-12 kg Weight Loss)',
    duration: '12 kg Cut',
    quote:
      'A clean 12 kg drop from 77 kg down to a sharp, healthy 65 kg inside FIT X FREAK with structured cardio and resistance training.',
    image: '/assets/aistudio/09_b92409df.jpeg',
    alt: '77 kg to 65 kg fat loss transformation at FIT X FREAK Vadodara',
    branch: 'FIT X FREAK – Vadodara',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Vadodara Best Gym',
    question: 'Which is the best gym in Vadodara for fitness and muscle building?',
    answer:
      'FIT X FREAK is voted the #1 Best Gym in Vadodara with two premier branches: 1) OP Road (7-8th Floor, Avishkar Complex, Old Padra Road) and 2) Fatehgunj (1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall). Founded by Irfan Shaikh and Ronak Parmar alongside Senior Trainer Shehab Pathan (15 Yrs Exp), we provide imported biomechanical equipment, Zumba sessions, and verified transformation plans.',
  },
  {
    category: 'Gym Near Me Vadodara',
    question: 'Where are the FIT X FREAK gym locations in Vadodara and how do I contact them?',
    answer:
      'FIT X FREAK has 2 prime locations in Vadodara: 1) OP Road: 7-8th Floor, Avishkar Complex, Old Padra Road, near McDonald\'s (Call: 6354661053), and 2) Fatehgunj: 1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj (Call: 8733944072). Both branches feature separate contact numbers and direct Google Maps navigation.',
  },
  {
    category: 'Trainers & Leadership',
    question: 'Who are the founders and trainers at FIT X FREAK Vadodara and what are their qualifications?',
    answer:
      'FIT X FREAK is led by Founders Irfan Shaikh and Ronak Parmar, with a certified coaching team headed by Senior Trainer Shehab Pathan (15 Years Experience, K11 Fitness Academy, AKFA Kettlebell, Physique Elite Level 1 & 2, CrossFit, Karate Black Belt), Arif Shaikh (5 Years, Certification in Fitness), Rehan Nanno (INFS Certified), David Macwan (2.5 Years Experience), Ahmad Shaikh, Taksh, and Aehfaz.',
  },
  {
    category: 'Gym Equipment & Zumba',
    question: 'What equipment and group classes are available at FIT X FREAK OP Road and Fatehgunj?',
    answer:
      'We house heavy-duty commercial equipment including FitKing motorized treadmills, Being Strong leg extension/curl units, 45° plate-loaded linear leg presses, Olympic deadlift hardwood platforms, multi-stack cable crossover towers, heavy dumbbells up to 45kg+, plus high-energy Zumba fitness sessions.',
  },
  {
    category: 'Enquiry & Trial Pass',
    question: 'How do I book a workout session or enquire for my preferred branch?',
    answer:
      'Fill out the enquiry form on this website, select your preferred branch (OP Road or Fatehgunj), and submit. Your details will be instantly dispatched to WhatsApp on the exact branch contact number (6354661053 for OP Road or 8733944072 for Fatehgunj).',
  },
];
