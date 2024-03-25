"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectStateManagement {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateManagement();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, numberOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numberOfPeople
        };
        this.projects.push(newProject);
        for (const listernerFn of this.listeners) {
            const projectsCopy = this.projects.slice();
            listernerFn(projectsCopy);
        }
    }
}
const projectStateManagement = ProjectStateManagement.getInstance();
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
class ProjectList {
    constructor(projectType) {
        this.projectType = projectType;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        this.assignedProjects = [];
        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild;
        this.element.id = `${projectType}-projects`;
        projectStateManagement.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listElement = document.getElementById(`${this.projectType}-projects-list`);
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listElement === null || listElement === void 0 ? void 0 : listElement.appendChild(listItem);
        }
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
    renderContent() {
        const listId = `${this.projectType}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.projectType.toUpperCase() + ' PROJECTS';
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.attach();
        this.configure();
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
        if (!validatesProps(titleValidatable) ||
            !validatesProps(descriptionValidatable) ||
            !validatesProps(peopleValidatable)) {
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
            projectStateManagement.addProject(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
//# sourceMappingURL=app.js.map