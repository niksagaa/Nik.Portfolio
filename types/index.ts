// types/index.ts

export interface Project {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExtendedProject extends Project {
  problemStatement?: string;
  solutionHighlights?: string[];
  measuredImpact?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: number;
}

export interface Experience {
  id?: string;
  profile_id?: string;
  company: string;
  role: string;
  period: string;
  details: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface CVData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  githubUrl?: string;
  linkedinUrl?: string;
  experience: Experience[];
  education: Education[];
}
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  date: string;
}
