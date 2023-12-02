import { IAction } from "../interface";
import { INIT_SYSTEM } from "../actions/systemAction";
import { System } from "../../core/System";

export interface IApplicationState {
  system: System | null;
}

export const appInitialState: IApplicationState = {
  system: null,
};

export function applicationReducers(state = appInitialState, action: IAction) {
  switch (action.type) {
    case INIT_SYSTEM:
      return {
        ...state,
        system: action.payload,
      };
    default:
      return state;
  }
}
