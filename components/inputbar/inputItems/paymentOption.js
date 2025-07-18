import formData from '../../../store/formData.js';
import { createElement } from '../../../utils.js';
import payment from '../../../store/payment.js';
import renderModal from '../../modal/index.js';

function createPaymentOptionList(items) {
    return `
        ${items
            .map(
                (item) => `<li id="payment-line" data-value="${item}">
                        <span id="payment-value" class="lt-12">${item}</span>
                        <button id="payment-delete-btn">
                            <img src="/public/red-closed.svg" />
                        </button>
                    </li>`,
            )
            .join('')}
            <li id="payment-line">
                <button id="payment-add-button">
                    <span class="lt-12" >추가하기</span>
                </button>
            </li>
            `;
}

export default function createPayemntInputOption() {
    const $paymentOptionItemInnerHtml = createPaymentOptionList(payment.data);

    const $paymentOptionItem = createElement(
        'ul',
        {
            id: 'dropdown-List-payment',
            class: 'dropdown-list-payment',
        },
        $paymentOptionItemInnerHtml,
    );

    $paymentOptionItem
        .querySelector('#payment-add-button')
        .addEventListener('click', (e) => {
            createElement('div', { class: 'title' });
            renderModal(createAddPaymetModalContent());
        });

    $paymentOptionItem.addEventListener('click', (e) => {
        const $targetLine = e.target.closest('#payment-line');
        const $deleteBtn = e.target.closest('#payment-delete-btn');

        if ($deleteBtn) {
            const targetString =
                $targetLine.querySelector('#payment-value').textContent;
            renderModal(createDeletePaymetModalContent(targetString));
            e.stopPropagation();
            return;
        }

        const selectedPayment = $targetLine.getAttribute('data-value');

        const $dropdownList = document.getElementById('dropdown-List-payment');
        const $background = $dropdownList.nextElementSibling;

        $dropdownList.remove();
        $background.remove();
        if (!selectedPayment) return;
        document.getElementById('dropdown-toggle-payment').textContent =
            selectedPayment;
        formData.setPayment(selectedPayment);
    });

    return $paymentOptionItem;
}

const addModalConentHTML = `
    <div class="modal-content-wrapper">    
        <div>추가 하실 결제수단을 입력해주세요.</div>
        <input id="payment-modal-input" type="text" />
    </div>
    <div class="modal-btn-wrapper">
        <button id="payment-modal-cancel-button" class="sb-16">취소</button>
        <button id="payment-modal-add-button" class="sb-16">추가</button>
    </div>`;

function createAddPaymetModalContent() {
    const $paymentModal = createElement(
        'div',
        { class: 'modal-content' },
        addModalConentHTML,
    );

    $paymentModal
        .querySelector('#payment-modal-add-button')
        .addEventListener('click', () => {
            payment.addPayment(
                $paymentModal.querySelector('#payment-modal-input').value,
            );
            document.getElementById('root-modal').innerHTML = '';
        });

    $paymentModal
        .querySelector('#payment-modal-cancel-button')
        .addEventListener('click', () => {
            document.getElementById('root-modal').innerHTML = '';
        });

    return $paymentModal;
}

function deleteModalConentHTML(target) {
    return `
    <div class="modal-content-wrapper">    
        <div>해당 결제 수단을 삭제하시겠습니까?</div>
        <span class="delete-modal-value">${target}</span>
    </div>
    <div class="modal-btn-wrapper">
        <button id="payment-modal-cancel-button" class="sb-16">취소</button>
        <button id="payment-modal-delete-button" class="sb-16">삭제</button>
    </div>`;
}

function createDeletePaymetModalContent(target) {
    const $paymentModal = createElement(
        'div',
        { class: 'modal-content' },
        deleteModalConentHTML(target),
    );

    $paymentModal
        .querySelector('#payment-modal-cancel-button')
        .addEventListener('click', () => {
            document.getElementById('root-modal').innerHTML = '';
        });

    $paymentModal
        .querySelector('#payment-modal-delete-button')
        .addEventListener('click', () => {
            const nowPayment = payment.filterByValue(target);
            document.getElementById('dropdown-List-payment').innerHTML =
                createPaymentOptionList(nowPayment);
            document.getElementById('root-modal').innerHTML = '';
        });

    return $paymentModal;
}
