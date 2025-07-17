import { createElement } from '../../utils.js';

export default function renderModal(mainElement, footerElement) {
    const $modal = createElement('div', { class: 'modal' }, [
        mainElement,
        footerElement,
    ]);

    const $rootModal = document.querySelector('#root-modal');

    const $modalWithBackground = createElement(
        'div',
        { class: 'modal-background' },
        $modal,
    );

    $rootModal.appendChild($modalWithBackground);
    $rootModal.addEventListener('click', (e) => {
        const $modal = e.target.closest('.modal');
        if (!$modal) $rootModal.innerHTML = '';
        e.stopPropagation();
    });
}
