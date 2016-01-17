import {List} from 'immutable';
const {createStore, applyMiddleware, compose} = Redux;
import * as Redux from 'redux';
const thunk = require('redux-thunk');
import reducer from '../reducers/index';

export interface KeyboardTutorState {
  pcKeyboard: List;
}

interface ComposedCreateStore extends Redux.CreateStore<KeyboardTutorState> {}

const finalCreateStore =
  <ComposedCreateStore>compose(applyMiddleware<any>(thunk))(createStore);

export default () => {
  return finalCreateStore(reducer);
}
