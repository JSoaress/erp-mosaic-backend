import { ERPModuleDefinition } from "./erp-module.interface";

export class ModuleRegistry {
    private modules = new Map<string, ERPModuleDefinition>();

    register(module: ERPModuleDefinition) {
        const { name } = module.metadata;
        this.modules.set(name, module);
    }

    get(name: string): ERPModuleDefinition {
        const module = this.modules.get(name);
        if (!module) throw new Error(`Module ${name} not found.`);
        return module;
    }

    list(): ERPModuleDefinition[] {
        return Array.from(this.modules.values());
    }
}
