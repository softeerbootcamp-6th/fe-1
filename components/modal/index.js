import { createElement } from '../../utils.js';

export default function renderModal(content) {
    const $modal = createElement('div', { class: 'modal' }, content);
    const $modalBackground = createElement('div', { class: 'block' }, '');

    const $rootModal = document.querySelector('#root-modal');

    $rootModal.appendChild($modal);
    $rootModal.appendChild($modalBackground);

    $rootModal.addEventListener('click', (e) => {
        const $modal = e.target.closest('.modal');
        if (!$modal) $rootModal.innerHTML = '';
        e.stopPropagation();
    });
}
