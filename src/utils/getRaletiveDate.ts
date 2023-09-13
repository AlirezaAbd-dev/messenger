export default function getRelativeDate(time: Date) {
   const timeRelative = new Intl.RelativeTimeFormat('fa', { numeric: 'auto' });

   const now = new Date();

   const nowYear = now.getFullYear();
   const timeYear = time.getFullYear();

   if (nowYear - timeYear !== 0) {
      return timeRelative.format(-(nowYear - timeYear), 'years');
   }

   const nowMonth = now.getMonth();
   const timeMonth = time.getMonth();

   if (nowMonth - timeMonth !== 0) {
      return timeRelative.format(-(nowMonth - timeMonth), 'months');
   }

   const nowDay = now.getDay();
   const timeDay = time.getDay();

   if (nowDay - timeDay !== 0) {
      return timeRelative.format(-(nowDay - timeDay), 'days');
   }

   const nowHour = now.getHours();
   const timeHour = time.getHours();

   if (nowHour - timeHour !== 0) {
      return timeRelative.format(-(nowHour - timeHour), 'hours');
   }

   const nowMinute = now.getMinutes();
   const timeMinute = time.getMinutes();

   if (nowMinute - timeMinute !== 0) {
      return timeRelative.format(-(nowMinute - timeMinute), 'minutes');
   }
}
