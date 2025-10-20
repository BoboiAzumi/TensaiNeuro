import { tensorZeros2d } from "../../utils/tensor/tensor-zeros-2d.js";
export const ZeroInitialization = (inputSize, units) => {
    let output = tensorZeros2d(units, inputSize);
    return output;
};
//# sourceMappingURL=zero-initialization.js.map