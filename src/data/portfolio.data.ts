import type { ProjectItem, SkillCategory } from '../types/os';

export const getNevitechExperienceDuration = () => {
  const start = new Date(2026, 6, 1); // July 1, 2026
  const now = new Date();
  
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) {
    months--;
  }
  months = Math.max(1, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let durationText = '';
  if (years > 0) {
    durationText = `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
  } else {
    durationText = `${months} mo${months > 1 ? 's' : ''}`;
  }

  return {
    months,
    durationText,
    formattedRange: `Jul 2026 - Present · ${durationText}`
  };
};

export const WORK_EXPERIENCE = [
  {
    id: 'nevitech',
    role: 'Trainee Software Support Engineer',
    company: 'Nevitech Data Solutions Pvt Ltd',
    type: 'Full-time',
    startDate: 'Jul 2026',
    endDate: 'Present',
    location: 'Noida, Uttar Pradesh, India · On-site',
    description: 'Providing tier-1/tier-2 technical software support for NCampus Campus Management System. Diagnosing database queries, resolving module workflows, assisting institutional clients, and optimizing system functionality.',
    highlights: [
      'NCampus Campus Management System Support & Bug Resolution',
      'Database Querying, Data Verification & Module Workflow Troubleshooting',
      'Client Escalation Management & System Incident Resolution'
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: 'sppu_be',
    institution: 'Savitribai Phule Pune University (SPPU)',
    degree: 'Bachelor of Engineering (B.E.) - Information Technology',
    duration: 'Dec 2021 – Jun 2025',
    grade: '7.99 CGPA',
    status: 'Graduated',
    description: 'Completed Bachelor of Engineering in Information Technology with 7.99 CGPA. Specialized in Data Structures & Algorithms, Database Management Systems, Computer Networks, Software Engineering, and Full-Stack Web Development.',
    highlights: [
      'Data Structures & Algorithms (DSA)',
      'Database Management Systems (DBMS / PostgreSQL)',
      'Computer Networks & Web Security',
      'Software Engineering & SDLC'
    ]
  }
];

export const PORTFOLIO_BIO = {
  name: 'Santosh Maurya',
  title: 'Software Support Engineer & FullStack Developer',
  bio: 'B.E. Information Technology Graduate (2025) from Savitribai Phule Pune University (7.99 CGPA). Trainee Software Support Engineer at Nevitech Data Solutions, passionate about full-stack web development, system architecture, and building impactful software solutions.',
  location: 'Delhi NCR, India',
  status: 'B.E. IT 2025 Graduate | Software Support Engineer at Nevitech',
  stats: {
    projectsCompleted: 2,
    codeCommits: 950,
    cgpa: '7.99',
    techNodeCount: 16,
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'shreyaan_physio',
    title: 'Shreyaan Physiotherapy Center',
    subtitle: 'Healthcare Patient Management & Online Appointment Platform',
    description: 'Official healthcare web application for Shreyaan Physiotherapy Centre and Dr. Sonam Mourya. Features online appointment scheduling, treatment services catalog, patient inquiry management, and direct WhatsApp notification integration.',
    category: 'FullStack',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'WhatsApp API'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    githubUrl: 'https://github.com/SantoshM5050',
    liveUrl: 'https://www.shreyaanphysiotherapycenter.in/',
    featured: true,
    highlights: [
      'Online Appointment Scheduling & Patient Booking',
      'Services & Specialized Therapy Catalog',
      'Direct WhatsApp Inquiry & Consultation Link',
      'Mobile Responsive Glassmorphic UI Design'
    ],
  },
  {
    id: 'sm_core_dashboard',
    title: 'SM Core Dashboard & Discord Bot',
    subtitle: 'Automated Discord Bot & Real-Time Analytics Dashboard',
    description: 'Full-stack automated Discord bot and enterprise web management dashboard system. Features full working Discord bot integration, user authentication login, server event management, role-based controls, dynamic data visualisations, and real-time telemetry monitoring.',
    category: 'FullStack',
    tags: ['React', 'TypeScript', 'Node.js', 'Discord.js', 'Vite', 'Tailwind CSS', 'REST API', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    githubUrl: 'https://github.com/SantoshM5050',
    liveUrl: 'https://smcoredashboard.vercel.app/login',
    featured: true,
    highlights: [
      'Full Working Automated Discord Bot System',
      'User Authentication & Secure Login System',
      'Real-Time Analytics & Telemetry Monitoring',
      'Hosted Live on Vercel Cloud Infrastructure'
    ],
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    name: 'Software Engineering & Web Core',
    skills: [
      { name: 'JavaScript (ESNext) / TypeScript', status: 'PROD READY', level: 100, experience: 'Academic & Projects' },
      { name: 'React 19 / Next.js', status: 'PROD READY', level: 100, experience: 'FullStack Projects' },
      { name: 'HTML5 / Tailwind CSS / Glassmorphism', status: 'ADVANCED', level: 100, experience: 'UI Architecture' },
      { name: 'Node.js / Express.js', status: 'PROD READY', level: 100, experience: 'Backend APIs' },
    ],
  },
  {
    name: 'Computer Science Fundamentals & DBMS',
    skills: [
      { name: 'Data Structures & Algorithms (DSA)', status: 'PROFICIENT', level: 100, experience: 'SPPU Curriculum & Practice' },
      { name: 'Database Management Systems (DBMS)', status: 'PROD READY', level: 100, experience: 'PostgreSQL / MongoDB / SQL' },
      { name: 'Computer Networks & Web Security', status: 'CORE STACK', level: 100, experience: 'B.E. IT Core' },
      { name: 'Software Development Lifecycle (SDLC)', status: 'ADVANCED', level: 100, experience: 'Agile & Support Workflows' },
    ],
  },
  {
    name: 'Support Engineering, Tools & Cloud',
    skills: [
      { name: 'Software Support & NCampus CMS', status: 'EXPERT', level: 100, experience: 'Nevitech Data Solutions' },
      { name: 'Git / GitHub Version Control', status: 'PROD READY', level: 100, experience: 'CI/CD Pipelines' },
      { name: 'Python & FastAPI', status: 'PROFICIENT', level: 100, experience: 'Automation Scripts' },
      { name: 'Vite / Docker / Cloud Deployment', status: 'ADVANCED', level: 100, experience: 'Modern Tooling' },
    ],
  },
];
