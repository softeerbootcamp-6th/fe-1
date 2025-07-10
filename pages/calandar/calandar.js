import { Header } from "../../components/index.js";

const renderHeader = () => {
  const header = Header({
    selectedNav: "calendar",
  });
  document.getElementById("header-container").appendChild(header);
};

renderHeader();
