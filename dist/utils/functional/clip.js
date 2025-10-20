export function clip(x, epsilon = 1e-7) {
    if (x < epsilon) {
        return epsilon;
    }
    else if (x > (1 - epsilon)) {
        return 1 - epsilon;
    }
    else {
        return x;
    }
}
//# sourceMappingURL=clip.js.map