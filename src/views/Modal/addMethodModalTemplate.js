import TextInput from "../../components/TextInput/TextInput.js";

const addMethodModalTemplate = () => {
  return TextInput({
    type: "default",
    state: "enabled",
    placeholder: "결제수단 이름",
    value: "",
    disabled: false,
  }).outerHTML;
};

export default addMethodModalTemplate;
