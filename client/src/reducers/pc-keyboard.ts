import { PC_KEYPRESS } from '../actions/pc-keypress';
const immutable = require('immutable');
const List = immutable.List;

export function pcKeyboard(state = List(), action) {
  switch (action.type) {
    case PC_KEYPRESS:
      return state.push(action.payload.charCode);
    default:
      return state;
  }
}
