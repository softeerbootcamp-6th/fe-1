function TagBox({ value }) {
    return {
        element: `
            <div class="tag-box">
                <span class="tag">${value}</span>
            </div>
        `
    };
}

export default TagBox;
