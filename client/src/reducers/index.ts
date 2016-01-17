import * as Redux from 'redux';
import {pcKeyboard} from './pc-keyboard';
import * as S from '../store/configure-store.ts';
const {combineReducers} = Redux;

export default combineReducers<S.KeyboardTutorState>({
  pcKeyboard
});
