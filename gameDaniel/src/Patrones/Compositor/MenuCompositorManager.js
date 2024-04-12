import { MenuGroup } from "./MenuGroup.js";
import { MenuOption } from "./MenuOption.js";

export class MenuCompositeManager {
    /**@type {Object} */
    #components = {};

    getComponents() {
        return this.#components;
    }

    getComponent(id) {
        return this.#components[id];
    }

    getGroupComponents()
    {
        let groupComponents = [];
        for (const key in this.#components) {
            if (this.#components[key] instanceof MenuGroup) {
                groupComponents.push(this.#components[key]);
            }
        }
        return groupComponents;
    }

    newMenuOption(id, name) {
        this.#components[id] = new MenuOption(name);
    }

    newMenuGroup(id, name) {
        this.#components[id] = new MenuGroup(name);
    }

    assignMenuOptioToGroup(idMenuOption, idMenuGroup) {
       this.#components[idMenuGroup].addMenu(this.#components[idMenuOption]);
    }
        
    
}
