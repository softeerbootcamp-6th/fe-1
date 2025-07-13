// 같은 날짜별로 그룹화하는 함수
export function groupItemsByDate(items) {
  const group = {};
  items.forEach((item) => {
    const date = item.date;
    if (!group[date]) group[date] = [];
    group[date].push(item);
  });
  return group;
}
