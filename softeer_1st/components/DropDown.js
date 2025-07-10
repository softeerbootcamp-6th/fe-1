import { createElement } from "../utils/createElement.js";

export function DropDown({
    options = [],
    onChange,
    onDelete,
    isOpen = false,
    selectedIndex = 0,
    isPaymentMethod,
    handleModalOpen,
}) {
    const dropDownWrapper = createElement("div", {
        className: `drop-down-wrapper ${isOpen ? "open" : ""}`,
    });
    options.forEach((option, index) => {
        const dropDownElement = createElement("div", {
            className: "drop-down-element",
        });
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", (e) => {
            e.stopPropagation();
            onChange(option, index);
        });
        if (isPaymentMethod) {
            const deleteButton = createElement("button", {
                className: "delete-button",
                innerHTML: `<img src="../assets/icons/delete.svg" alt="삭제">`,
            });
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                onDelete(index);
            });
            dropDownElement.appendChild(optionElement);
            dropDownElement.appendChild(deleteButton);
            dropDownWrapper.appendChild(dropDownElement);
        } else {
            dropDownElement.appendChild(optionElement);
            dropDownWrapper.appendChild(dropDownElement);
        }
    });
    if (isPaymentMethod) {
        const addOption = createElement("div", {
            className: "drop-down-element add-option",
        });
        const addButton = createElement("button", {
            className: "add-button",
            textContent: "추가하기",
        });
        addButton.addEventListener("click", (e) => {
            e.stopPropagation();
            handleModalOpen();
        });
        addOption.appendChild(addButton);
        dropDownWrapper.appendChild(addOption);
    }
    return dropDownWrapper;
}
