export function initDescriptionListener() {
    
    const charCount = document.getElementById("char-count");
    const descInput = document.getElementById("desc");

        //내용 32자 제한
    descInput.addEventListener("input", () => {
      const length = descInput.value.length;
      charCount.textContent = `${length} / 32`;
    });
    
}