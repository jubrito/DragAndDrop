var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AutoBind } from '../decorators/autobind.js';
import Component from './base.js';
export class ProjectItem extends Component {
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
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=project-item.js.map