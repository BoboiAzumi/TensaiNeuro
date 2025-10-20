import { Tensor } from "../../modules/tensor.js";
export function tensorZeros2d(rows, cols) {
    const data = Array.from({ length: rows }, () => new Array(cols).fill(0));
    return new Tensor(data);
}
//# sourceMappingURL=tensor-zeros-2d.js.map