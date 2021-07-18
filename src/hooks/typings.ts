export type FnReturningPromise = (...args: any[]) => Promise<any>;
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
