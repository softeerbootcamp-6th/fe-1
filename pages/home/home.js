import { Header } from "../../components/index.js";

const renderHeader = () => {
  const header = Header({
    selectedNav: "home",
  });
  document.getElementById("header-container").appendChild(header);
};

renderHeader();
