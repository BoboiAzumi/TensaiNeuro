import { Tensor } from "../../modules/tensor.js";
import { tensorMul } from "../../utils/tensor/tensor-mul.js";
import { tensorMulHadamard } from "../../utils/tensor/tensor-mul-hadamard.js";
import { tensorMulOuter } from "../../utils/tensor/tensor-mul-outer.js";
import { tensorVecAdd } from "../../utils/tensor/tensor-vec-add.js";
import { tensorZeros1d } from "../../utils/tensor/tensor-zeros-1d.js";
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js";
import { Linear } from "../activation/linear.js";
import { HeInitialization } from "../initialization/he-initialization.js";
import { SGD } from "../optimizer/sgd.js";
import { tensorAdd2d } from "../../utils/tensor/tensor-add-2d.js";
import { tensorDivScalar2d } from "../../utils/tensor/tensor-div-scalar-2d.js";
export class DenseLayer {
    w;
    b;
    dW;
    dB;
    input = [];
    output = [];
    inputSize;
    units;
    activation;
    optimizer;
    constructor(inputSize, units, activation = new Linear(), optimizer = new SGD(), initialization = HeInitialization) {
        this.inputSize = inputSize;
        this.units = units;
        this.activation = activation;
        this.w = initialization(inputSize, units);
        this.dW = tensorZeros2d(units, inputSize);
        this.b = tensorZeros1d(units);
        this.dB = tensorZeros1d(units);
        this.optimizer = optimizer;
        this.units = units;
        this.inputSize = inputSize;
        this.optimizer.setupNnParam({
            w: tensorZeros2d(units, inputSize),
            vw: tensorZeros2d(units, inputSize),
            b: tensorZeros1d(units),
            vb: tensorZeros1d(units),
        });
        this.optimizer.setupOptimParam({
            beta1: 0.9,
            beta2: 0.999,
            epsilon: 10e-8
        });
    }
    cleanup() {
        this.dW = tensorZeros2d(this.units, this.inputSize);
        this.dB = tensorZeros1d(this.units);
    }
    forward(x) {
        this.input = x;
        this.output = [];
        x.map((v) => {
            const y = tensorMul(this.w.values(), v.unsqueeze(-1).values());
            const output = tensorVecAdd(y.values(), this.b.values());
            this.output.push(this.activation.func(output.squeeze(-1)));
        });
        return this.output;
    }
    backward(dloss) {
        if (dloss.length != this.output.length) {
            throw new Error("Batch size not same");
        }
        const prevGrad = [];
        dloss.map((v, i) => {
            if (!this.output[i]) {
                throw new Error("Output size not found");
            }
            const dActivation = this.activation.d(this.output[i]);
            const grad = tensorMulHadamard(v.unsqueeze().values(), dActivation.unsqueeze().values());
            const dW = tensorMulOuter(grad.squeeze().values(), this.input[i]?.transpose().squeeze().values());
            const db = grad;
            const wTranspose = new Tensor(this.w.values()).transpose();
            grad.unsqueeze().transpose();
            prevGrad.push(tensorMul(wTranspose.values(), grad.values()).transpose().squeeze());
            this.dW = tensorAdd2d(this.dW.values(), dW.values());
            this.dB = tensorAdd2d(this.dB.unsqueeze().values(), db.transpose().values()).squeeze();
        });
        this.dW = tensorDivScalar2d(this.dW.values(), dloss.length);
        this.dB = tensorDivScalar2d(this.dB.unsqueeze().values(), dloss.length).squeeze();
        return prevGrad;
    }
    update(lr = 0.01) {
        this.w = this.optimizer.updateMat("w", this.w, this.dW, lr);
        this.b = this.optimizer.updateVec("b", this.b, this.dB, lr);
        this.cleanup();
        this.optimizer.step();
    }
    getState() {
        const state = {
            w: this.w.values(),
            b: this.b.values()
        };
        return state;
    }
    setState(state) {
        this.w = new Tensor(state.w);
        this.b = new Tensor(state.b);
    }
}
//# sourceMappingURL=dense-layer.js.map