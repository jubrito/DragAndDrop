import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectStateManagement extends State {
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
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
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
export const projectStateManagement = ProjectStateManagement.getInstance();
//# sourceMappingURL=project-state-management.js.map