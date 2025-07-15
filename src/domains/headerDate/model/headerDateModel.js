export class HeaderDateModel {
    // HeaderDate: 월별 달력 모델
    constructor(base = new Date()) {
        // 현재 날짜를 기준으로 연도와 월을 설정
        this.year = base.getFullYear();
        this.month = base.getMonth() + 1;
    }

    // 월을 이동하는 함수
    shift(d) {
        this.month += d;
        if (this.month < 1) {
            this.month = 12;
            this.year--;
        }
        if (this.month > 12) {
            this.month = 1;
            this.year++;
        }
    }

    // 연도와 월을 설정하는 함수
    set(y, m) {
        this.year = y;
        this.month = m;
    }

    // 현재 연도와 월을 반환하는 함수
    get() {
        return {year: this.year, month: this.month};
    }
}

// template literal을 사용해서 할 수도 있음