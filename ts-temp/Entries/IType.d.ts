export interface IType<T = any> {
    new (...args: any[]): T;
}
