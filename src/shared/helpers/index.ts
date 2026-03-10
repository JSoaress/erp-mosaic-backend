import { IPresenter } from "ts-arch-kit/dist/core/helpers";

export class Pagination<T> {
    constructor(
        readonly count: number,
        readonly results: T[],
    ) {}

    getData(presenter?: IPresenter<T, unknown>) {
        if (presenter) return { count: this.count, results: this.results.map((r) => presenter.present(r)) };
        return { count: this.count, results: this.results };
    }
}
