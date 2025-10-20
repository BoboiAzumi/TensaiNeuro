import { Tensor } from "../../modules/tensor.js"
import type { Initialization } from "../../types/initialization-type.js"
import type { TensorType } from "../../types/tensor-type.js"
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js"
import random from "random"

export const HeInitialization: Initialization = (inputSize: number, units: number): Tensor => {
    const stdDev = Math.sqrt(2 / inputSize)
    let output: Tensor = tensorZeros2d(units, inputSize)
    // const limit = Math.sqrt(6 / inputSize)
    
    output = new Tensor((output.values() as TensorType[]).map((v, i) => {
        return (v as TensorType[]).map((_, j) => {
            // random.use(`Nakano Itsuki_${i}${j}${i*j}`)
            const numbergen = random.normal(0)
            return numbergen() * stdDev // (numbergen() * 2 - 1) * limit
        })
    }))

    return output
}