import { createElement } from "../utils/createElement.js";
import { DropDown } from "./dropDown.js";
import { openModal } from "./Modal.js";
import { dateStore } from "../store/dateStore.js";
import { postMonthData, putMonthData } from "../api/api.js";
import { eventBus } from "../utils/eventBus.js";

export function Form() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formState = {
        year: year,
        month: Number(month),
        date: Number(day),
        amount: null,
        type: "income",
        description: null,
        paymentMethod: null,
        category: null,
        isEdit: false,
        originalData: null,
    };
    function checkAvailability() {
        const isValid =
            formState.year &&
            formState.month &&
            formState.date &&
            formState.amount &&
            formState.type &&
            formState.description &&
            formState.paymentMethod &&
            formState.category;
        submitButton.disabled = !isValid;
        console.log("Form state:", formState);
        console.log("Form availability checked:", isValid);
    }
    function catchEditEvent(e) {
        const { date, amount, type, description, paymentMethod, category } =
            e.detail;
        const Eventyear = dateStore.year;
        const Eventmonth = dateStore.month;
        formState.year = Eventyear;
        formState.month = Eventmonth;
        formState.date = date;
        formState.amount = amount;
        formState.type = type;
        formState.description = description;
        formState.paymentMethod = paymentMethod;
        formState.category = category;
        formState.isEdit = true;
        formState.originalData = {
            Eventyear,
            Eventmonth,
            date,
            amount,
            type,
            description,
            paymentMethod,
            category,
        };
        document.querySelector("#date").value = `${Eventyear}-${String(
            Eventmonth
        ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
        document.querySelector("#costInput").value = amount.toLocaleString();
        document.querySelector("#description").value = description || "";
        document.querySelector("#paymentMethodInput").value =
            paymentMethod || "";
        document.querySelector("#categoryInput").value = category || "";
        isIncome = type === "income";
        updateType(isIncome);

        checkAvailability();
    }
    window.addEventListener("edit-event", catchEditEvent);
    let isIncome = true;
    let isPaymentMethodOpen = false;
    let isCategoryOpen = false;
    let currentPaymentDropdown = null;
    let currentCategoryDropdown = null;
    const paymentMethods = ["현금", "신용카드"];
    const costList = [
        "생활",
        "식비",
        "교통",
        "쇼핑/뷰티",
        "의료/건강",
        "문화/여가",
        "미분류",
    ];
    const incomeList = ["월급", "용돈", "기타수입"];

    const form = createElement("form", {
        className: "form",
    });
    form.classList.add("form");
    form.action = "";
    form.method = "POST";
    const date = createElement("div", {
        className: "form-components",
    });
    const dateInput = createElement("input", {
        id: "date",
        className: "form-date semibold-12",
        type: "date",
    });

    dateInput.value = `${year}-${month}-${day}`;
    dateInput.addEventListener("change", function (e) {
        const selectedDate = new Date(e.target.value);
        formState.year = selectedDate.getFullYear();
        formState.month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
        formState.date = selectedDate.getDate();
        console.log(
            "Selected date:",
            formState.year,
            formState.month,
            formState.date
        );
        checkAvailability();
    });

    const dateLabel = createElement("p", {
        textContent: "일자",
        className: "light-12",
    });
    date.appendChild(dateLabel);
    date.appendChild(dateInput);
    form.appendChild(date);
    const cost = createElement("div", {
        className: "form-components",
    });
    const costLabel = createElement("p", {
        textContent: "금액",
        className: "light-12",
    });
    const costWrapper = createElement("div", {
        className: "form-cost",
    });
    const costSign = createElement("span", {
        className: "form-cost-sign light-14",
        innerHTML: `<img src="../assets/icons/${
            isIncome ? "plus" : "minus"
        }.svg" alt="${isIncome ? "수입" : "지출"}">`,
    });
    const inputWrapper = createElement("div", {
        className: "form-cost-input-wrapper",
    });

    const costInput = createElement("input", {
        id: "costInput",
        className: "form-cost-input semibold-12",
        type: "text",
        placeholder: "0",
        maxLength: "10",
    });

    const costUnit = createElement("span", {
        className: "form-cost-unit light-14",
        textContent: "원",
    });

    inputWrapper.appendChild(costInput);
    inputWrapper.appendChild(costUnit);

    costWrapper.appendChild(costSign);
    costWrapper.appendChild(inputWrapper);
    cost.appendChild(costLabel);
    cost.appendChild(costWrapper);
    form.appendChild(cost);

    costInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value) {
            value = parseInt(value).toLocaleString();
        }
        e.target.value = value;
        formState.amount = value ? parseInt(value.replace(/,/g, "")) : null;
        checkAvailability();
    });

    costInput.addEventListener("keypress", function (e) {
        if (
            !/[0-9]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete"
        ) {
            e.preventDefault();
        }
    });
    costSign.addEventListener("click", function () {
        isIncome = !isIncome;
        updateType(isIncome);
    });
    function updateType(isIncome) {
        formState.type = isIncome ? "income" : "expense";
        costSign.innerHTML = `<img style="width:16px;height:16px" src="../assets/icons/${
            isIncome ? "plus" : "minus"
        }.svg" alt="${isIncome ? "수입" : "지출"}">`;
        updateCategoryDropdown();
        checkAvailability();
    }
    const description = createElement("div", {
        className: "form-components",
    });
    const descriptionWrapper = createElement("div", {
        className: "form-description flex justify-between align-center",
    });
    const descriptionLabel = createElement("p", {
        textContent: "설명",
        className: "light-12",
    });
    const descriptionLength = createElement("span", {
        className: "form-description-length light-12",
        textContent: "0/32",
    });
    descriptionWrapper.appendChild(descriptionLabel);
    descriptionWrapper.appendChild(descriptionLength);
    const descriptionInput = createElement("input", {
        id: "description",
        className: "form-description-input semibold-12",
        type: "text",
        placeholder: "입력하세요",
        maxLength: "32",
    });
    description.appendChild(descriptionWrapper);
    description.appendChild(descriptionInput);
    descriptionInput.addEventListener("input", function (e) {
        const value = e.target.value;
        descriptionLength.textContent = `${value.length}/32`;
        formState.description = value;
        console.log("Description:", formState.description);
        checkAvailability();
    });
    form.appendChild(description);
    const paymentMethod = createElement("div", {
        className: "form-components",
    });
    const paymentMethodLabel = createElement("p", {
        textContent: "결제수단",
        className: "light-12",
    });
    const paymentMethodDropdown = createElement("button", {
        className:
            "form-payment-method semibold-12 relative flex justify-between",
    });
    paymentMethodDropdown.type = "button";
    const paymentMethodInput = createElement("input", {
        className: "form-payment-method-text semibold-12",
        placeholder: "선택하세요",
        type: "text",
        id: "paymentMethodInput",
        readOnly: true,
    });
    paymentMethodDropdown.appendChild(paymentMethodInput);
    const paymentDropdownIcon = createElement("img", {
        className: "form-payment-method-icon",
        src: "../assets/icons/chevron-down.svg",
    });
    paymentMethodDropdown.appendChild(paymentDropdownIcon);
    paymentMethod.appendChild(paymentMethodLabel);
    paymentMethod.appendChild(paymentMethodDropdown);

    // Form.js의 createDropDown 함수 수정
    function createDropDown(type) {
        const dropDownWrapper = createElement("div", {
            className: "drop-down-wrapper open",
        });

        let options = [];
        let isOpen = false;
        let inputElement = null;
        let formStateKey = null;

        // 타입에 따라 옵션과 설정 결정
        switch (type) {
            case "payment":
                options = paymentMethods;
                isOpen = isPaymentMethodOpen;
                inputElement = paymentMethodInput;
                formStateKey = "paymentMethod";
                break;
            case "category":
                options = isIncome ? incomeList : costList;
                isOpen = isCategoryOpen;
                inputElement = categoryInput;
                formStateKey = "category";
                break;
            default:
                options = [];
        }

        options.forEach((option, index) => {
            const dropDownElement = createElement("div", {
                className: "drop-down-element",
            });
            const optionElement = createElement("button", {
                textContent: option,
                type: "button",
                className: "option-button light-12",
            });

            optionElement.addEventListener("click", (e) => {
                e.stopPropagation();
                inputElement.value = option;
                formState[formStateKey] = option;
                console.log(formStateKey, "selected:", formState.paymentMethod);
                checkAvailability();

                // 해당 드롭다운 닫기
                if (type === "payment") {
                    togglePaymentDropdown(false);
                } else if (type === "category") {
                    toggleCategoryDropdown(false);
                }

                console.log("Selected:", option);
            });

            dropDownElement.appendChild(optionElement);

            // 결제수단인 경우에만 삭제 버튼 추가
            if (type === "payment") {
                const deleteButton = createElement("button", {
                    className: "delete-button",
                    innerHTML: `<img src="../assets/icons/closed-red.svg" alt="삭제">`,
                    type: "button",
                });

                deleteButton.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    const isConfirmed = await confirmModal(option);
                    if (isConfirmed) {
                        const deleteIndex = paymentMethods.indexOf(option);
                        if (deleteIndex > -1) {
                            paymentMethods.splice(deleteIndex, 1);

                            if (formState.paymentMethod === option) {
                                paymentMethodInput.value = "";
                                formState.paymentMethod = null;
                            }

                            updatePaymentDropdown();
                            checkAvailability();
                        }
                    }
                });

                dropDownElement.appendChild(deleteButton);
            }

            dropDownWrapper.appendChild(dropDownElement);
        });

        // 결제수단인 경우에만 추가하기 버튼
        if (type === "payment") {
            const addOption = createElement("div", {
                className: "drop-down-element add-option",
            });
            const addButton = createElement("button", {
                className: "add-button light-12",
                textContent: "추가하기",
                type: "button",
            });

            addButton.addEventListener("click", (e) => {
                e.stopPropagation();
                togglePaymentDropdown(false);
                openPaymentModal();
                checkAvailability();
            });

            addOption.appendChild(addButton);
            dropDownWrapper.appendChild(addOption);
        }

        return dropDownWrapper;
    }
    const togglePaymentDropdown = (forceOpen = null) => {
        isPaymentMethodOpen =
            forceOpen !== null ? forceOpen : !isPaymentMethodOpen;

        // 분류 드롭다운이 열려있으면 닫기
        if (isPaymentMethodOpen && isCategoryOpen) {
            toggleCategoryDropdown(false);
        }

        paymentMethodDropdown.classList.toggle("open", isPaymentMethodOpen);
        paymentDropdownIcon.style.transform = isPaymentMethodOpen
            ? "rotate(180deg)"
            : "rotate(0deg)";
        if (isPaymentMethodOpen) {
            if (currentPaymentDropdown && currentPaymentDropdown.parentNode) {
                currentPaymentDropdown.remove();
            }
            currentPaymentDropdown = createDropDown("payment");
            paymentMethod.appendChild(currentPaymentDropdown);
        } else {
            if (currentPaymentDropdown && currentPaymentDropdown.parentNode) {
                currentPaymentDropdown.remove();
                currentPaymentDropdown = null;
            }
        }
    };
    const toggleCategoryDropdown = (forceOpen = null) => {
        isCategoryOpen = forceOpen !== null ? forceOpen : !isCategoryOpen;

        // 결제수단 드롭다운이 열려있으면 닫기
        if (isCategoryOpen && isPaymentMethodOpen) {
            togglePaymentDropdown(false);
        }

        categoryDropdown.classList.toggle("open", isCategoryOpen);
        categoryIcon.style.transform = isCategoryOpen
            ? "rotate(180deg)"
            : "rotate(0deg)";

        if (isCategoryOpen) {
            if (currentCategoryDropdown && currentCategoryDropdown.parentNode) {
                currentCategoryDropdown.remove();
            }
            currentCategoryDropdown = createDropDown("category");
            category.appendChild(currentCategoryDropdown);
        } else {
            if (currentCategoryDropdown && currentCategoryDropdown.parentNode) {
                currentCategoryDropdown.remove();
                currentCategoryDropdown = null;
            }
        }
    };
    function updatePaymentDropdown() {
        if (isPaymentMethodOpen) {
            if (currentPaymentDropdown && currentPaymentDropdown.parentNode) {
                currentPaymentDropdown.remove();
            }
            currentPaymentDropdown = createDropDown("payment");
            paymentMethod.appendChild(currentPaymentDropdown);
            checkAvailability();
        }
    }

    // 분류 드롭다운 업데이트 (수입/지출 변경 시)
    function updateCategoryDropdown() {
        if (isCategoryOpen) {
            if (currentCategoryDropdown && currentCategoryDropdown.parentNode) {
                currentCategoryDropdown.remove();
            }
            currentCategoryDropdown = createDropDown("category");
            category.appendChild(currentCategoryDropdown);
            checkAvailability();
        }
        // 현재 선택된 분류가 새 목록에 없으면 초기화
        const currentOptions = isIncome ? incomeList : costList;
        if (
            formState.category &&
            !currentOptions.includes(formState.category)
        ) {
            categoryInput.value = "";
            formState.category = null;
        }
    }

    // 결제수단 추가 모달
    async function openPaymentModal() {
        const newPaymentMethod = await addFeatureModal();
        console.log("New payment method:", newPaymentMethod);
        if (newPaymentMethod && newPaymentMethod.trim()) {
            const trimmedMethod = newPaymentMethod.trim();

            // 중복 체크
            if (paymentMethods.includes(trimmedMethod)) {
                alert("이미 존재하는 결제수단입니다.");
                return;
            }

            // 새 결제수단 추가
            paymentMethods.push(trimmedMethod);
            paymentMethodInput.value = trimmedMethod;
            formState.paymentMethod = trimmedMethod;

            console.log("Added new payment method:", trimmedMethod);
            console.log("Current methods:", paymentMethods);
        }
    }

    // 이벤트 리스너
    paymentMethodDropdown.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePaymentDropdown();
        checkAvailability();
    });

    form.appendChild(paymentMethod);
    const category = createElement("div", {
        className: "form-components",
    });
    const categoryLabel = createElement("p", {
        textContent: "분류",
        className: "light-12",
    });
    const categoryDropdown = createElement("button", {
        className: "form-category semibold-12 flex justify-between",
    });
    categoryDropdown.type = "button";
    const categoryInput = createElement("input", {
        className: "form-category-text semibold-12",
        placeholder: "선택하세요",
        type: "text",
        id: "categoryInput",
        readOnly: true,
    });
    categoryDropdown.appendChild(categoryInput);
    const categoryIcon = createElement("img", {
        className: "form-category-icon",
        src: "../assets/icons/chevron-down.svg",
    });
    categoryDropdown.appendChild(categoryIcon);
    category.appendChild(categoryLabel);
    category.appendChild(categoryDropdown);
    categoryDropdown.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCategoryDropdown();
    });
    form.appendChild(category);

    document.addEventListener("click", (e) => {
        if (!paymentMethod.contains(e.target)) {
            togglePaymentDropdown(false);
        }
        if (!category.contains(e.target)) {
            toggleCategoryDropdown(false);
        }
    });
    const submitButton = createElement("button", {
        className: "form-submit-button semibold-12",
        id: "submitButton",
        type: "submit",
        innerHTML: `<img src="../assets/icons/check-white.svg" alt="제출">`,
    });
    submitButton.disabled = true;

    form.appendChild(submitButton);
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!submitButton.disabled) {
            await sendRequest(formState);
            //input 초기화
            document.querySelector("#date").value = `${year}-${month}-${day}`;
            document.querySelector("#costInput").value = "";
            document.querySelector("#description").value = "";
            document.querySelector("#paymentMethodInput").value = "";
            document.querySelector("#categoryInput").value = "";
            formState.year = year;
            formState.month = Number(month);
            formState.date = Number(day);
            formState.amount = null;
            formState.type = "income";
            formState.description = null;
            formState.paymentMethod = null;
            formState.category = null;
            formState.isEdit = false;
            formState.originalData = null;
            isIncome = true;
        }
    });

    return form;
}

