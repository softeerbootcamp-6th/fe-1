import { createElement } from "../../utils/dom.js";

const createInputForm = async () => {
  const inputFormElement = await createElement(
    "/src/views/InputForm/input-form.html"
  );

  return inputFormElement;
};

export default createInputForm;
