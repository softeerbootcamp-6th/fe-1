const MAX_LENGTH = 32;

const createDescription = () => {
    const descriptionItem = document.createElement('div');
    descriptionItem.className = 'input-bar-item';
    descriptionItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="description" class="light-12">내용</label>
            <div class="description-length">
                <span class="light-12 description-length-count">0</span>
                <span class="light-12">/${MAX_LENGTH}</span>
            </div>
        </div>
        <div class="input-bar-item-wrapper">
            <input
                type="text"
                maxlength=${MAX_LENGTH}
                id="description"
                name="description"
                class="semibold-12"
                placeholder="입력하세요"
            />
        </div>
    `;

    const countDescriptionLength = () => {
        const descriptionInput = descriptionItem.querySelector('#description');
        const countDisplay = descriptionItem.querySelector(
            '.description-length-count'
        );
        countDisplay.textContent = descriptionInput.value.length;
    };
    const descriptionInput = descriptionItem.querySelector('#description');
    descriptionInput.addEventListener('input', countDescriptionLength);
    countDescriptionLength();

    descriptionItem.reset = () => {
        descriptionInput.value = '';
        countDescriptionLength();
    };

    descriptionItem.validate = () => {
        return descriptionInput.value.trim().length > 0;
    };

    descriptionItem.setValue = (value) => {
        descriptionInput.value = value;
        countDescriptionLength();
        descriptionInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    return descriptionItem;
};

export default createDescription;
