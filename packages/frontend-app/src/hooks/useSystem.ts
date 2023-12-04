import { useDispatch, useSelector } from "react-redux";
import {useCallback, useEffect} from "react";

import { System } from "../core/System";
import { IState } from "../store/reducers";
import { initSystem } from '../store/actions';

export function useSystem() {
  const dispatch = useDispatch();
  const system = useSelector((state: IState) => state.app.system);

  const init = useCallback(() => {
    const system = new System();

    dispatch(initSystem(system));
  }, [dispatch]);

  useEffect(() => {
    if (system) {

    }
  }, [system])

  return {
    system,
    init,
  };
}
