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
    // [property: string]: string | boolean | number; 
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
// ({value: enteredTitle, required: true, minLength: 5})

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
            console.log(title, description, people);
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