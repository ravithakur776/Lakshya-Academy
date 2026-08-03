/**
 * In-memory global store to guarantee instant lead and LTPE synchronization
 * across all server routes during active sessions (works with or without active database URL)
 */

export interface MemoryEnquiry {
  id: string;
  studentName: string;
  name?: string;
  phone: string;
  email?: string;
  interestedCourse?: string;
  course?: string;
  currentClass?: string;
  class?: string;
  leadSource?: string;
  status: string;
  createdAt: string;
  remarks?: string;
}

export interface MemoryLtpe {
  id: string;
  registrationNo: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  phone?: string;
  parentEmail?: string;
  currentClass: string;
  class?: string;
  school?: string;
  city: string;
  gender?: string;
  status: string;
  createdAt: string;
}

declare global {
  var __memoryEnquiries: MemoryEnquiry[] | undefined;
  var __memoryLtpeRegistrations: MemoryLtpe[] | undefined;
}

if (!global.__memoryEnquiries) {
  global.__memoryEnquiries = [];
}

if (!global.__memoryLtpeRegistrations) {
  global.__memoryLtpeRegistrations = [];
}

export const memoryEnquiries = global.__memoryEnquiries;
export const memoryLtpeRegistrations = global.__memoryLtpeRegistrations;
