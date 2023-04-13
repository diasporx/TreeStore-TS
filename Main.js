var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TreeStore = /** @class */ (function () {
    function TreeStore(elements) {
        this.elements = elements;
    }
    TreeStore.prototype.getAll = function () {
        return this.elements;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.elements.find(function (item) { return item.id === id; }) || null;
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.elements.filter(function (item) { return item.parent === id; });
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var children = this.getChildren(id);
        var result = __spreadArray([], children, true);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            result.push.apply(result, this.getAllChildren(child.id));
        }
        return result;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var item = this.getItem(id);
        if (!item)
            return [];
        var result = [item];
        var currentId = item.parent;
        while (currentId !== "root") {
            var parent = this.getItem(currentId);
            if (!parent)
                break;
            result.unshift(parent);
            currentId = parent.parent;
        }
        return result;
    };
    return TreeStore;
}());
var elements = [
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },
    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null }
];
var ts = new TreeStore(elements);
