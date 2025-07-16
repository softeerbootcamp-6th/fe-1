export function findAfterIndexArray(array, key, value) {
    const index = array.findIndex(item => item[key] > value);
    return index;
}
