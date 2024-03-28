import { DragTarget } from '../models/drag-drop';
import { AutoBind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project';
import Component from './base';
import { projectStateManagement } from '../state/project-state-management';
import { ProjectItem } from './project-item';
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
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
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
            event.preventDefault(); // allows dropping
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');
        }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
        const projectId =  event.dataTransfer!.getData('text/plain');
        projectStateManagement.moveProject(projectId, this.projectType === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
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