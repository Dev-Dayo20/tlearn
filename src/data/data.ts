export interface Class {
  id: string;
  name: string;
  teacher: string;
  studentsCount: number;
  subjects: string[];
  schedule: string;
  status: "active" | "upcoming" | "completed";
}

export const classes: Class[] = [
  {
    id: "1",
    name: "Grade 9-A",
    teacher: "Dr. Sarah Mitchell",
    studentsCount: 28,
    subjects: ["Math", "Science", "English"],
    schedule: "Mon-Fri 8:00 AM",
    status: "active",
  },
  {
    id: "2",
    name: "Grade 9-B",
    teacher: "Mr. Robert Clark",
    studentsCount: 25,
    subjects: ["Math", "History", "Art"],
    schedule: "Mon-Fri 8:30 AM",
    status: "active",
  },
  {
    id: "3",
    name: "Grade 10-A",
    teacher: "Ms. Jennifer Lee",
    studentsCount: 30,
    subjects: ["Physics", "Chemistry", "Biology"],
    schedule: "Mon-Fri 9:00 AM",
    status: "active",
  },
  {
    id: "4",
    name: "Grade 10-B",
    teacher: "Dr. Michael Brown",
    studentsCount: 27,
    subjects: ["Math", "Computer Science"],
    schedule: "Mon-Fri 9:30 AM",
    status: "active",
  },
  {
    id: "5",
    name: "Grade 11-A",
    teacher: "Mrs. Emily White",
    studentsCount: 24,
    subjects: ["Advanced Math", "Physics"],
    schedule: "Mon-Fri 10:00 AM",
    status: "active",
  },
  {
    id: "6",
    name: "Grade 11-B",
    teacher: "Mr. David Garcia",
    studentsCount: 26,
    subjects: ["Literature", "History"],
    schedule: "Mon-Fri 10:30 AM",
    status: "upcoming",
  },
  {
    id: "7",
    name: "Grade 12-A",
    teacher: "Dr. Lisa Anderson",
    studentsCount: 22,
    subjects: ["Calculus", "Statistics"],
    schedule: "Mon-Fri 11:00 AM",
    status: "active",
  },
  {
    id: "8",
    name: "Grade 12-B",
    teacher: "Mr. James Wilson",
    studentsCount: 20,
    subjects: ["Economics", "Business"],
    schedule: "Mon-Fri 11:30 AM",
    status: "completed",
  },
];
