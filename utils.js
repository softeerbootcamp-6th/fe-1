export const createElement = (tag, attributes = {}, htmlString) => {
    const $wrapperElement = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        $wrapperElement.setAttribute(key, value);
    });

    $wrapperElement.innerHTML = htmlString;

    return $wrapperElement;
};
