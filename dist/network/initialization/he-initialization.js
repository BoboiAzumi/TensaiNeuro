import { Tensor } from "../../modules/tensor.js";
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js";
import random from "random";
export const HeInitialization = (inputSize, units) => {
    const stdDev = Math.sqrt(2 / inputSize);
    let output = tensorZeros2d(units, inputSize);
    // const limit = Math.sqrt(6 / inputSize)
    output = new Tensor(output.values().map((v, i) => {
        return v.map((_, j) => {
            // random.use(`Nakano Itsuki_${i}${j}${i*j}`)
            const numbergen = random.normal(0);
            return numbergen() * stdDev; // (numbergen() * 2 - 1) * limit
        });
    }));
    return output;
};
//# sourceMappingURL=he-initialization.js.map