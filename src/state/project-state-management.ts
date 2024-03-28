import { Project, ProjectStatus } from "../models/project";
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>){
        this.listeners.push(listenerFn);
    }
}

export class ProjectStateManagement extends State<Project>{
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


    addProject(title: string, description: string, numberOfPeople: number){
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
        
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const projectToBeMoved = this.projects.find(project => project.id === projectId)
        if (projectToBeMoved && projectToBeMoved.status !== newStatus) {
            projectToBeMoved.status = newStatus;
            this.updateListeners(); 
        }
    }

    private updateListeners() {
        for (const listernerFn of this.listeners) {
            const projectsCopy = this.projects.slice()
            listernerFn(projectsCopy); 
        }
    }
}

export const projectStateManagement = ProjectStateManagement.getInstance();