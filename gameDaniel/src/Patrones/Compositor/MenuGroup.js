import { BaseMenu } from "./BaseMenu.js";

export class MenuGroup extends BaseMenu {
    /**@type {Object} */
    #menus = [];

    constructor(name) {
        super(name);
    }

    addMenu(childMenu) {
        this.#menus.push(childMenu);
    }

    getSubMenuCount() {
        return this.#menus.length;
    }

    getChildren() {
        return this.#menus;
    }
}
