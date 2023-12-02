import { combineReducers } from "redux";

import { appInitialState, applicationReducers, IApplicationState } from './application';

export interface IState {
  app: IApplicationState;
}

export const rootState: IState = {
  app: appInitialState,
}

export const rootReducers = combineReducers({
  app: applicationReducers,
})
