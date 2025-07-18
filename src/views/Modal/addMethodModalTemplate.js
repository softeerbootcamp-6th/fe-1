import TextInput from "../../components/TextInput/TextInput.js";

const AddMethodModalTemplate = () => {
  return TextInput({
    type: "default",
    state: "enabled",
    placeholder: "결제수단 이름",
    value: "",
    disabled: false,
  }).outerHTML;
};

export default AddMethodModalTemplate;
