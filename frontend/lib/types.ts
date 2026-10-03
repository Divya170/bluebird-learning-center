export interface Program { id: string; code: string; name: string; bg: string; short: string; long: string; audience: string }
export interface Course {
  id: string; programId: string; programName: string; programBg: string; name: string; description: string;
  long: string; schedule: string; level: string; requirements: string; published: boolean; teacherIds: string[];
}
export interface Teacher { id: string; name: string; role: string; bio: string; courseIds: string[] }
export interface Faq { id: string; category: string; question: string; answer: string; pending: boolean }
export interface Settings {
  address: string; city: string; phone: string; email: string; hours: string; story: string; mapsUrl: string;
  showMarkers: boolean; courseView: 'grid' | 'list';
}
export interface Site {
  settings: Settings;
  programs: Program[];
  courses: Course[];
  teachers: Teacher[];
  themes: { n: string; title: string; body: string }[];
  faqCategories: { key: string; label: string }[];
  faqs: Faq[];
  hero: { src: string; alt: string; pos: string }[];
  inquiryTopics: { value: string; label: string }[];
  registrationStatuses: string[];
  inquiryStatuses: string[];
}
export interface Registration {
  id: number; ref: string; studentName: string; isStudent: boolean; guardianName: string; email: string; phone: string;
  course: string; courseName: string; message: string; status: string; createdAt: string;
}
export interface Inquiry { id: number; ref: string; name: string; email: string; topic: string; topicLabel: string; message: string; status: string; createdAt: string }
