import { HeInitialization } from "../../network/initialization/he-initialization.js";
import { RandomInitialization } from "../../network/initialization/random-initialization.js";
import { XavierInitialization } from "../../network/initialization/xavier-initialization.js";
import { ZeroInitialization } from "../../network/initialization/zero-initialization.js";
export function getInitialization(initialization) {
    switch (initialization) {
        case "he":
            return HeInitialization;
        case "random":
            return RandomInitialization;
        case "xavier":
            return XavierInitialization;
        case "zero":
            return ZeroInitialization;
    }
}
//# sourceMappingURL=get-initialization.js.map