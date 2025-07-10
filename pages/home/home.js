import { Header } from "../../components/index.js";

const renderHeader = () => {
  const header = Header();
  // body의 첫 번째 자식으로 추가 (맨 위에 위치)
  document.body.insertBefore(header, document.body.firstChild);
};

renderHeader();
