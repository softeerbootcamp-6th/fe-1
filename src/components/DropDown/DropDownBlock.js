function DropDownBlock({ id, value, editable }) {
    return {
        element: `
            <li class="option-list flex-row" value="${value}">
                ${value}
                ${editable ? `<button class="icon-button" id="${id}"><img src="assets/icons/closed.svg" alt="edit icon"></button>` : ''}
            </li>
        `,
    }
}
export default DropDownBlock;