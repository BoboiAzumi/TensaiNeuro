import { Tensor } from "../../modules/tensor.js";
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js";
import random from "random";
export const XavierInitialization = (inputSize, units) => {
    const stdDev = Math.sqrt(2 / (inputSize + units));
    let output = tensorZeros2d(units, inputSize);
    // const limit = Math.sqrt(6 / (inputSize + units))
    output = new Tensor(output.values().map((v, i) => {
        return v.map((_, j) => {
            // random.use(`Nakano Itsuki_${i}${j}${i*j}`)
            const numbergen = random.normal(0);
            // return (numbergen() * 2 - 1) * limit
            return numbergen() * stdDev;
        });
    }));
    return output;
};
//# sourceMappingURL=xavier-initialization.js.map