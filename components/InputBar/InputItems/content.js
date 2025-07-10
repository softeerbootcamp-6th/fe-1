const MAX_LENGTH = 32;

const createContent = () => {
    const contentItem = document.createElement('div');
    contentItem.className = 'input-bar-item';
    contentItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="content" class="light-12">내용</label>
            <div class="content-length">
                <span class="light-12 content-length-count">0</span>
                <span class="light-12">/${MAX_LENGTH}</span>
            </div>
        </div>
        <div class="input-bar-item-wrapper">
            <input
                type="text"
                maxlength=${MAX_LENGTH}
                id="content"
                class="semibold-12"
                placeholder="입력하세요"
            />
        </div>
    `;

    const countContentLength = () => {
        const contentInput = contentItem.querySelector('#content');
        const countDisplay = contentItem.querySelector('.content-length-count');
        countDisplay.textContent = contentInput.value.length;
    };
    const contentInput = contentItem.querySelector('#content');
    contentInput.addEventListener('input', countContentLength);
    countContentLength();

    return contentItem;
};

export default createContent;
