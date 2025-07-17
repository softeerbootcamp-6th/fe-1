class ChartView {
  constructor() {
    this.$pieChart = document.querySelector(".pie-chart");
    this.$barChart = document.querySelector(".bar-chart");
    this.$transactions = document.querySelector(".transactions");
  }

  render({ transactions }) {
    console.log(transactions);
  }
}

export default ChartView;
