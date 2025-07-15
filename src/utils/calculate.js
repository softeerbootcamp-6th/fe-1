export function calculateTotal(array, field) {
    let total = 0;
    total = array.reduce((sum, item) => {
        return sum + (item[field] || 0);
    }, 0);
    return total;
}

export function calculateFieldLength(array, field) {
    let total = 0;
    total = array.reduce((sum, item) => {
        return sum + (item[field]?.length || 0);
    }, 0);
    return total;
}