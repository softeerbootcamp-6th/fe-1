import DropDownBlock from "./DropDownBlock.js";

function DropDown({ options, editable, id }) {
    let isOpen = false;
    return {
        element: `
            <div class="category-field" id="${id}">
                <div class="selected flex-row">
                    <div class="selected-value">선택하세요</div>
                    <div class="arrow">
                        <img src="assets/icons/chevron-down.svg" alt="arrow" />
                    </div>
                </div>
                <ul class="dropdown-block-container" style="display: none;">
                    ${options.map(option => DropDownBlock({ id: option, value: option, editable }).element).join('')}
                    ${editable ? `<li class="option-list flex-row" value="기타">추가하기</li>` : ''}
                </ul>
            </div>
        `
        ,
        init: () => {
            const dropdown = document.getElementById(id);
            const selectedValue = dropdown.querySelector('.selected');
            const dropdownList = dropdown.querySelector('.dropdown-block-container');

            selectedValue.addEventListener('click', () => {
                isOpen = !isOpen;
                if (isOpen) {
                    dropdownList.style.display = 'block';
                    selectedValue.classList.add('rotate');
                } else {
                    dropdownList.style.display = 'none';
                    selectedValue.classList.remove('rotate');
                }
            });

            dropdownList.addEventListener('click', (event) => {
                if (event.target.classList.contains('option-list')) {
                    const selectedText = selectedValue.querySelector('.selected-value');
                    selectedText.textContent = event.target.textContent.trim();
                    dropdown.value = event.target.textContent.trim();

                    selectedText.style.color = '#000';
                    dropdownList.style.display = 'none';

                }
            });
        }
    }
}
export default DropDown;