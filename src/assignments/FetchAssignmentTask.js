/* eslint-env browser */

import Assignment from "./Assignment.js";

const URL_TEMPLATE = "https://raw.githubusercontent.com/$ORGANIZATION/$REPO/assignment-viewer-test/",
    DOWNLOAD_URL_TEMPLATE = "https://github.com/$ORGANIZATION/$REPO/archive/refs/heads/",
    GET_COMMITS_URL_TEMPLATE = "https://api.github.com/repos/$ORGANIZATION/$REPO/commits?sha=assignment-viewer-test",
    CONFIG_FILE_NAME = "assignment.json",
    README_FILE_NAME = "Readme.md",
    STARTER_CODE_ARCHIVE = "starter.zip",
    SOLUTION_CODE_ARCHIVE = "solution.zip",
    markdownConverter = new showdown.Converter();

function createBaseURL(task) {
    return URL_TEMPLATE.replace("$ORGANIZATION", task.organization).replace("$REPO", task.repo);
}

function createConfigURL(task) {
    return createBaseURL(task) + CONFIG_FILE_NAME;
}

function createReadmeURL(task) {
    return createBaseURL(task) + README_FILE_NAME;
}

function createBaseDownloadURL(task) {
    return DOWNLOAD_URL_TEMPLATE.replace("$ORGANIZATION", task.organization).replace("$REPO", task.repo);
}

function createStarterCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + STARTER_CODE_ARCHIVE;
}

function createSolutionCodeDownloadURL(task) {
    return createBaseDownloadURL(task) + SOLUTION_CODE_ARCHIVE;
}

function createCommitsURL(task) {
    return GET_COMMITS_URL_TEMPLATE.replace("$ORGANIZATION", task.organization).replace("$REPO", task.repo);
}

function fixRelativeLinksInHTML(url, html) {
    return html.replaceAll("img src=\"./", `img src=\"${url}`);

}

function extractLatestCommit(commits) {
    return {
        author: commits[0].commit.author.name,
        date: new Date(commits[0].commit.author.date)
    };
}

async function fetchFileAsText(url) {
    let response = await fetch(url);
    if (response.ok !== true) {
        throw new Error(`Could not fetch: ${url}`);
    } else {
        let result = await response.text();
        return result;
    }
}

class FetchAssignmentTask {

    constructor(organization, repo) {
        this.organization = organization;
        this.repo = repo;
        Object.freeze(this);
    }

    async run() {
        try {
            let config = await fetchFileAsText(createConfigURL(this)),
                readme = await fetchFileAsText(createReadmeURL(this)),
                commits = await fetchFileAsText(createCommitsURL(this)),
                configAsObject = JSON.parse(config),
                commitsAsObject = JSON.parse(commits),
                latestCommit = extractLatestCommit(commitsAsObject),
                readmeAsHTML = markdownConverter.makeHtml(readme),
                starterURL = createStarterCodeDownloadURL(this),
                solutionURL = createSolutionCodeDownloadURL(this);
            readmeAsHTML = fixRelativeLinksInHTML(createBaseURL(this), readmeAsHTML);
            return new Assignment(configAsObject.title, latestCommit.author, latestCommit.date, configAsObject.abstract, readmeAsHTML, starterURL, solutionURL);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

}

export default FetchAssignmentTask;