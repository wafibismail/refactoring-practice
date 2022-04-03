{/*
    Eliminate Large Accumulation Methods by Extracting Methods and Using a Collecting Parameter

    This section further refactors the code from the previous section.

    Item.toString() method is an accumulation method, previously collecting required information
    with the use of a variable.

    Now a different approach is going to be implemented.

    A collecting parameter, passed from one method to another, will be used instead to collect
    the required information.
*/
class StringBuffer {
    #strings: string[];

    append(newString: string): void {
        this.#strings.push(newString);
    }

    toString = (): string => this.#strings.join("");
}

class Item {
    #itemInfoHashMap: Object;
    #itemName: string;

    #children: Item[] = [];

    getItemName = (): string => this.#itemName;
    setItemName(itemName: string): void {
        this.#itemName = itemName;
    }

    constructor(itemName:string) {
        this.setItemName(itemName);
        this.#itemInfoHashMap = {};
    }

    add(childNode: Item): void {
        this.#children.push(childNode);
    }

    addItemInformation(infoName: string, info: string) {
        this.#itemInfoHashMap[infoName] = info;
    }
    getItemInformation(infoName: string): string {
        return this.#itemInfoHashMap[infoName];
    }

    toString(): string {
        const itemInfo: StringBuffer = new StringBuffer();

        this.#addChildrenInformation(itemInfo);

        return itemInfo.toString();
    }

    #addItemInfoAndChildren(itemInfo: StringBuffer): void {
        this.#addItemInformation(itemInfo);
        this.#addChildrenInformation(itemInfo);
    }

    #addItemInformation(itemInfo: StringBuffer): void {
        itemInfo.append("\n" + this.#itemName + " ");

        let hashMapSize = Object.keys(this.#itemInfoHashMap).length;

        if (hashMapSize != 0) {
            itemInfo.append(this.displayProductInfo());
        }
    }

    #addChildrenInformation(itemInfo: StringBuffer): void {
        this.#children.forEach(node => {
            itemInfo.append(node.toString());
        });
    }

    displayProductInfo(): string {
        let productInfo: string = "";

        Object.entries(this.#itemInfoHashMap).forEach(([key, value]) => {
            productInfo += `${key}: ${value} `;
        })

        return productInfo;
    }
}

class ItemBuilder {
    items: Item[] = [];

    #root: Item;
    #current: Item;
    #parent: Item;

    constructor(rootName: string) {
        this.#root = new Item(rootName);

        this.addItemToArray(this.#root);

        this.#parent = this.#current = this.#root;

        this.#root.addItemInformation("Parent", this.#parent.getItemName());
    }

    addItemInformation(name: string, value: string) {
        this.#current.addItemInformation(name, value);
    }

    addChild(child: string) {
        const childNode: Item = new Item(child);

        this.addItemToArray(childNode);

        this.#current.add(childNode);
        this.#parent = this.#current;
        this.#current = childNode;

        childNode.addItemInformation("Parent", this.#parent.getItemName());
    }

    addSibling(sibling: string) {
        const siblingNode: Item = new Item(sibling);

        this.addItemToArray(siblingNode);

        this.#parent.add(siblingNode);
        this.#current = siblingNode;

        siblingNode.addItemInformation("Parent", this.#parent.getItemName());
    }

    addItemToArray(newItem: Item) {
        this.items.push(newItem);
    }

    toString = (): string => this.#root.toString();
    
    displayAllItems(): void {
        this.items.forEach(item => {
            console.log(item.getItemName() + ": " + item.displayProductInfo());
        });
    }

    editThisItem(itemName: string): void {
        this.items.forEach(item => {
            if(item.getItemName() == itemName) {
                this.#current = item;
                this.setItemsParent(this.#current.getItemInformation("Parent"))
            }
        });
    }

    setItemsParent(parentItem: string): void {
        this.items.forEach(item => {
            if(item.getItemName() == parentItem) {
                this.#parent = item;
            }
        });
    }

    getItemByName(itemToGet: string): Item {
        let itemToReturn: Item = null;

        this.items.forEach(item => {
            if(item.getItemName() == itemToGet) itemToReturn = item;
        });

        return itemToReturn;
    }
}





}