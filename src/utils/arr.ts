export namespace Arr {
    export function from(arr) {
        return Array.prototype.slice.call(arr);
    }
};