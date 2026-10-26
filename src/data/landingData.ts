export interface MemoryItem {
  id: string;
  defaultText: string;
  angle: string;
  imageSrc: string;
}

export interface TestimonialItem {
  stars: number;
  text: string;
  role: string;
}

export interface InstituteContact {
  name: string;
  brandTitle: string;
  tagline: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  googleReviewsUrl: string;
  googleMapsUrl: string;
  location: string;
}

/**
 * Automatically computes the active academic session year string (e.g., "2026–27").
 * Automatically rolls over to the next academic cycle every March (month index 2).
 */
export function getAcademicSession(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan, 1 = Feb, 2 = Mar...
  const startYear = month >= 2 ? year : year - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return `${startYear}–${endYearShort}`;
}

export const INSTITUTE_CONTACT: InstituteContact = {
  name: "R.K Coaching Classes",
  brandTitle: "R.K Coaching Classes",
  tagline: "Providing Balotra's students with premium CBSE & RBSE conceptual tutoring for more than 15 years, with signature specialization in Mathematics and Science.",
  email: "rk.coachings20@gmail.com",
  phone: "+919414668795",
  phoneFormatted: "+91 9414668795",
  googleReviewsUrl: "https://share.google/5jqTmP4v5U1thBhQT",
  googleMapsUrl: "https://www.google.com/maps/dir//R.K+Coaching+Classes,+65,+Agarwal+Colony,+Balotra,+Rajasthan+344022/@25.8303025,72.2394526,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3943ef868378e527:0xe9b7faff3fd1c369!2m2!1d72.2363681!2d25.827254?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
  location: "Balotra, Rajasthan"
};

export const MEMORIES_DATA: MemoryItem[] = [
  { id: "mem-1", defaultText: "Kite Festival Fun", angle: "-5deg", imageSrc: "/images/memories/memory1.webp" },
  { id: "mem-2", defaultText: "Terrace Celebrations", angle: "3deg", imageSrc: "/images/memories/memory2.webp" },
  { id: "mem-3", defaultText: "RK Classroom Smiles", angle: "-2deg", imageSrc: "/images/memories/memory3.webp" },
  { id: "mem-4", defaultText: "Patriotic Day Celebrations", angle: "4deg", imageSrc: "/images/memories/memory4.webp" },
  { id: "mem-5", defaultText: "Holi Celebrations & Joy", angle: "-3deg", imageSrc: "/images/memories/memory5.webp" }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  // ROW 1: 4 REVIEWS
  {
    stars: 5,
    text: "Concept clarity is amazing here. The way Rakesh Sir explains complex mathematics from early grades is wonderful. My child cleared all core basics easily and scored top marks!",
    role: "Parent of Class X Student"
  },
  {
    stars: 5,
    text: "The small batch size and personal attention from Rekha Ma'am helped my daughter secure 92.0% in 10th Board. Highly structured weekly tests build real exam temperament.",
    role: "Parent of Gunjan Salecha"
  },
  {
    stars: 5,
    text: "Friendly teachers who explain each scientific formula with practical diagrams. I never felt hesitant to ask doubts here. My board exam fear was completely replaced with confidence.",
    role: "Class X Board Student"
  },
  {
    stars: 5,
    text: "Excellent parent communication. We receive attendance logs and weekly test reports regularly. The tutors are highly supportive, and their concept-driven approach is outstanding.",
    role: "Guardian of Class VIII Student"
  },

  // ROW 2: 4 REVIEWS
  {
    stars: 5,
    text: "Balotra's most trusted coaching classes for CBSE & RBSE. Harsh Sir's structured chapter notes and formula summaries made board exam preparation completely stress-free.",
    role: "Class X Topper Parent"
  },
  {
    stars: 5,
    text: "Mathematics used to be my hardest subject, but after joining R.K Coaching, solving theorems and numericals became second nature. The daily doubt clearing is unbeatable!",
    role: "Class IX Student"
  },
  {
    stars: 5,
    text: "Rekha Ma'am's patience with young children is unparalleled. My son's foundational reading, mental math, and handwriting improved remarkably in just six months.",
    role: "Parent of Primary Student"
  },
  {
    stars: 5,
    text: "The disciplined study environment and weekly Sunday test series at RK Coaching formed the bedrock of my academic success. Truly grateful to all mentors here!",
    role: "Alumni Board Achiever"
  }
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "Academics",
    question: "Which classes and curriculum boards do you teach at R.K Coaching Classes?",
    answer: "We specialize in Classes 6th through 10th for both CBSE and RBSE (Rajasthan State Board) curricula. Our signature focus is building rock-solid conceptual clarity in Mathematics and Science, preparing students for school excellence and board examinations."
  },
  {
    id: "faq-2",
    category: "Methodology",
    question: "What makes R.K Coaching's conceptual teaching approach different?",
    answer: "Rather than rote memorization, our mentors (led by Rakesh Sir and Rekha Ma'am with 15+ years of academic legacy) teach from first principles. We explain the 'why' behind mathematical formulas and science theorems using whiteboard derivations, daily practical examples, and systematic weekly tests."
  },
  {
    id: "faq-3",
    category: "Batches",
    question: "What is the typical batch size, and is individual doubt clearing provided?",
    answer: "We maintain small, disciplined batch sizes so every student gets personal attention. Daily dedicated 1-on-1 doubt clearing sessions ensure that no question goes unanswered, regardless of a student's starting baseline."
  },
  {
    id: "faq-4",
    category: "Admissions",
    question: "Are trial or demo classes available before enrollment?",
    answer: "Yes! We welcome students and parents to attend a 2-day classroom orientation and demo session. This gives students firsthand experience of our classroom teaching style, pace, and interactive mentor guidance before finalizing admission."
  },
  {
    id: "faq-5",
    category: "Parent Updates",
    question: "How are parents kept informed about student attendance and test performance?",
    answer: "We maintain transparent, proactive parent communication. Parents receive direct updates regarding daily classroom attendance, weekly Sunday test scorecards, and constructive feedback during regular parent-teacher counseling sessions."
  },
  {
    id: "faq-6",
    category: "Study Material",
    question: "Do students receive printed study notes and question banks?",
    answer: "Yes. Every enrolled student receives our curated concept study modules, NCERT exemplar solutions, chapter-wise formula cheat sheets, and past 10-year board examination question sets designed to build complete exam temperament."
  },
  {
    id: "faq-7",
    category: "Enrollment",
    question: "How can I apply for admission or visit the coaching center?",
    answer: "You can submit our quick 2-minute online Application Form right here on this website, connect directly with our mentors via WhatsApp at +91 9414668795, or visit our center at 65 Agrawal Colony, Near Vardhman School, Balotra."
  }
];
