const createContent = () => {
    const contentItem = document.createElement('div');
    contentItem.className = 'input-bar-item';
    contentItem.innerHTML = `
        <div class="input-bar-item-wrapper">
            <label for="content" class="light-12">내용</label>
            <div class="content-length">
                <span class="light-12 content-length-count">0</span>
                <span class="light-12">/32</span>
            </div>
        </div>
        <div class="input-bar-item-wrapper">
            <input
                type="text"
                maxlength="32"
                id="content"
                class="semibold-12"
                placeholder="입력하세요"
            />
        </div>
    `;

    return contentItem;
};

export default createContent;
