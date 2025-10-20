export type ModuleArchitectureType = {
    units: number,
    activationFunction?: "linear" | "relu" | "sigmoid" | "tanh",
    initialization?: "he" | "xavier" | "random" | "zero"
}