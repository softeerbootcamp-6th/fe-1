const handleShiftingYearMonth = ({ year, month }) => {
  if (month < 1) {
    month = 12;
    --year;
  }
  if (month > 12) {
    month = 1;
    ++year;
  }
  return { year, month };
};

export class HeaderDateModel {
  // HeaderDate: 월별 달력 모델
  constructor(base = new Date()) {
    // 현재 날짜를 기준으로 연도와 월을 설정
    this.year = base.getFullYear();
    this.month = base.getMonth() + 1;
  }

  // 월을 이동하는 함수
  shift(monthDelta) {
    this.month += monthDelta;
    const { year, month } = handleShiftingYearMonth({
      year: this.year,
      month: this.month,
    });
    this.year = year;
    this.month = month;
  }

  // 연도와 월을 설정하는 함수
  set(y, m) {
    this.year = y;
    this.month = m;
  }

  // 현재 연도와 월을 반환하는 함수
  get() {
    return { year: this.year, month: this.month };
  }
}

// template literal을 사용해서 할 수도 있음
