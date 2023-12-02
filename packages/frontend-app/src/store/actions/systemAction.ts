import { System } from "../../core/System";
import { makeActionCreator } from "../utils";

export const INIT_SYSTEM = 'INIT_SYSTEM';

export const initSystem = (instance: System) => makeActionCreator(INIT_SYSTEM)(instance);
