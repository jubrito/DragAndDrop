var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importAllLevelsOfNestingInside = true;
            const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                console.log('newElementId', newElementId);
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validatesProps = void 0;
    function validatesProps(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.minValue != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.minValue;
        }
        if (validatableInput.maxValue != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.maxValue;
        }
        return isValid;
    }
    exports.validatesProps = validatesProps;
});
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoBind = void 0;
    function AutoBind(_target, _propertyName, descriptorWithOriginalFunction) {
        const originalFunction = descriptorWithOriginalFunction.value;
        const descriptorWithAutoBind = {
            configurable: true,
            enumerable: false,
            get() {
                return originalFunction.bind(this);
            }
        };
        return descriptorWithAutoBind;
    }
    exports.AutoBind = AutoBind;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    ;
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("state/project-state-management", ["require", "exports", "models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectStateManagement = exports.ProjectStateManagement = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectStateManagement extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectStateManagement();
            return this.instance;
        }
        addProject(title, description, numberOfPeople) {
            const newProject = new project_js_1.Project(Math.random().toString(), title, description, numberOfPeople, project_js_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const projectToBeMoved = this.projects.find(project => project.id === projectId);
            if (projectToBeMoved && projectToBeMoved.status !== newStatus) {
                projectToBeMoved.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listernerFn of this.listeners) {
                const projectsCopy = this.projects.slice();
                listernerFn(projectsCopy);
            }
        }
    }
    exports.ProjectStateManagement = ProjectStateManagement;
    exports.projectStateManagement = ProjectStateManagement.getInstance();
});
define("components/project-input", ["require", "exports", "components/base", "util/validation", "decorators/autobind", "state/project-state-management"], function (require, exports, base_js_1, validation_js_1, autobind_js_1, project_state_management_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_js_1.Component {
        constructor() {
            super('project-input', 'app', true, "user-input");
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        renderContent() { }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: enteredPeople,
                required: true,
                minValue: 1,
                maxValue: 5
            };
            if (!(0, validation_js_1.validatesProps)(titleValidatable) ||
                !(0, validation_js_1.validatesProps)(descriptionValidatable) ||
                !(0, validation_js_1.validatesProps)(peopleValidatable)) {
                alert('Invalid input, please try again');
                return;
            }
            return [
                enteredTitle,
                enteredDescription,
                +enteredPeople
            ];
        }
        clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                project_state_management_js_1.projectStateManagement.addProject(title, description, people);
                this.clearInputs();
            }
        }
    }
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_js_1.AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "decorators/autobind", "components/base"], function (require, exports, autobind_js_2, base_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_js_2.Component {
        constructor(hostElementId, projectItem) {
            super("single-project", hostElementId, false, projectItem.id);
            this.hostElementId = hostElementId;
            this.projectItem = projectItem;
            this.renderContent();
            this.configure();
        }
        get persons() {
            if (this.projectItem.people === 1) {
                return "1 person";
            }
            return `${this.projectItem.people} persons`;
        }
        dragStartHandler(event) {
            var _a;
            const plainTextformat = 'text/plain';
            const cursorType = 'move';
            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData(plainTextformat, this.projectItem.id);
            event.dataTransfer.effectAllowed = cursorType;
        }
        dragEndHandler(_event) {
            console.log('DragEnd');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').innerHTML = this.projectItem.title;
            this.element.querySelector('h3').innerHTML = this.persons + ' assigned';
            this.element.querySelector('p').innerHTML = this.projectItem.description;
        }
    }
    exports.ProjectItem = ProjectItem;
    __decorate([
        autobind_js_2.AutoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        autobind_js_2.AutoBind
    ], ProjectItem.prototype, "dragEndHandler", null);
});
define("components/project-list", ["require", "exports", "decorators/autobind", "models/project", "components/base", "state/project-state-management", "components/project-item"], function (require, exports, autobind_js_3, project_js_2, base_js_3, project_state_management_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_js_3.Component {
        constructor(projectType) {
            super('project-list', 'app', false, `${projectType}-projects`);
            this.projectType = projectType;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.projectType}-projects-list`);
            listEl.innerHTML = '';
            for (const projectItem of this.assignedProjects) {
                new project_item_js_1.ProjectItem(this.element.querySelector('ul').id, projectItem);
            }
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listElement = this.element.querySelector('ul');
                listElement.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData('text/plain');
            project_state_management_js_2.projectStateManagement.moveProject(projectId, this.projectType === 'active' ? project_js_2.ProjectStatus.Active : project_js_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(_event) {
            const listElement = this.element.querySelector('ul');
            listElement.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            project_state_management_js_2.projectStateManagement.addListener((projects) => {
                const relevantProjects = projects.filter(project => {
                    if (this.projectType === 'active') {
                        return project.status === project_js_2.ProjectStatus.Active;
                    }
                    ;
                    return project.status === project_js_2.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.projectType}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h1').textContent = this.projectType.toUpperCase() + ' PROJECTS';
        }
    }
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_3.AutoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_js_1, project_list_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList('active');
    new project_list_js_1.ProjectList('finished');
});
//# sourceMappingURL=bundle.js.map