import * as types from '../constants/ActionTypes';

export function submit (id, content, displays) {
  return {
    type: types.SUBMIT_ID,
    id,
    content,
    displays
  };
}