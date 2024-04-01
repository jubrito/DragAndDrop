import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
document.querySelector('h1')!.innerHTML = 'Project Manager';
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');