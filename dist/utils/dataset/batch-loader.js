export class BatchLoader {
    x;
    y;
    batch;
    index = -1;
    constructor(x, y, batch) {
        this.x = x;
        this.y = y;
        this.batch = batch;
    }
    hasNext() {
        if (this.x.length - ((this.index + 2) * this.batch) + this.batch < this.batch) {
            return false;
        }
        return true;
    }
    next() {
        this.index += 1;
        return {
            x: this.x.slice(this.index * this.batch, (this.index * this.batch) + this.batch),
            y: this.y.slice(this.index * this.batch, (this.index * this.batch) + this.batch)
        };
    }
}
//# sourceMappingURL=batch-loader.js.map