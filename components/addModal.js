export function renderAddModal() {
  const addModal = document.createElement('div');
  addModal.className = 'add-modal';

  addModal.innerHTML = `
    <div class='modal-background'></div>
    <div class='modal-content'>
        <div class='modal-detail'>
        <span class='modal-description light16'>추가하실 결제 수단을 입력해주세요.</span>
        <input type='text' class='modal-input' />
        </div>
        <div class='modal-buttons'>
        <button class='cancel-button'>취소</button>
        <button class='add-payment-button'>추가</button>
        </div>
    </div>
    `;

  const cancelButton = addModal.querySelector('.cancel-button');

  cancelButton.addEventListener('click', () => {
    addModal.remove();
  });

  const addPaymentButton = addModal.querySelector('.add-payment-button');
  addPaymentButton.addEventListener('click', () => {
    const input = addModal.querySelector('.modal-input');
    const paymentName = input.value.trim();
    if (paymentName) {
      const editEvent = new CustomEvent('add-payment', {
        detail: {
          paymentName: paymentName,
        },
      });
      document.dispatchEvent(editEvent); // edit event 발생
      input.value = '';
      addModal.remove();
    }
  });

  return addModal;
}
