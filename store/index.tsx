import { ActionType } from "./actions";
import reducer from './reducer'

export interface StateType {
  email: string | null;
}

const initialState = {
  email: null,
};

export {initialState, reducer}