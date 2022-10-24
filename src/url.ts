export const getSubstitutionsUrl = () => '/substitution/server/viewer.js?__func=getSubstViewerDayDataHtml&lang=en';

export const getSubstitutionsBody = (date: string, teachersMode = false) => ({
  __args: [
    null,
    { date, mode: teachersMode ? 'teachers' : 'classes' },
  ],
  __gsh: '00000000',
});

export const getMainDbiBody = (schoolYear: number) => ({
  __args: [
    null,
    schoolYear,
    {},
    {
      op: 'fetch',
      needed_part: {
        teachers: ['short'],
        subjects: ['short', 'name'],
        classrooms: ['short'],
        classes: ['short', 'name'],
        periods: ['name', 'starttime', 'endtime'],
      },
      needed_combos: {},
    },
  ],
  __gsh: '00000000',
});

export const getCurrentTimetableBody = (
  schoolYear: number,
  dateFrom: string,
  dateTo: string,
  table: 'classes' | 'teachers' | 'classrooms' | 'subjects',
  id: string,
) => ({
  __args: [
    null,
    {
      year: schoolYear,
      datefrom: dateFrom,
      dateto: dateTo,
      table,
      id,
      showColors: true,
      showIgroupsInClasses: false,
      showOrig: true,
      log_module: 'CurrentTTView',
    },
  ],
  __gsh: '00000000',
});
