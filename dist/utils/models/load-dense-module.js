import { readFileSync } from "fs";
export function loadDenseModule(path) {
    const state = JSON.parse(readFileSync(path).toString());
    return state;
}
//# sourceMappingURL=load-dense-module.js.map