import { DenseLayer } from "../network/layer/dense-layer.js";
import type { ModuleArchitectureType } from "../types/module-type.js";
import { Tensor } from "./tensor.js";
export declare class FCModule {
    layers: DenseLayer[];
    lossCalcFunction?: (predicted: Tensor[], actual: Tensor[]) => {
        dLoss: Tensor[];
        loss: number;
    };
    constructor(inputShape: number, optimizer: "sgd" | "adam", moduleArchitecture: ModuleArchitectureType[]);
    predict(x: Tensor[]): {
        layerOut: Tensor[][];
        output: Tensor[] | undefined;
    };
    backward(x: Tensor[]): {
        layerGrad: Tensor[][];
        grad: Tensor[] | undefined;
    };
    update(lr: number): void;
    setLossCalcFunction(lossCalcFunction: (predicted: Tensor[], actual: Tensor[]) => {
        dLoss: Tensor[];
        loss: number;
    }): void;
    fit(x: number[][], y: number[][], epochs: number, lr?: number, batchSize?: number): void;
}
//# sourceMappingURL=fc-module.d.ts.map