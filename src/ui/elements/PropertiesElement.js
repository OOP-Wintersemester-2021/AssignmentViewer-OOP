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

    constructor(pdfDownloader) {
        super(document.querySelector("#properties-element-template"));
        this.pdfDownloader = pdfDownloader;
    }

    render(assignment) {
        super.render();
        this.el.querySelector(".title").innerHTML = assignment.title;
        this.el.querySelector(".author").innerHTML = assignment.author;
        this.el.querySelector(".edit").innerHTML = assignment.getFormattedEditDate();
        this.el.querySelector(".abstract").innerHTML = assignment.abstract;
        if (assignment.starter !== undefined) {
            this.el.querySelector(".links").append(createLinkElement(assignment.starter, "Startercode"));
        }
        if (assignment.starter !== undefined) {
            let solutionAvailableOnDate = Date.parse(assignment.solutionAvailableOn),
                now = new Date();
            if (now >= solutionAvailableOnDate) {
                this.el.querySelector(".links").append(createLinkElement(assignment.solution, "Lösungsvorschlag"));
            }
        }
        if (this.el.querySelector(".links").childNodes.length === 0) {
            this.el.querySelector(".links").previousElementSibling.remove();
        }
        document.querySelector(".download-pdf").addEventListener("click", () => this.pdfDownloader.download());
    }

}

export default PropertiesElement;