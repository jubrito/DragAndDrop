export function AutoBind(_target, _propertyName, descriptorWithOriginalFunction) {
    const originalFunction = descriptorWithOriginalFunction.value;
    const descriptorWithAutoBind = {
        configurable: true,
        enumerable: false,
        get() {
            return originalFunction.bind(this);
        }
    };
    return descriptorWithAutoBind;
}
//# sourceMappingURL=autobind.js.map