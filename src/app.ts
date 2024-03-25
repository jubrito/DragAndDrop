class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    
    constructor() {
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;
    
        const importAllLevelsOfNestingInside = true;
        const importedNode = document.importNode(this.templateElement.content, importAllLevelsOfNestingInside);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach();
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
// const buttonSubmit = document.querySelector('button') as HTMLButtonElement;
// interface Projects {
//     title: string;
//     description: string;
//     people: number;
// }

// let projects: Array<Projects> = [];


// buttonSubmit?.addEventListener('click', (event: MouseEvent) => {
//     event.preventDefault();
//     projects.push({
//         title: projectTitle?.value,
//         description: projectDescription?.value,
//         people: +projectPeople?.value
//     })
//     console.log('projects',projects)
// })

