export function removePrefix(val: string, prefix: string) {
    if (val.startsWith(prefix)) return val.substring(prefix.length);
    return undefined;
}

export function ifDefined<T, R = void>(val: T | undefined, fun: (val: T) => R): R | undefined {
    if (val === undefined) return;
    return fun(val);
}

export function defined<T>(val: T | undefined): val is T {
    return val !== undefined;
}
