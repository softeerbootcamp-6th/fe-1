function InputBar() {
    return {
        element: `
            <div class="input-bar">
                <input type="text" class="input-field" placeholder="항목을 입력하세요">
                <input type="number" class="amount-field" placeholder="금액을 입력하세요">
                <button class="add-button">추가</button>
            </div>
        `,
    }
}
export default InputBar;