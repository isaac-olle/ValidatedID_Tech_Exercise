export abstract class Vo<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
        this.Validate();
    }

    protected abstract Validate(): void;

    GetValue(): T {
        return this.value
    }
}