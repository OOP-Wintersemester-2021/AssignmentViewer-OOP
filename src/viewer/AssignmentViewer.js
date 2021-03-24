/* eslint-env browser */

function updateMetaInformation(el, assignment) {
    let metaEl = el.querySelector(".meta");
    metaEl.querySelector(".title").innerHTML = assignment.title;
    metaEl.querySelector(".author").innerHTML = assignment.author;
    metaEl.querySelector(".edit").innerHTML = assignment.getFormattedEditDate();
    metaEl.querySelector(".abstract").innerHTML = assignment.abstract;
}

function updateContent(el, assignment) {
    let contentEl = el.querySelector(".content");
    contentEl.innerHTML = assignment.content;
}

function addLink(el, link, label) {
    let linkEl = el.querySelector(".links"),
        newLinkEl = document.createElement("a");
    newLinkEl.innerHTML = label;
    newLinkEl.href = link;
    newLinkEl.classList.add("download");
    linkEl.append(newLinkEl);
}

class AssignmentViewer {

    constructor() {
        this.el = document.querySelector(".assignment-container");
    }

    render(assignment) {
        updateMetaInformation(this.el, assignment);
        updateContent(this.el, assignment);
        addLink(this.el, assignment.starter, "Startercode");
        addLink(this.el, assignment.solution, "Lösungsvorschlag");
    }

}

export default new AssignmentViewer();