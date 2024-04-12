
export class BaseMenu {
    constructor(name) {
        this.name = name; 
    }

    getName() {
        return this.name;
    }

    addMenu(childMenu) {
        throw new Error('This method must be overwritten');
    }

    getChildren() {
        throw new Error('This method must be overwritten');
    }

    getSubMenuCount() {
        throw new Error('This method must be overwritten');
    }
}
