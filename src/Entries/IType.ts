export interface IType<T = any> {
    new (...args): T
}