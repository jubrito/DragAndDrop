enum ProjectStatus { Active, Finished };
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {
    }
}

type Listener = (projects: Project[]) => void;

class ProjectStateManagement {
    private projects: Project[] = [];
    private static instance: ProjectStateManagement;
    private listeners: Listener[] = [];

    private constructor(){

    }

    static getInstance (){
        if (this.instance){
            return this.instance;
        } 
        this.instance = new ProjectStateManagement();
        return this.instance;
    }

    addListener(listenerFn: Listener){
        this.listeners.push(listenerFn);
    }

    public addProject(title: string, description: string, numberOfPeople: number){
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listernerFn of this.listeners) {
            const projectsCopy = this.projects.slice()
            listernerFn(projectsCopy); 
        }
    }
}

const projectStateManagement = ProjectStateManagement.getInstance();

function AutoBind(_target: any, _propertyName: string | Symbol, descriptorWithOriginalFunction: PropertyDescriptor) {
    const originalFunction = descriptorWithOriginalFunction.value;
    const descriptorWithAutoBind: PropertyDescriptor = {
        configurable: true,
        enumerable: false, // doesn't show up in 'for in' loops
        get() {
            // 'this' here refers to whatever is responsible for triggering getter method 
            // the getted method will be triggered by the concrete object to which it belongs
            // 'this' here = object on which we define the getter
            return originalFunction.bind(this)
        }
    }
    return descriptorWithAutoBind;
}

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
}
function validatesProps(validatableInput: Validatable) {
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
    if (validatableInput.minValue != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value >= validatableInput.minValue;
    }
    if (validatableInput.maxValue != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value <= validatableInput.maxValue;
    }
    return isValid;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor (private projectType: 'active' | 'finished'){
        this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;
        this.assignedProjects = [];
        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${projectType}-projects`;

        projectStateManagement.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.projectType === 'active') {
                    return project.status === ProjectStatus.Active;
                };
                return project.status === ProjectStatus.Finished;
            });

            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.projectType}-projects-list`) as HTMLUListElement;
        listElement.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listElement?.appendChild(listItem);
        }
    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element)
    }
    private renderContent() {
        const listId = `${this.projectType}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.projectType.toUpperCase() + ' PROJECTS';
    }
}
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    
    constructor() {
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;
    
        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
       
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
       
        this.attach();
        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            minValue: 1,
            maxValue: 5
        };
        if (
            !validatesProps(titleValidatable) ||
            !validatesProps(descriptionValidatable) ||
            !validatesProps(peopleValidatable)
        ) {
            alert('Invalid input, please try again');
            return;
        }
        return [
            enteredTitle,
            enteredDescription,
            +enteredPeople
        ]
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = ""; 
    }
    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectStateManagement.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);

    }
    
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');