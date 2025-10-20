import { readFileSync } from "fs";
import type { DenseModuleState } from "../../types/dense-module-state";

export function loadDenseModule(path: string){
    const state: DenseModuleState[] = JSON.parse(readFileSync(path).toString())

    return state
}