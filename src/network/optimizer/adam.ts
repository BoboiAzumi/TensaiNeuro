import { Tensor } from "../../modules/tensor.js"
import type { Optimizer } from "../../types/optimizer-type.js"
import type { TensorType } from "../../types/tensor-type.js"
import { tensorAdd1d } from "../../utils/tensor/tensor-add-1d.js"
import { tensorAdd2d } from "../../utils/tensor/tensor-add-2d.js"
import { tensorDivScalar2d } from "../../utils/tensor/tensor-div-scalar-2d.js"
import { tensorMulScalar1d } from "../../utils/tensor/tensor-mul-scalar-1d.js"
import { tensorMulScalar2d } from "../../utils/tensor/tensor-mul-scalar-2d.js"
import { tensorPow1d } from "../../utils/tensor/tensor-pow-1d.js"
import { tensorPow2d } from "../../utils/tensor/tensor-pow-2d.js"
import { tensorDivScalar1d } from "../../utils/tensor/tensor-div-scalar-1d.js"

export class ADAM implements Optimizer {
    beta1: number = 0
    beta2: number = 0
    epsilon: number = 0
    nnparam: { [key: string]: Tensor } = {}
    t: number

    constructor(){
        this.t = 1
    }

    setupNnParam(params: {[key: string]: Tensor}): void {
        this.nnparam = params
        return
    }

    setupOptimParam(params: { beta1:number, beta2: number, epsilon: number}): void {
        this.beta1 = params.beta1
        this.beta2 = params.beta2
        this.epsilon = params.epsilon
        return
    }

    updateMat(key: string, w0: Tensor, grad: Tensor, lr: number): Tensor {
        this.nnparam[key] = tensorAdd2d(
            tensorMulScalar2d(this.nnparam[key]?.values() || [], this.beta1).values(),
            tensorMulScalar2d(grad.values(), 1 - this.beta1).values()
        )
        this.nnparam[`v${key}`] = tensorAdd2d(
            tensorMulScalar2d(this.nnparam[`v${key}`]?.values() || [], this.beta2).values(),
            tensorMulScalar2d(tensorPow2d(grad.values(), 2).values(), 1 - this.beta2).values()
        )

        const mvts = tensorDivScalar2d(
            this.nnparam[key].values(),
            1 - Math.pow(this.beta1, this.t)
        )

        const vvts = tensorDivScalar2d(
            this.nnparam[`v${key}`]?.values() || [],
            1 - Math.pow(this.beta2, this.t)
        )

        return new Tensor((w0.values() as TensorType[]).map((v, i) => {
            return (v as TensorType[]).map((w, j) => {
                const mvt = ((mvts.values() as TensorType[])[i] as TensorType[])[j] as number
                const vvt = ((vvts.values() as TensorType[])[i] as TensorType[])[j] as number
                return (w as number) - 
                       (lr * (mvt / (Math.sqrt(vvt) - this.epsilon)))
            })
        }))
    }

    updateVec(key: string, b: Tensor, grad: Tensor, lr: number): Tensor {
        this.nnparam[key] = tensorAdd1d(
            tensorMulScalar1d(this.nnparam[key]?.values() || [], this.beta1).values(),
            tensorMulScalar1d(grad.values(), 1 - this.beta1).values()
        )
        this.nnparam[`v${key}`] = tensorAdd1d(
            tensorMulScalar1d(this.nnparam[`v${key}`]?.values() || [], this.beta2).values(),
            tensorMulScalar1d(tensorPow1d(grad.values(), 2).values(), 1 - this.beta2).values()
        )

        const mvts = tensorDivScalar1d(
            this.nnparam[key].values(),
            1 - Math.pow(this.beta1, this.t)
        )

        const vvts = tensorDivScalar1d(
            this.nnparam[`v${key}`]?.values() || [],
            1 - Math.pow(this.beta2, this.t)
        )

        return new Tensor((b.values() as TensorType[]).map((v, i) => {
            const mvt = (mvts.values() as TensorType[])[i] as number
            const vvt = (vvts.values() as TensorType[])[i] as number
            return (v as number) - (lr * (mvt / (Math.sqrt(vvt) - this.epsilon)))
        }))
    }

    step(): void {
        this.t += 1
        return
    }
}