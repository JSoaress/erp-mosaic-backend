import { ERPModule } from "./erp-module.interface";

export class ModuleRegistry {
    private modules = new Map<string, ERPModule>();

    register(module: ERPModule) {
        const { name } = module.metadata;
        this.modules.set(name, module);
    }

    get(name: string): ERPModule {
        const module = this.modules.get(name);
        if (!module) throw new Error(`Module ${name} not found.`);
        return module;
    }

    list(): ERPModule[] {
        return Array.from(this.modules.values());
    }
}
