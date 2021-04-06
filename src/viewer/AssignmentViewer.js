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

function updateTableOfContents(el) {
    let title = el.querySelector(".content h1"),
        headings = el.querySelectorAll(".content h2"),
        tocEl = el.querySelector(".toc");
    tocEl.append(createEntryToTableOfContents(title, "Start"));
    for (let i = 0; i < headings.length; i++) {
        tocEl.append(createEntryToTableOfContents(headings[i]));
    }
}

function createEntryToTableOfContents(el, title) {
    let newEl = document.createElement("li");
    newEl.classList.add("entry");
    newEl.innerHTML = title || el.innerHTML;
    newEl.setAttribute("data-target-id", el.id);
    newEl.addEventListener("click", onEntryInTableOfContentsClicked);
    return newEl;
}

function onEntryInTableOfContentsClicked(event) {
    let targetEl = document.querySelector(`#${event.target.getAttribute("data-target-id")}`);
    targetEl.scrollIntoView({
        behavior: "smooth",
    });
}

function updateImageElements(el) {
    let images = el.querySelectorAll(".content p img");
    for (let i = 0; i < images.length; i++) {
        images[i].parentElement.nextElementSibling.classList.add("image-label");
    }
}

function enableLinkToTableOfContents() {
    let tocLink = document.querySelector(".toc-link");
    tocLink.addEventListener("click", () => document.querySelector(".toc-header").scrollIntoView());
}

class AssignmentViewer {

    constructor() {
        this.el = document.querySelector(".assignment-container");
    }

    render(assignment) {
        updateMetaInformation(this.el, assignment);
        updateContent(this.el, assignment);
        updateTableOfContents(this.el);
        updateImageElements(this.el);
        enableLinkToTableOfContents();
        addLink(this.el, assignment.starter, "Startercode");
        addLink(this.el, assignment.solution, "Lösungsvorschlag");
    }

}

export default new AssignmentViewer();