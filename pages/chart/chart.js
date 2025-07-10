import { Header } from "../../components/index.js";

const renderHeader = () => {
  const header = Header({
    selectedNav: "chart",
  });
  document.getElementById("header-container").appendChild(header);
};

renderHeader();
