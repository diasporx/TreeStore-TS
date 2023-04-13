interface TreeElement {
    id: string | number;
    parent: string | number;
    type?: string | null;
}

class TreeStore {
    private elements: TreeElement[];

    constructor(elements: TreeElement[]) {
        this.elements = elements;
    }

    getAll(): any[] {
        return this.elements;
    }

    getItem(id: string | number): any | null {
        return this.elements.find(item => item.id === id) || null;
    }

    getChildren(id: string | number): any[] {
        return this.elements.filter(item => item.parent === id);
    }

    getAllChildren(id: string | number): any[] {
        const children = this.getChildren(id);
        const result = [...children];
        for (const child of children) {
            result.push(...this.getAllChildren(child.id));
        }
        return result;
    }

    getAllParents(id: string | number): any[] {
        const item = this.getItem(id);
        if (!item) return [];
        const result = [item];
        let currentId = item.parent;
        while (currentId !== "root") {
            const parent = this.getItem(currentId);
            if (!parent) break;
            result.unshift(parent);
            currentId = parent.parent;
        }
        return result;
    }
}

const elements = [
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null }
];
const ts = new TreeStore(elements);
