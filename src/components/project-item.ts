import { Dragabble } from '../models/drag-drop';
import { AutoBind } from '../decorators/autobind';
import { Project } from '../models/project';
import Component from './base';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragabble {
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
        const plainTextformat = 'text/plain';
        const cursorType = 'move';
        event.dataTransfer?.setData(plainTextformat, this.projectItem.id);
        event.dataTransfer!.effectAllowed = cursorType;
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



