// 날짜 내림차순 정렬
export const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

// 선택된 연월에 해당하는 항목만 필터링
export const filterEntriesByYearMonth = ({ entries, year, month }) => {
  const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
  return entries.filter((entry) => entry.date.startsWith(yearMonth));
};
