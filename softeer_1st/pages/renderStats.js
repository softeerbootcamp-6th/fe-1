import { getMonthData } from "../api/api.js"
import { createElement } from "../utils/createElement.js";


export function renderStats(){
    const section = createElement("section", {
        className: "stats-page",
        id: "stats-page",
    });
    const donutGraphContainer = createElement("div", {
        className: "donut-graph-container",
    });
    
    return section
}