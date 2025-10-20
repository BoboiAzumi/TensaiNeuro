import { Tensor } from "../../modules/tensor.js";
import { tensorJacobian } from "../../utils/tensor/tensor-jacobian.js";
import { tensorMul } from "../../utils/tensor/tensor-mul.js";
export class Softmax {
    func(x) {
        let expsum = 0;
        x.values().map((v) => {
            expsum += Math.pow(Math.E, v);
        });
        return new Tensor(x.values().map((v) => {
            return Math.pow(Math.E, v) / expsum;
        }));
    }
    d(x, dLoss) {
        const jacobian = x.map((v) => tensorJacobian(v.values()));
        return dLoss.map((v, i) => {
            return tensorMul(jacobian[i]?.transpose().values(), dLoss[i]?.unsqueeze(-1).values()).squeeze();
        });
    }
}
//# sourceMappingURL=softmax.js.map