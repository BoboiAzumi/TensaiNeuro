import { writeFileSync } from "fs";
import type { DenseLayer } from "../../network/index.js";
import type { DenseModuleState } from "../../types/dense-module-state.js";

export function saveDenseModule(layers: DenseLayer[], path: string){
    const state: DenseModuleState[] = []

    layers.map((v) => {
        state.push(v.getState())
    })

    writeFileSync(path, JSON.stringify(state))
}