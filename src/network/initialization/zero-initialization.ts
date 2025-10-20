import type { Tensor } from "../../modules/tensor.js"
import type { Initialization } from "../../types/initialization-type.js"
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js"

export const ZeroInitialization: Initialization = (inputSize: number, units: number): Tensor => {
    let output: Tensor = tensorZeros2d(units, inputSize)

    return output
}