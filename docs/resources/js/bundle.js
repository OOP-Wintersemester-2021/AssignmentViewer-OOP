/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assignments/Assignment.js":
/*!***************************************!*\
  !*** ./src/assignments/Assignment.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-env browser */\r\n\r\nclass Assignment {\r\n\r\n    constructor(title, author, edit, abstract, content, starter, solution) {\r\n        this.title = title;\r\n        this.author = author;\r\n        this.edit = edit;\r\n        this.abstract = abstract;\r\n        this.content = content;\r\n        this.starter = starter;\r\n        this.solution = solution;\r\n        Object.freeze(this);\r\n    }\r\n\r\n    getFormattedEditDate() {\r\n        return this.edit.toLocaleString();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Assignment);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/assignments/Assignment.js?");

/***/ }),

/***/ "./src/assignments/FetchAssignmentTask.js":
/*!************************************************!*\
  !*** ./src/assignments/FetchAssignmentTask.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Assignment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assignment.js */ \"./src/assignments/Assignment.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\nconst URL_TEMPLATE = \"https://raw.githubusercontent.com/$ORGANIZATION/$REPO/master/\",\r\n    DOWNLOAD_URL_TEMPLATE = \"https://github.com/$ORGANIZATION/$REPO/archive/refs/heads/\",\r\n    GET_COMMITS_URL_TEMPLATE = \"https://api.github.com/repos/$ORGANIZATION/$REPO/commits?sha=master\",\r\n    CONFIG_FILE_NAME = \"assignment.json\",\r\n    README_FILE_NAME = \"Readme.md\",\r\n    STARTER_CODE_ARCHIVE = \"starter.zip\",\r\n    SOLUTION_CODE_ARCHIVE = \"solution.zip\",\r\n    markdownConverter = new showdown.Converter();\r\n\r\nfunction createBaseURL(task) {\r\n    return URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization).replace(\"$REPO\", task.repo);\r\n}\r\n\r\nfunction createConfigURL(task) {\r\n    return createBaseURL(task) + CONFIG_FILE_NAME;\r\n}\r\n\r\nfunction createReadmeURL(task) {\r\n    return createBaseURL(task) + README_FILE_NAME;\r\n}\r\n\r\nfunction createBaseDownloadURL(task) {\r\n    return DOWNLOAD_URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization).replace(\"$REPO\", task.repo);\r\n}\r\n\r\nfunction createStarterCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + STARTER_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createSolutionCodeDownloadURL(task) {\r\n    return createBaseDownloadURL(task) + SOLUTION_CODE_ARCHIVE;\r\n}\r\n\r\nfunction createCommitsURL(task) {\r\n    return GET_COMMITS_URL_TEMPLATE.replace(\"$ORGANIZATION\", task.organization).replace(\"$REPO\", task.repo);\r\n}\r\n\r\nfunction fixRelativeLinksInHTML(url, html) {\r\n    return html.replaceAll(\"img src=\\\"./\", `img src=\\\"${url}`);\r\n\r\n}\r\n\r\nfunction extractLatestCommit(commits) {\r\n    return {\r\n        author: commits[0].commit.author.name,\r\n        date: new Date(commits[0].commit.author.date)\r\n    };\r\n}\r\n\r\nasync function fetchFileAsText(url) {\r\n    let response = await fetch(url);\r\n    if (response.ok !== true) {\r\n        throw new Error(`Could not fetch: ${url}`);\r\n    } else {\r\n        let result = await response.text();\r\n        return result;\r\n    }\r\n}\r\n\r\nclass FetchAssignmentTask {\r\n\r\n    constructor(organization, repo) {\r\n        this.organization = organization;\r\n        this.repo = repo;\r\n        Object.freeze(this);\r\n    }\r\n\r\n    async run() {\r\n        try {\r\n            let config = await fetchFileAsText(createConfigURL(this)),\r\n                readme = await fetchFileAsText(createReadmeURL(this)),\r\n                commits = await fetchFileAsText(createCommitsURL(this)),\r\n                configAsObject = JSON.parse(config),\r\n                commitsAsObject = JSON.parse(commits),\r\n                latestCommit = extractLatestCommit(commitsAsObject),\r\n                readmeAsHTML = markdownConverter.makeHtml(readme),\r\n                starterURL = createStarterCodeDownloadURL(this),\r\n                solutionURL = createSolutionCodeDownloadURL(this);\r\n            readmeAsHTML = fixRelativeLinksInHTML(createBaseURL(this), readmeAsHTML);\r\n            return new _Assignment_js__WEBPACK_IMPORTED_MODULE_0__.default(configAsObject.title, latestCommit.author, latestCommit.date, configAsObject.abstract, readmeAsHTML, starterURL, solutionURL);\r\n        } catch (error) {\r\n            console.error(error);\r\n            return undefined;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchAssignmentTask);\n\n//# sourceURL=webpack://android-assignment-viewer/./src/assignments/FetchAssignmentTask.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assignments_FetchAssignmentTask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assignments/FetchAssignmentTask.js */ \"./src/assignments/FetchAssignmentTask.js\");\n/* harmony import */ var _viewer_AssignmentViewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewer/AssignmentViewer.js */ \"./src/viewer/AssignmentViewer.js\");\n/* eslint-env browser */\r\n\r\n\r\n\r\n\r\nfunction getParameterFromHash() {\r\n    let hash = location.hash.substring(1),\r\n        organization = hash.split(\"/\")[0],\r\n        repository = hash.split(\"/\")[1];\r\n    if (organization !== undefined && repository !== undefined) {\r\n        return {\r\n            organization: organization,\r\n            repository: repository\r\n        }\r\n    } else {\r\n        throw new Error(\"No  repository specified by hash parameters!\")\r\n    }\r\n}\r\n\r\nasync function loadAssignment() {\r\n    try {\r\n        let parameter = getParameterFromHash(),\r\n            task = new _assignments_FetchAssignmentTask_js__WEBPACK_IMPORTED_MODULE_0__.default(parameter.organization, parameter.repository),\r\n            assignment = await task.run();\r\n        _viewer_AssignmentViewer_js__WEBPACK_IMPORTED_MODULE_1__.default.render(assignment);\r\n    } catch (error) {\r\n        // Show error message\r\n        console.error(error);\r\n    }\r\n}\r\n\r\nloadAssignment();\n\n//# sourceURL=webpack://android-assignment-viewer/./src/index.js?");

