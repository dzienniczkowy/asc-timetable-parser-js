export const getSubstitutionsUrl = () => '/substitution/server/viewer.js?__func=getSubstViewerDayDataHtml&lang=en';

export const getSubstitutionsBody = (date: string, teachersMode = false) => ({
  __args: [
    null,
    { date: date, mode: teachersMode ? 'teachers' : 'classes' }
  ],
  __gsh: '00000000'
});
