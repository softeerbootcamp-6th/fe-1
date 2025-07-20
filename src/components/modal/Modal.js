import { loadCSS } from "../../utils/cssLoader.js";
import ModalContent from "./ModalContent.js";

function Modal({ type, value, callback }) {
    loadCSS('./src/components/modal/Modal.css', 'modal-css');

    return {
        element: `
            <div class="modal">
                <div class="modal-container flex-column">

                    ${ModalContent({ readonly: type === 'deletePayment', type, value, onChange: (newValue) => value = newValue }).element}

                    <div class="modal-footer flex-row">
                        <button class="modal-button close-button">취소</button>
                        <button class="modal-button confirm-button">${type === 'add' ? '추가' : '삭제'}</button>
                    </div>
                </div>
            </div>
        `,
        init: () => {
            console.log('Modal initialized with type:', type, 'and value:', value);
            ModalContent({ readonly: type === 'deletePayment', type, value, onChange: (newValue) => value = newValue }).init();

            const modal = document.querySelector('.modal');
            const closeButton = modal.querySelector('.close-button');

            // 모달 닫기 버튼 이벤트
            closeButton.addEventListener('click', () => {
                console.log('Modal closed');
                modal.style.display = 'none';
            });

            // 모달 표시
            modal.style.display = 'block';

            // 확인 버튼 이벤트
            const confirmButton = modal.querySelector('.confirm-button');
            confirmButton.addEventListener('click', () => {
                callback(type, value);
                modal.style.display = 'none';
            });

            // 모달 내용 설정
            const modalContent = modal.querySelector('.modal-content');
            if (type === 'add') {
                modalContent.innerHTML = `<p>${value}</p>`;
            } else if (type === 'delete') {
                modalContent.innerHTML = `<p class="error">${value}</p>`;
            }
        }
    }
};

export default Modal;