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

function updateTableOfContents(el, toc) {
    let tocEl = el.querySelector(".toc");
    for (let i = 0; i < toc.length; i++) {
        let newTocEntry = createEntryToTableOfContents(toc[i]);
        tocEl.append(newTocEntry);
    }
}

function createEntryToTableOfContents(entry) {
    let newEl = document.createElement("li");
    newEl.classList.add("entry");
    newEl.innerHTML = entry.label;
    newEl.setAttribute("data-target-id", entry.id);
    newEl.addEventListener("click", (event) => {
        let targetEl = document.querySelector(`#${event.target.getAttribute("data-target-id")}`);
        targetEl.scrollIntoView({
            behavior: "smooth",
        });
    });
    return newEl;
}

function enableLinkToTableOfContents() {
    let tocLink = document.querySelector(".toc-link");
    tocLink.addEventListener("click", () => document.querySelector(".toc-header").scrollIntoView());
}

class AssignmentViewer {

    constructor() {
        this.el = document.querySelector(".assignment-container");
        enableLinkToTableOfContents();
    }

    render(assignment) {
        this.reset();
        updateMetaInformation(this.el, assignment);
        updateContent(this.el, assignment);
        updateTableOfContents(this.el, assignment.toc);
        addLink(this.el, assignment.starter, "Startercode");
        addLink(this.el, assignment.solution, "Lösungsvorschlag");
        hljs.highlightAll();
    }

    reset() {
        this.el.querySelector(".content").innerHTML = "";
        this.el.querySelector(".toc").innerHTML = "";
        this.el.querySelector(".links").innerHTML = "";
    }

}

export default new AssignmentViewer();