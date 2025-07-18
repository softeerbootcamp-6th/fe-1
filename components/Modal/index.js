const createModal = ({
    content,
    cancelText = '취소',
    okText,
    onCancel,
    onOk,
    okTextColor = 'var(--neutral-text-default)',
    cancelTextColor = 'var(--neutral-text-weak)',
}) => {
    const modalBackground = document.createElement('div');
    modalBackground.className = 'modal-background';

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
        <div class="modal-button-container">
            <button class="modal-button semibold-16 cancel-button" style="color: ${cancelTextColor}">
                ${cancelText}
            </button>
            <button class="modal-button semibold-16 ok-button" style="color: ${okTextColor}">
                ${okText}
            </button>
        </div>
    `;

    function openModal() {
        document.body.appendChild(modalBackground);
        document.body.appendChild(modalContainer);
    }

    function closeModal() {
        modalBackground.remove();
        modalContainer.remove();
    }

    const cancelButton = modalContainer.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
        closeModal();
        onCancel?.();
    });

    const okButton = modalContainer.querySelector('.ok-button');
    okButton.addEventListener('click', () => {
        closeModal();
        onOk?.();
    });

    modalBackground.addEventListener('click', closeModal);

    modalContainer.open = openModal;

    return modalContainer;
};

export default createModal;
