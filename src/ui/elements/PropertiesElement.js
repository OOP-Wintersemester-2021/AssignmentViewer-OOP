/* eslint-env browser */

import AssignmentElement from "./AssignmentElement.js";

function addLink(el, link, label) {
    let linkEl = el.querySelector(".links"),
        newLinkEl = document.createElement("a");
    newLinkEl.innerHTML = label;
    newLinkEl.href = link;
    newLinkEl.classList.add("download");
    linkEl.append(newLinkEl);
}

function createLinkElement(link, label) {
    let newLinkEl = document.createElement("a");
    newLinkEl.innerHTML = label;
    newLinkEl.href = link;
    newLinkEl.classList.add("download");
    return newLinkEl;
}

class PropertiesElement extends AssignmentElement {

    constructor() {
        super(document.querySelector("#properties-element-template"));
    }

    render(assignment) {
        super.render();
        this.el.querySelector(".title").innerHTML = assignment.title;
        this.el.querySelector(".author").innerHTML = assignment.author;
        this.el.querySelector(".edit").innerHTML = assignment.getFormattedEditDate();
        this.el.querySelector(".abstract").innerHTML = assignment.abstract;
        this.el.querySelector(".links").append(createLinkElement(assignment.starter, "Startercode"));
        this.el.querySelector(".links").append(createLinkElement(assignment.solution, "Lösungsvorschlag"));
    }

}

export default PropertiesElement;