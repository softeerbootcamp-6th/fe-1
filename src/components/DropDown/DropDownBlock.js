function DropDownBlock({id, value, editable}) {
    return{
        element: `
            <option value="${value}">${value}</option>
        `,
    }
}
export default DropDownBlock;