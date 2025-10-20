import type { ActivationFunction } from "../../types/activation-type.js";
import type { Initialization } from "../../types/initialization-type.js";
import type { Layer } from "../../types/layer-types.js";
import type { Optimizer } from "../../types/optimizer-type.js";
import { Tensor } from "../../modules/tensor.js";
import type { DenseModuleState } from "../../types/dense-module-state.js";
export declare class DenseLayer implements Layer {
    w: Tensor;
    b: Tensor;
    dW: Tensor;
    dB: Tensor;
    input: Tensor[];
    output: Tensor[];
    inputSize: number;
    units: number;
    activation: ActivationFunction;
    optimizer: Optimizer;
    constructor(inputSize: number, units: number, activation?: ActivationFunction, optimizer?: Optimizer, initialization?: Initialization);
    cleanup(): void;
    forward(x: Tensor[]): Tensor[];
    backward(dloss: Tensor[]): Tensor[];
    update(lr?: number): void;
    getState(): DenseModuleState;
    setState(state: DenseModuleState): void;
}
//# sourceMappingURL=dense-layer.d.ts.map