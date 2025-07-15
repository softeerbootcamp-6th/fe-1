import { createHTML } from "../../utils/dom.js";

const createInputForm = async () => {
  const inputFormElement = await createHTML(
    "/src/views/InputForm/input-form.html"
  );

  return inputFormElement;
};

export default createInputForm;
