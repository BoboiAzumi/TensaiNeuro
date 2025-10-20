import { Linear } from "../network/activation/linear.js";
import { ReLU } from "../network/activation/relu.js";
import { Sigmoid } from "../network/activation/sigmoid.js";
import { Tanh } from "../network/activation/tanh.js";
import { HeInitialization } from "../network/initialization/he-initialization.js";
import { XavierInitialization } from "../network/initialization/xavier-initialization.js";
import { DenseLayer } from "../network/layer/dense-layer.js";
import { BatchLoader } from "../utils/dataset/batch-loader.js";
import { getInitialization } from "../utils/functional/get-initialization.js";
import { getOptimizer } from "../utils/functional/get-optimizer.js";
import { Tensor } from "./tensor.js";
export class FCModule {
    layers;
    lossCalcFunction;
    constructor(inputShape, optimizer, moduleArchitecture) {
        this.layers = [];
        for (let i = 0; i < moduleArchitecture.length; i++) {
            let activation;
            let initialization;
            if (!moduleArchitecture[i]?.activationFunction) {
                activation = new Linear();
                initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "xavier") : XavierInitialization;
            }
            switch (moduleArchitecture[i]?.activationFunction) {
                case "linear":
                    activation = new Linear();
                    initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "xavier") : XavierInitialization;
                    break;
                case "relu":
                    activation = new ReLU();
                    initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "he") : HeInitialization;
                    break;
                case "sigmoid":
                    activation = new Sigmoid();
                    initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "xavier") : XavierInitialization;
                    break;
                case "tanh":
                    activation = new Tanh();
                    initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "xavier") : XavierInitialization;
                    break;
                default:
                    activation = new Linear();
                    initialization = moduleArchitecture[i]?.initialization ? getInitialization(moduleArchitecture[i]?.initialization || "xavier") : HeInitialization;
            }
            if (i == 0) {
                this.layers.push(new DenseLayer(inputShape, moduleArchitecture[i]?.units, activation, getOptimizer(optimizer), initialization));
                continue;
            }
            this.layers.push(new DenseLayer(moduleArchitecture[i - 1]?.units, moduleArchitecture[i]?.units, activation, getOptimizer(optimizer), initialization));
        }
    }
    predict(x) {
        const layerOutput = [];
        for (let i = 0; i < this.layers.length; i++) {
            if (i == 0) {
                layerOutput.push(this.layers[i]?.forward(x));
                continue;
            }
            layerOutput.push(this.layers[i]?.forward(layerOutput[i - 1]));
        }
        return {
            layerOut: layerOutput,
            output: layerOutput[layerOutput.length - 1]
        };
    }
    backward(x) {
        const layerGrad = [];
        for (let i = this.layers.length - 1; i >= 0; i--) {
            if (i == this.layers.length - 1) {
                layerGrad.push(this.layers[i]?.backward(x));
                continue;
            }
            layerGrad.push(this.layers[i]?.backward(layerGrad[this.layers.length - i - 2]));
        }
        return {
            layerGrad: layerGrad.reverse(),
            grad: layerGrad[layerGrad.length - 1]
        };
    }
    update(lr) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i]?.update(lr);
        }
    }
    setLossCalcFunction(lossCalcFunction) {
        this.lossCalcFunction = lossCalcFunction;
    }
    fit(x, y, epochs, lr = 0.1, batchSize = 1) {
        if (!this.lossCalcFunction) {
            throw new Error("Loss calc function not defined");
        }
        for (let i = 0; i < epochs; i++) {
            let batchIter = 1;
            let lossTotal = 0;
            const batchLoader = new BatchLoader(x.map((v) => new Tensor(v)), y.map((v) => new Tensor(v)), batchSize);
            while (batchLoader.hasNext()) {
                const batchThis = batchLoader.next();
                const pred = this.predict(batchThis.x);
                const lossCalc = this.lossCalcFunction(pred.output, batchThis.y);
                this.backward(lossCalc.dLoss);
                this.update(lr);
                batchIter += 1;
                lossTotal += lossCalc.loss;
            }
            console.log(`Epochs [${i + 1} / ${epochs}], Loss : ${lossTotal / batchIter}`);
        }
    }
}
//# sourceMappingURL=fc-module.js.map