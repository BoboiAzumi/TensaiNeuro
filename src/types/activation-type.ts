import type { Tensor } from "../modules/tensor.js"

export interface ActivationFunction{
    func(x: Tensor | Tensor[]): Tensor | Tensor[]
    d(x: Tensor | Tensor[], dLoss?: Tensor[]): Tensor | Tensor[]
}