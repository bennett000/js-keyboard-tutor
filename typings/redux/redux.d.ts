// Type definitions for Redux v3.0.5
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>, Michael Bennett <https://github.com/bennett000/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Redux {

  interface Action {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: any;
  }

  interface Hash<T> {
    [id: string]: T;
  }

  interface ActionCreator {
    (...args: any[]): Action;
  }

  interface Listener {
    (): void;
  }

  interface Unsubscribe {
    (): void;
  }

  interface Reducer<S> {
    (state: S, action: Action): S;
  }

  interface Dispatch {
    (action: Action): Action;
  }

  interface MiddlewareArg<T> {
    dispatch: Dispatch;
    getState: GetState<T>;
  }

  interface Middleware<T> {
    (obj: MiddlewareArg<T>): Function;
  }

  interface GetState<T> {
    (): T;
  }

  interface Store<T> {
    replaceReducer(nextReducer: Reducer<T>): void;
    dispatch(action: Action): Action;
    getState(): GetState<T>;
    subscribe(listener: Listener): Unsubscribe;
  }

  interface CreateStore<T> {
    (reducer: Reducer<T>, initialState?: T): Store<T>;
  }

  function createStore<T>(reducer: Reducer<T>, initialState?: T): Store<T>;
  function bindActionCreators(actionCreators: Hash<ActionCreator>,
                              dispatch: Dispatch): Hash<Dispatch>;
  function combineReducers<T>(reducers: Hash<Reducer<any>>): Reducer<T>;
  function applyMiddleware<T>(...middlewares: Middleware<T>[]): CreateStore<T>;
  function compose<T extends Function>(...functions: Function[]): T;

}

declare module "redux" {
  export = Redux;
}
