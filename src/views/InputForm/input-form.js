const createInputForm = async () => {
  const response = await fetch("/src/views/InputForm/input-form.html");
  const template = await response.text();

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = template;
  const inputFormElement = tempDiv.firstElementChild;

  return inputFormElement;
};

export default createInputForm;
