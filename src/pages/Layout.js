import { formStore } from "../store/FormStore.js";
import { EventDispatcher } from "../utils/EventDispatcher.js";
import { renderHeader } from "./Header.js";
import { renderMain } from "./Main.js";

export const createLayout = () => {
  const app = document.getElementById("app");

  const header = renderHeader();
  const main = renderMain();
  app.appendChild(header);
  app.appendChild(main);

  // reload되는 문제 분석하는 trace
  window.addEventListener("beforeunload", (e) => {
    console.log("페이지가 새로고침됩니다!");
    console.trace(); // 호출 스택을 보여줌
    debugger; // 디버거 중단점
  });

  // 하위에서 이벤트 감지가 되지 않아 -> 이벤트 위임/등록 순서와 관련된 문제 발생
  // EventDispatcher.register({
  //   eventType: "click",
  //   selector: "#app",
  //   handler: (e) => {
  //     const entireForm = e.target.closest(".entire-form");
  //     if (!entireForm && formStore.data.mode === "edit") {
  //       const uid = formStore.data.uid;
  //       const uidItem = document.querySelector(`div[data-uid="${uid}"]`);
  //       uidItem.classList.remove("active");
  //       formStore.dispatch("reset");
  //     }
  //   },
  // });
};
