import type { Tensor } from "../modules/tensor.js";

export type Initialization = (inputSize: number, units: number) => Tensor