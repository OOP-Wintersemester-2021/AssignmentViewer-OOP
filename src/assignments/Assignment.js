/* eslint-env browser */

class Assignment {

    constructor(title, author, edit, abstract, content, starter, solution, toc) {
        this.title = title;
        this.author = author;
        this.edit = edit;
        this.abstract = abstract;
        this.content = content;
        this.starter = starter;
        this.solution = solution;
        this.toc = toc;
        Object.freeze(this);
    }

    getFormattedEditDate() {
        return this.edit.toLocaleString();
    }

}

export default Assignment;