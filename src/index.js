import { createContentInput } from "./ContentInput.js";
import { createHeader } from "./Header.js";

export function createAppLayout() {

    const container = document.getElementById('app');

    const header = createHeader();
    const content = createContentInput();
   
    container.append(header, content);
    return container;
}

createAppLayout();