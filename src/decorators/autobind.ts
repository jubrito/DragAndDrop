namespace App {
    export function AutoBind(_target: any, _propertyName: string | Symbol, descriptorWithOriginalFunction: PropertyDescriptor) {
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
}