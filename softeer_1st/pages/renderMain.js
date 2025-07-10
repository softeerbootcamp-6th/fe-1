import {Form} from "../components/Form.js"

export function renderMain(){
    const section = document.createElement('section')
    const form = Form()
    section.appendChild(form)
    return section
}