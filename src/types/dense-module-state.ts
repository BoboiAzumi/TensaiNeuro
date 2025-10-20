import type { TensorType } from "./tensor-type.js"

export type DenseModuleState = {
    w: TensorType,
    b: TensorType
}