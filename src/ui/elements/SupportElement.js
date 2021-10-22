/* eslint-env browser */

import AssignmentElement from "./AssignmentElement.js";

class SupportElement extends AssignmentElement {

    constructor() {
        super(document.querySelector("#support-element-template"));
    }

    render(assignment) {
        super.render();
        /*
        let tocEl = this.el.querySelector(".toc-list");
        for (let i = 0; i < assignment.toc.length; i++) {
            let newTocEntry = createEntryToTableOfContents(assignment.toc[i]);
            tocEl.append(newTocEntry);
        }*/
    }

    reset() {
        super.reset();
    }

}


export default SupportElement;