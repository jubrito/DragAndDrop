// Type casting -------------
const userInputElementNotSureIsNullV1 = <HTMLInputElement>document.getElementById('user-input');
const userInputElementNotSureIsNullV2 = document.getElementById('user-input') as HTMLInputElement;
const userInputElementNotSureIsNullV3 = document.getElementById('user-input');
userInputElementNotSureIsNullV1.value = 'Type casting v1 (with ! and <>)';
userInputElementNotSureIsNullV2.value = 'Type casting v2 (with ! and as)';
if (userInputElementNotSureIsNullV3){
    (userInputElementNotSureIsNullV3 as HTMLInputElement).value = 'Type casting v3 (without ! and with as)'
}

// Index properties ---------- 
interface ErrorContainer { 
    // Every property must have a property name that can be interperted as string and have a string value
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a capital character'
}