const confirmModal = (message) => {
    console.log("Confirm modal opened with message:", message);
    return new Promise((resolve, reject) => {
        openModal({
            title: "해당 결제 수단을 삭제하시겠습니까?",
            content: `<input type="text" placeholder='${message}' id="confirmInput" disabled>`,
            isDelete: true,
            onClick: () => {
                resolve(true);
            },
        });
    });
};
const addFeatureModal = () => {
    return new Promise((resolve, reject) => {
        openModal({
            title: "추가하실 결제수단을 입력해주세요.",
            content: `<input type="text" placeholder='현대카드' id="add">`,
            isDelete: false,
            onClick: () => {
                const input = document.getElementById("add");
                const newPaymentMethod = input.value.trim();
                if (!newPaymentMethod) {
                    alert("결제수단을 입력해주세요.");
                    return;
                }
                resolve(newPaymentMethod);
            },
        });
    });
};

function sendRequest(formState) {
    const body = formState.isEdit
        ? {
              year: formState.year,
              month: formState.month,
              date: formState.date,
              amount: formState.amount,
              type: formState.type,
              description: formState.description,
              paymentMethod: formState.paymentMethod,
              category: formState.category,
              originalData: formState.originalData,
          }
        : {
              year: formState.year,
              month: formState.month,
              date: formState.date,
              amount: formState.amount,
              type: formState.type,
              description: formState.description,
              paymentMethod: formState.paymentMethod,
              category: formState.category,
          };
    if (formState.isEdit) {
        return putMonthData(body)
            .then(() => {
                alert("내역이 수정되었습니다.");
                // 페이지 새로고침 대신 이벤트 발생
                eventBus.emit("data-updated", {
                    type: "update",
                    year: formState.year,
                    month: formState.month,
                });
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                alert("내역 수정에 실패했습니다. 다시 시도해주세요.");
            });
    } else {
        return postMonthData(body)
            .then(() => {
                alert("내역이 추가되었습니다.");
                // 페이지 새로고침 대신 이벤트 발생
                eventBus.emit("data-updated", {
                    type: "create",
                    year: formState.year,
                    month: formState.month,
                });
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                alert("내역 추가에 실패했습니다. 다시 시도해주세요.");
            });
    }
}
