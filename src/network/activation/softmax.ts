import { Tensor } from "../../modules/tensor.js";
import type { ActivationFunction } from "../../types/activation-type.js";
import type { TensorType } from "../../types/tensor-type.js";
import { tensorJacobian } from "../../utils/tensor/tensor-jacobian.js";
import { tensorMul } from "../../utils/tensor/tensor-mul.js";

export class Softmax implements ActivationFunction {
    func(x: Tensor): Tensor {
        let expsum: number = 0;
        
        (x.values() as TensorType[]).map((v) => {
            expsum += Math.pow(Math.E, v as number)
        })

        return new Tensor((x.values() as TensorType[]).map((v) => {
            return Math.pow(Math.E, v as number) / expsum
        }));
    }

    d(x: Tensor[], dLoss: Tensor[]): Tensor[] {
        const jacobian = x.map((v) => tensorJacobian(v.values()))

        return dLoss.map((v, i) => {
            return tensorMul(jacobian[i]?.transpose().values() as TensorType, dLoss[i]?.unsqueeze(-1).values() as TensorType).squeeze()
        })
    }
}
