import { Lesson } from './types';
import { defined } from './utils';

interface CurrentTimetableCard {
  type: 'card';
  date: string;
  uniperiod: string;
  starttime: string;
  endtime: string;
  subjectid: string;
  classids: string[]
  groupnames: string[];
  igroupid: string;
  teacherids: string[];
  classroomids: string[];
  colors: string[];
  cellSlices: string;
  cellOrder: number;
  removed?: boolean;
}

type CurrentTimetableItem = CurrentTimetableCard;

export function parseCurrentTimetable(json: string): {
  lessons: Lesson[];
} {
  const body = JSON.parse(json);
  if (body === null || typeof body !== 'object') throw new Error('current timetable response should be an object');
  if (body.r === null || typeof body.r !== 'object') {
    throw new Error('current timetable response should have a field "r"');
  }
  if (!(body.r.ttitems instanceof Array)) throw new Error('current timetable response should have an array "r.ttitems"');
  const items = body.r.ttitems as CurrentTimetableItem[];
  const lessons = items.map((item): Lesson | undefined => {
    if (item.type !== 'card') return undefined;
    return {
      type: 'lesson',
      date: item.date,
      periodId: item.uniperiod,
      startTime: item.starttime,
      endTime: item.endtime,
      classIds: item.classids,
      classroomIds: item.classroomids,
      color: item.colors[0] ?? null,
      groupNames: item.groupnames.filter((name) => name !== ''),
      subjectId: item.subjectid,
      teacherIds: item.teacherids,
      removed: item.removed ?? false,
    };
  }).filter(defined);
  return {
    lessons,
  };
}
