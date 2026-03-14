export class ContractsRegistry {
    private contracts = new Map<string, unknown>();

    register<T>(contract: string, implementation: T) {
        this.contracts.set(contract, implementation);
    }

    resolve<T>(contract: string): T {
        const impl = this.contracts.get(contract);
        if (!impl) throw new Error(`Contract not registered: ${contract}`);
        return impl as T;
    }
}
