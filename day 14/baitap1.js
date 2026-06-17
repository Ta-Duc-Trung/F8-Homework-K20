function analyzeValue(value) {
    return {
        input: value,
        type: typeof value,
        isTruthy: Boolean(value),
        isNullOrUndefined: value === null || value === undefined,
        isReferenceType:
            (typeof value === "object" && value !== null) ||
            typeof value === "function",
    };
}

console.log(analyzeValue(null));
console.log(analyzeValue(undefined));
console.log(analyzeValue(0));
console.log(analyzeValue("hello"));
console.log(analyzeValue({}));
console.log(analyzeValue(function () {}));
console.log(analyzeValue([1, 2, 3]));
console.log(analyzeValue(NaN));
