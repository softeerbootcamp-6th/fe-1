import TextInput from "../../components/TextInput/TextInput.js";

const textInputStyle = `
  width: 100%;
  height: 4rem;
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.8rem;
  background-color: var(--nuetral-surface-weak);
  color: var(--nuetral-text-weak);
  `;

const deleteMethodModalTemplate = (value) => {
  return `
    <div class="font-semibold-12" style="${textInputStyle}">
        ${value}
    </div>
  `;
};

export default deleteMethodModalTemplate;
