import { Tensor } from "../../modules/tensor.js";
import { tensorAdd1d } from "../../utils/tensor/tensor-add-1d.js";
import { tensorAdd2d } from "../../utils/tensor/tensor-add-2d.js";
import { tensorDivScalar2d } from "../../utils/tensor/tensor-div-scalar-2d.js";
import { tensorMulScalar1d } from "../../utils/tensor/tensor-mul-scalar-1d.js";
import { tensorMulScalar2d } from "../../utils/tensor/tensor-mul-scalar-2d.js";
import { tensorPow1d } from "../../utils/tensor/tensor-pow-1d.js";
import { tensorPow2d } from "../../utils/tensor/tensor-pow-2d.js";
import { tensorDivScalar1d } from "../../utils/tensor/tensor-div-scalar-1d.js";
export class ADAM {
    beta1 = 0;
    beta2 = 0;
    epsilon = 0;
    nnparam = {};
    t;
    constructor() {
        this.t = 1;
    }
    setupNnParam(params) {
        this.nnparam = params;
        return;
    }
    setupOptimParam(params) {
        this.beta1 = params.beta1;
        this.beta2 = params.beta2;
        this.epsilon = params.epsilon;
        return;
    }
    updateMat(key, w0, grad, lr) {
        this.nnparam[key] = tensorAdd2d(tensorMulScalar2d(this.nnparam[key]?.values() || [], this.beta1).values(), tensorMulScalar2d(grad.values(), 1 - this.beta1).values());
        this.nnparam[`v${key}`] = tensorAdd2d(tensorMulScalar2d(this.nnparam[`v${key}`]?.values() || [], this.beta2).values(), tensorMulScalar2d(tensorPow2d(grad.values(), 2).values(), 1 - this.beta2).values());
        const mvts = tensorDivScalar2d(this.nnparam[key].values(), 1 - Math.pow(this.beta1, this.t));
        const vvts = tensorDivScalar2d(this.nnparam[`v${key}`]?.values() || [], 1 - Math.pow(this.beta2, this.t));
        return new Tensor(w0.values().map((v, i) => {
            return v.map((w, j) => {
                const mvt = mvts.values()[i][j];
                const vvt = vvts.values()[i][j];
                return w -
                    (lr * (mvt / (Math.sqrt(vvt) - this.epsilon)));
            });
        }));
    }
    updateVec(key, b, grad, lr) {
        this.nnparam[key] = tensorAdd1d(tensorMulScalar1d(this.nnparam[key]?.values() || [], this.beta1).values(), tensorMulScalar1d(grad.values(), 1 - this.beta1).values());
        this.nnparam[`v${key}`] = tensorAdd1d(tensorMulScalar1d(this.nnparam[`v${key}`]?.values() || [], this.beta2).values(), tensorMulScalar1d(tensorPow1d(grad.values(), 2).values(), 1 - this.beta2).values());
        const mvts = tensorDivScalar1d(this.nnparam[key].values(), 1 - Math.pow(this.beta1, this.t));
        const vvts = tensorDivScalar1d(this.nnparam[`v${key}`]?.values() || [], 1 - Math.pow(this.beta2, this.t));
        return new Tensor(b.values().map((v, i) => {
            const mvt = mvts.values()[i];
            const vvt = vvts.values()[i];
            return v - (lr * (mvt / (Math.sqrt(vvt) - this.epsilon)));
        }));
    }
    step() {
        this.t += 1;
        return;
    }
}
//# sourceMappingURL=adam.js.map