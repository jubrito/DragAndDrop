"use strict";
const userInputElementNotSureIsNullV1 = document.getElementById('user-input');
const userInputElementNotSureIsNullV2 = document.getElementById('user-input');
const userInputElementNotSureIsNullV3 = document.getElementById('user-input');
userInputElementNotSureIsNullV1.value = 'Type casting v1 (with ! and <>)';
userInputElementNotSureIsNullV2.value = 'Type casting v2 (with ! and as)';
if (userInputElementNotSureIsNullV3) {
    userInputElementNotSureIsNullV3.value = 'Type casting v3 (without ! and with as)';
}
const errorBag = {
    email: 'Not a valid email',
    username: 'Must start with a capital character'
};
//# sourceMappingURL=type-casting-index-properties.js.map