/* eslint-env browser */

import ContentElement from "./elements/ContentElement.js";
import PropertiesElement from "./elements/PropertiesElement.js";
import TableOfContents from "./elements/TableOfContents.js";

class AssignmentViewer {

    constructor() {
        let assignmentContainer = document.querySelector(".assignment-container"),
            leftSidebarElement = document.querySelector(".sidebar-left");
        this.contentElement = new ContentElement();
        this.propertiesElement = new PropertiesElement();
        this.tableOfContents = new TableOfContents();
        this.contentElement.hide();
        this.propertiesElement.hide();
        this.tableOfContents.hide();
        this.contentElement.appendTo(assignmentContainer);
        this.propertiesElement.appendTo(leftSidebarElement);
        this.tableOfContents.appendTo(leftSidebarElement);
    }

    render(assignment) {
        this.contentElement.render(assignment);
        this.propertiesElement.render(assignment);
        this.tableOfContents.render(assignment);
        this.contentElement.show();
        this.propertiesElement.show();
        this.tableOfContents.show();
    }

}

export default new AssignmentViewer();