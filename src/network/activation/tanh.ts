import { Tensor } from "../../modules/tensor.js";
import type { ActivationFunction } from "../../types/activation-type.js";
import type { TensorType } from "../../types/tensor-type.js";
import { clip } from "../../utils/functional/clip.js";

export class Tanh implements ActivationFunction {
    func(x: Tensor): Tensor {
        return new Tensor((x.values() as TensorType[]).map((v) => {
            const ex = Math.pow(clip(v as number), Math.E)
            const emx = Math.pow(clip(v as number), -Math.E)
            return (ex - emx) / (ex + emx)
        }));
    }

    d(x: Tensor): Tensor {
        const tanhVals = this.func(x);
        return new Tensor((tanhVals.values() as TensorType[]).map((v) => 1 - (v as number) * (v as number)));
    }
}