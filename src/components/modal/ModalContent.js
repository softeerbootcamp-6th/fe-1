import { loadCSS } from "../../utils/cssLoader.js";
const titleMap = {
    'add': '추가하실 결제 수단을 입력해주세요.',
    'deletePayment': '해당 결제 수단을 삭제하시겠습니까?',
    'deleteBlock': '해당 내역을 삭제하시겠습니까?',
};

function ModalContent({ readonly, type, value, onChange }) {

    loadCSS('./src/components/modal/Modal.css', 'modal-css');
    const textFiledContent = `
        <div class="modal-text-field flex-column">
            <textarea class="modal-text-area" ${readonly ? 'readonly' : ''}>${value}</textarea>
        </div>
    `;

    const textContent = `
        <div class="modal-text-field">
            <span>${value}</span>
        </div>
    `;
    return {
        element: `
            <div class="modal-content">
                <span class="modal-title">${titleMap[type]}</span>
                ${type === 'add' || type === 'deletePayment' ? textFiledContent : textContent}
            </div>
        `,
        init: () => {
            console.log('ModalContent initialized with type:', type, 'and value:', value);
            if (type !== 'deleteBlock') {
                const textArea = document.querySelector('.modal-text-area');

                if (type === 'add') {
                    textArea.addEventListener('input', (event) => {
                        onChange(event.target.value);
                    });
                }
            }
        }
    }
};
export default ModalContent;