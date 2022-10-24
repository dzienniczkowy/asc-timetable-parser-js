export interface LessonRange {
  first: number;
  last: number;
}

export interface Absence {
  name: string;
  lessons: LessonRange | null;
}

export interface Substitution {
  lessons: LessonRange | null;
  info: string;
  cancelled: boolean;
}

export interface SubstitutionSection {
  name: string;
  changes: Substitution[];
}

export interface Substitutions {
  date: string;
  absentTeachers: Absence[];
  absentClasses: Absence[];
  sections: SubstitutionSection[];
}

interface Teacher {
  name: string;
}

interface Subject {
  name: string;
  short: string;
}

interface Classroom {
  name: string;
}

interface Class {
  name: string;
  short: string;
}

interface Period {
  name: string;
  startTime: string;
  endTime: string;
}

export interface MainDbi {
  teachers: Record<string, Teacher>;
  subjects: Record<string, Subject>;
  classrooms: Record<string, Classroom>;
  classes: Record<string, Class>;
  periods: Record<string, Period>;
}

export interface Lesson {
  type: 'lesson';
  date: string;
  periodId: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  classIds: string[];
  groupNames: string[];
  teacherIds: string[];
  classroomIds: string[];
  color: string | null;
  removed: boolean;
}
