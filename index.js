import createHeader from './components/Header/index.js';

const init = () => {
    const header = createHeader();

    document.body.appendChild(header);
};

init();
