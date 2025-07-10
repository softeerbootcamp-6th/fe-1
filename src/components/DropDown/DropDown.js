import DropDownBlock from "./DropDownBlock.js";

function DropDown({ options, editable, id }) {
    return {
        element: `
            <select class="category-field" id="${id}">
                <option value="" disabled selected>선택하세요.</option>
                ${options.map(option => DropDownBlock({ id: option, value: option, editable }).element).join('')}
            </select>
        `
    }
}
export default DropDown;