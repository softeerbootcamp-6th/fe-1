/* 
  initDescriptionListener()
  description input의 글자 수를 제한하고, 현재 입력된 글자 수를 표시
  description input의 글자 수가 32자를 초과하지 않도록 제한하는 리스너를 등록한다.

  이건 32로 하드 코딩이 되어 있어 후에 const 변수로 max count를 만들어서 쉽게 변경할 수 있도록 바꿔보는게 좋아 보인다.
*/

export function initDescriptionListener() {
  const charCount = document.getElementById("char-count");
  const descInput = document.getElementById("desc");

  //내용 32자 제한
  descInput.addEventListener("input", () => {
    const length = descInput.value.length;
    charCount.textContent = `${length} / 32`;
  });
}
