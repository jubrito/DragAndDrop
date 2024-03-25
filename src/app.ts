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

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log('this.titleInputElement.value',this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);

    }
    
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projectInput = new ProjectInput();

// class ProjectInput {
//     title: string;
//     description: string;
//     people: number;

//     constructor(t: string, d: string, p: number) {
//         this.title = t;
//         this.description = d;
//         this.people = p;
//     }
// }

// const projectInputTemplate = document.getElementById('project-input')?.innerHTML!;

// const app = document.getElementById('app')!;

// if (app) {
//     app.innerHTML = projectInputTemplate;
// }

// const projectTitle = document.getElementById('title') as HTMLInputElement;
// const projectDescription = document.getElementById('description') as HTMLTextAreaElement;
// const projectPeople = document.getElementById('people') as HTMLInputElement;
// interface Projects {
    //     title: string;
    //     description: string;
    //     people: number;
    // }
    
    // let projects: Array<Projects> = [];
    
    
   
