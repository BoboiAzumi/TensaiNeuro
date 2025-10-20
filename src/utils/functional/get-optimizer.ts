import { ADAM } from "../../network/optimizer/adam.js";
import { SGD } from "../../network/optimizer/sgd.js";

export function getOptimizer(optimizer: "sgd" | "adam"){
    switch(optimizer){
        case "sgd":
            return new SGD()
        case "adam":
            return new ADAM()
        default:
            throw new Error("Optimizer not known")
    }
}