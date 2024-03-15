// Type casting
const userInputElementNotSureIsNullV1 = <HTMLInputElement>document.getElementById('user-input');
const userInputElementNotSureIsNullV2 = document.getElementById('user-input') as HTMLInputElement;
const userInputElementNotSureIsNullV3 = document.getElementById('user-input');
userInputElementNotSureIsNullV1.value = 'Type casting v1 (with ! and <>)';
userInputElementNotSureIsNullV2.value = 'Type casting v2 (with ! and as)';
if (userInputElementNotSureIsNullV3){
    (userInputElementNotSureIsNullV3 as HTMLInputElement).value = 'Type casting v3 (without ! and with as)'
}

