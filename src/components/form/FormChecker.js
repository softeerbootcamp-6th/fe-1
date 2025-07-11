export const FormChecker = (input) => {
  const formChecker = document.createElement("div");
  formChecker.classList.add("form-checker");
  formChecker.innerHTML = `
      <img style="width:40px" src="./src/assets/check.png" alt="check icon">
    `;

  formChecker.addEventListener("click", () => {
    console.log("입력값:", input);
  });
  return formChecker;
};
