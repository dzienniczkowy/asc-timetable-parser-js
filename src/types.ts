export interface LessonRange {
  first: number;
  last: number;
}

export interface Absence {
  name: string;
  lessons: LessonRange | null;
}

export interface Change {
  lessons: LessonRange | null;
  info: string;
}

export interface SubstitutionSection {
  name: string;
  changes: Change[];
}
export interface Substitutions {
  date: string;
  absentTeachers: Absence[];
  absentClasses: Absence[];
  sections: SubstitutionSection[];
}
