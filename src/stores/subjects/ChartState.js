import { Subject } from "../../utils/index.js";

class ChartState extends Subject {
  constructor() {
    super();
    this.selectedCategory = "";
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
    this.notify({
      subject: "chart",
      data: { selectedCategory: this.selectedCategory },
    });
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }
}

const chartState = new ChartState();
export default chartState;
