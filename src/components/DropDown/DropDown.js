import DropDownBlock from "./DropDownBlock.js";

function DropDown({ options, editable, id }) {
    return {
        element: `
            <select class="category-field" id="${id}">
                <option value="" disabled selected>선택하세요.</option>
                ${options.map(option => DropDownBlock({ id: option, value: option, editable }).element).join('')}
                ${editable ? `<option value="기타">추가하기</option>` : ''}
            </select>
        `
    }
}
export default DropDown;