import { Tensor } from "../../modules/tensor.js";
export class SGD {
    setupNnParam(params) {
        return;
    }
    setupOptimParam(params) {
        return;
    }
    updateMat(key, w0, grad, lr) {
        return new Tensor(w0.values().map((v, i) => {
            return v.map((w, j) => {
                const gradient = grad.values()[i][j];
                return w - (lr * gradient);
            });
        }));
    }
    updateVec(key, b, grad, lr) {
        return new Tensor(b.values().map((v, i) => {
            const gradient = grad.values()[i];
            return v - (lr * gradient);
        }));
    }
    step() {
        return;
    }
}
//# sourceMappingURL=sgd.js.map