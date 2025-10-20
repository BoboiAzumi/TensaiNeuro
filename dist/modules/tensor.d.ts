import type { TensorType } from "../types/tensor-type.js";
export declare class Tensor {
    _tensor: TensorType;
    constructor(tensor: TensorType);
    update(tensor: TensorType): void;
    size(): number[];
    unsqueeze(dim?: number): this;
    squeeze(dim?: number): this;
    print(): void;
    transpose(dim?: number): Tensor;
    values(): TensorType;
}
//# sourceMappingURL=tensor.d.ts.map