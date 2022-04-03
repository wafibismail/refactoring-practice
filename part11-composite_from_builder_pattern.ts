{
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
        let itemInformation: string = "\n" + this.#itemName + " ";

        let hashMapSize = Object.keys(this.#itemInfoHashMap).length;

        if (hashMapSize != 0) {
            itemInformation += this.displayProductInfo();
        }

        this.#children.forEach(node => {
            itemInformation += node.toString();
        });

        return itemInformation;
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

const products: ItemBuilder = new ItemBuilder("Products");

products.addChild("Produce");
products.addChild("Orange");
products.addItemInformation("Price", "$1.00");
products.addItemInformation("Stock", "100");

products.addSibling("Apple");
products.addSibling("Grape");

products.editThisItem("Products");
products.addChild("Cereal");
products.addChild("Special K");
products.addItemInformation("Price", "$4.40");
products.addSibling("Raisin Bran");
products.addItemInformation("Price", "$4.00");
products.addSibling("Fiber One");
products.addItemInformation("Price", "$4.00");

products.displayAllItems();/*
Products: Parent: Products
Produce: Parent: Products
Orange: Parent: Produce Stock: 100 Price: $1.00
Apple: Parent: Produce
Grape: Parent: Produce
Cereal: Parent: Products
Special K: Parent: Cereal Price $4.40
Raisin Bran: Parent: Cereal Price $4.00
Fiber One: Parent: Cereal Price $4.00
*/

console.log(products.getItemByName("Cereal").toString());/*
Cereal Parent: Products
Special K Parent: Cereal Price: $4.40
Raisin Bran Parent: Cereal Price: $4.00
Fiber One Parent: Cereal Price: $4.00
*/}