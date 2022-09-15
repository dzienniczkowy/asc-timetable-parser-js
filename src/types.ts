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
