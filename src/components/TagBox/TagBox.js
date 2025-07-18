const COLOR = {
    '생활': '#A7B9E9',
    '문화/여가': '#BDA6E1',
    '미분류': '#F0B0D3',
    '교통': '#7DB7BF',
    '식비': '#C5E0EB',
    '의료/건강': '#BCDFD3',
    '용돈': '#AACD7E',
    '기타 수입': '#A28878',
    '쇼핑/뷰티': '#D7CA6B',
    '월급': '#E39D5D',
};
// by. bobob0311

function TagBox({ value }) {
    return {
        element: `
            <div class="tag-box" style="background-color: ${COLOR[value] || '#E0E0E0'}">
                <span class="tag">${value}</span>
            </div>
        `
    };
}

export default TagBox;
