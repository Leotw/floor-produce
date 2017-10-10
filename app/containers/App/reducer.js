/************************************************/
/********** Reducer 控制State——业务逻辑 ***********/
/************************************************/
import {
  TRANSITION_LEFT,
  TRANSITION_RIGHT
} from './constant';

const initialState = {
  transName: 'right'
}; // 可以是Number 或者字符串 或对象

const transReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSITION_LEFT:
      return Object.assign({}, state, {
        transName: 'left'
      })
    case TRANSITION_RIGHT:
      return Object.assign({}, state, {
        transName: 'right'
      })
    default:
      return state;
  }
};

export default transReducer;
