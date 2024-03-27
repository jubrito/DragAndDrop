interface Dragabble {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void // allows dropping
    dropHandler(event: DragEvent): void // handle the drop and update data
    dragLeaveHandler(event: DragEvent): void // what happens after dropping
}

enum ProjectStatus { Active, Finished };
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {
    }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>){
        this.listeners.push(listenerFn);
    }
}

class ProjectStateManagement extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectStateManagement;

    private constructor(){
        super();
    }

    static getInstance (){
        if (this.instance){
            return this.instance;
        } 
        this.instance = new ProjectStateManagement();
        return this.instance;
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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string){
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild as U;
        if (newElementId){
            console.log('newElementId',newElementId)
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element)
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragabble {

    constructor (public hostElementId: string, public projectItem: Project){
        super("single-project", hostElementId, false, projectItem.id);
        this.renderContent();
        this.configure();
    }
    get persons() {
        if (this.projectItem.people === 1) {
            return "1 person";
        } 
        return `${this.projectItem.people} persons`;
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
        console.log('event', event);
    }
    @AutoBind
    dragEndHandler(_event: DragEvent): void {
        console.log('DragEnd')
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.innerHTML = this.projectItem.title;
        this.element.querySelector('h3')!.innerHTML = this.persons + ' assigned';
        this.element.querySelector('p')!.innerHTML = this.projectItem.description;
    }

}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[];

    constructor (private projectType: 'active' | 'finished'){
        super('project-list', 'app', false, `${projectType}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    renderProjects() {
        const listEl = document.getElementById(`${this.projectType}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            // console.log('projectItem', projectItem);
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }

    @AutoBind
    dragOverHandler(_event: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
    }

    dropHandler(_event: DragEvent): void {
        
    }

    @AutoBind
    dragLeaveHandler(_event: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        
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
    }

    renderContent() {
        const listId = `${this.projectType}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h1')!.textContent = this.projectType.toUpperCase() + ' PROJECTS';
    }
}
    class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    
    constructor() {
        super('project-input', 'app', true, "user-input");
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }

    renderContent(){}

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
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

}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');