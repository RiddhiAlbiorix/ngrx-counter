import { createReducer, on } from '@ngrx/store';
import { changeChannelName, customeIncrement, decrement, increment, reset } from './counter.actions';
import { initialstate } from './counter.state';

const _counterReducer = createReducer(
  initialstate,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0
    }
  }),
  on(customeIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.value
    }
  }),
  on(changeChannelName, (state) => {
    return {
      ...state,
      channelName: 'Modified Name'
    }
  })
  )

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}