/***/ }),

/***/ "./src/viewer/AssignmentViewer.js":
/*!****************************************!*\
  !*** ./src/viewer/AssignmentViewer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-env browser */\r\n\r\nfunction updateMetaInformation(el, assignment) {\r\n    let metaEl = el.querySelector(\".meta\");\r\n    metaEl.querySelector(\".title\").innerHTML = assignment.title;\r\n    metaEl.querySelector(\".author\").innerHTML = assignment.author;\r\n    metaEl.querySelector(\".edit\").innerHTML = assignment.getFormattedEditDate();\r\n    metaEl.querySelector(\".abstract\").innerHTML = assignment.abstract;\r\n}\r\n\r\nfunction updateContent(el, assignment) {\r\n    let contentEl = el.querySelector(\".content\");\r\n    contentEl.innerHTML = assignment.content;\r\n}\r\n\r\nfunction addLink(el, link, label) {\r\n    let linkEl = el.querySelector(\".links\"),\r\n        newLinkEl = document.createElement(\"a\");\r\n    newLinkEl.innerHTML = label;\r\n    newLinkEl.href = link;\r\n    newLinkEl.classList.add(\"download\");\r\n    linkEl.append(newLinkEl);\r\n}\r\n\r\nclass AssignmentViewer {\r\n\r\n    constructor() {\r\n        this.el = document.querySelector(\".assignment-container\");\r\n    }\r\n\r\n    render(assignment) {\r\n        updateMetaInformation(this.el, assignment);\r\n        updateContent(this.el, assignment);\r\n        addLink(this.el, assignment.starter, \"Startercode\");\r\n        addLink(this.el, assignment.solution, \"Lösungsvorschlag\");\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AssignmentViewer());\n\n//# sourceURL=webpack://android-assignment-viewer/./src/viewer/AssignmentViewer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;