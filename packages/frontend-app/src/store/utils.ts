import { IAction } from "./interface";

export function makeActionCreator(type: string) {
  return function(payload: any) {
    const action: IAction = { type }

    if (payload) {
      action.payload = payload
      return action;
    }

    return action
  }
}
