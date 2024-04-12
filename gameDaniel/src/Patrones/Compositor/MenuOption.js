import { BaseMenu } from "./BaseMenu.js";

// Clase MenuOption que extiende de BaseMenu
export class MenuOption extends BaseMenu {
    constructor(name) {
        super(name);
    }

    addMenu(childMenu) {
        throw new Error('Menu options cannot have children');
    }

    getSubMenuCount() {
        return 0;
    }

    getChildren() {
        throw new Error('Menu options cannot have children');
    }
}
