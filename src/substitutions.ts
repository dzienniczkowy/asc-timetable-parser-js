import { load } from 'cheerio';
import { defined, ifDefined, removePrefix } from './utils.js';
import {
  Absence, LessonRange, Substitutions, SubstitutionSection,
} from './types.js';

const absenceRegex = /^(.+?) *(?:\((\d+)(?: *- *(\d+))?\))?$/;
const lessonRangeRegex = /^\(?(\d+)(?: *- *(\d+))?\)?$/;

function parseAbsentList(list: string) {
  return list.split(',')
    .map((el) => el.trim())
    .map((el) => {
      const match = absenceRegex.exec(el);
      if (match === null) return undefined;
      return {
        name: match[1],
        lessons: match[2] === undefined ? null : {
          first: parseInt(match[2], 10),
          last: parseInt(match[3] ?? match[2], 10),
        },
      };
    }).filter(defined);
}

export function parseSubstitutions(json: string): Substitutions {
  const body = JSON.parse(json);
  if (body === null || typeof body !== 'object') throw new Error('Class substitution response should be an object');
  if (typeof body.r !== 'string') throw new Error('Class substitution response should have a string field "r"');
  const cheerio = load(body.r);
  const wrapper = cheerio('div[data-date]');
  const absentTeachers: Absence[] = [];
  const absentClasses: Absence[] = [];
  cheerio('> div[style=text-align:center] > span.print-font-resizable', wrapper)
    .toArray()
    .map((el) => cheerio(el).text())
    .forEach((el) => {
      ifDefined(removePrefix(el, 'Absent teachers:'), (list) => {
        absentTeachers.push(...parseAbsentList(list));
      });
      ifDefined(removePrefix(el, 'Absent classes:'), (list) => {
        absentClasses.push(...parseAbsentList(list));
      });
    });
  const sections: SubstitutionSection[] = cheerio('> .section', wrapper)
    .toArray()
    .map((el) => ({
      name: cheerio('> .header', el).text(),
      changes: cheerio('.change').toArray().map((changeEl) => {
        const period = cheerio('> .period', changeEl).text().trim();
        let lessons: LessonRange | null = null;
        if (period !== 'whole day') {
          const match = lessonRangeRegex.exec(period);
          if (match === null) console.warn(`Cannot parse lesson range "${period}"`);
          else if (match[2] === undefined) {
            lessons = {
              first: parseInt(match[1], 10),
              last: parseInt(match[1], 10),
            };
          } else {
            lessons = {
              first: parseInt(match[1], 10),
              last: parseInt(match[2], 10),
            };
          }
        }
        return {
          lessons,
          info: cheerio('> .info', changeEl).text(),
        };
      }),
    }));
  return {
    date: wrapper.data().date as string,
    absentClasses,
    absentTeachers,
    sections,
  };
}
