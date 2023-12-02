import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { System } from "../core/System";
import { IState } from "../store/reducers";
import { initSystem } from '../store/actions';

export function useSystem() {
  const dispatch = useDispatch();
  const system = useSelector((state: IState) => state.app.system);

  const init = useCallback(() => {
    console.log(' call once ')
    const system = new System();

    dispatch(initSystem(system));
  }, [dispatch]);

  return {
    system,
    init,
  };
}
