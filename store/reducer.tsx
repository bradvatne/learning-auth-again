import { StateType } from ".";
import { ActionType } from "./actions";

export default function reducer(state: StateType, action: ActionType) {
  let newState;
  switch (action.type) {
    case "login":
      newState = { email: action.email };
      break;
    case "logout":
      newState = { email: null };
      break;
    default:
      throw new Error();
  }
  return newState;
}
