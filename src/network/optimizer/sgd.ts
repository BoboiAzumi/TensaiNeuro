import { Tensor } from "../../modules/tensor.js"
import type { Optimizer } from "../../types/optimizer-type.js"
import type { TensorType } from "../../types/tensor-type.js"

export class SGD implements Optimizer {
    setupNnParam(params: object): void {
        return
    }

    setupOptimParam(params: object): void {
        return
    }

    updateMat(key: string, w0: Tensor, grad: Tensor, lr: number): Tensor {
        return new Tensor((w0.values() as TensorType[]).map((v, i) => {
            return (v as TensorType[]).map((w, j) => {
                const gradient = ((grad.values() as TensorType[])[i] as TensorType[])[j] as number;
                return (w as number) - (lr * gradient)
            })
        }))
    }

    updateVec(key: string, b: Tensor, grad: Tensor, lr: number): Tensor {
        return new Tensor((b.values() as TensorType[]).map((v, i) => {
            const gradient = (grad.values() as TensorType[])[i] as number
            return (v as number) - (lr * gradient)
        }))
    }

    step(): void {
        return
    }
}