import { writeFileSync } from "fs";
export function saveDenseModule(layers, path) {
    const state = [];
    layers.map((v) => {
        state.push(v.getState());
    });
    writeFileSync(path, JSON.stringify(state));
}
//# sourceMappingURL=save-dense-module.js.map