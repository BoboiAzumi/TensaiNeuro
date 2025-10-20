import { Tensor } from "../../modules/tensor.js";
import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js";
import random from "random";
export const RandomInitialization = (inputSize, units) => {
    let output = tensorZeros2d(units, inputSize);
    output = new Tensor(output.values().map((v, i) => {
        return v.map((_, j) => {
            // random.use(`Nakano Itsuki_${i}${j}${i*j}`)
            const numbergen = random.normal(0);
            return numbergen();
        });
    }));
    return output;
};
//# sourceMappingURL=random-initialization.js.map