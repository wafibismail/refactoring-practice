{
/*
    Abstract class used here to not force subclasses to create methods inside of it
*/
abstract class ProductComponent {
    add(newProductComponent: ProductComponent): void {};
    remove(newProductComponent: ProductComponent): void {};

    getProductComponent(componentIndex: number): ProductComponent { return null; }
    getProductGroupName(): string { return null; }

    abstract displayProductInfo(): void;
}

class ProductGroup extends ProductComponent {
    productComponents: ProductComponent[] = [];
    #productGroupName: string;

    constructor(productGroupName: string) {
        super();
        this.#productGroupName = productGroupName;
    }

    add(newProductComponent: ProductComponent): void {
        this.productComponents.push(newProductComponent);
    }

    remove(newProductComponent: ProductComponent): void {
        this.productComponents = this.productComponents.filter(pc => pc != newProductComponent);
    }

    getProductComponent(componentIndex: number): ProductComponent {
        return this.productComponents[componentIndex];
    }

    getProductGroupName(): string {
        return this.#productGroupName;
    }

    displayProductInfo(): void {
        console.log(this.getProductGroupName());

        this.productComponents.forEach(productInfo => {
            productInfo.displayProductInfo();
        });

        console.log("");
    };
}

class Product extends ProductComponent {
    #productName: string;
    #productPrice: number;

    constructor(productName :string, productPrice: number) {
        super();
        this.#productName = productName;
        this.#productPrice = productPrice;
    }

    getProductName = (): string => this.#productName;
    setProductName(productName: string) {
        this.#productName = productName;
    }
    getProductPrice = (): number => this.#productPrice;
    setProductPrice(productPrice: number) {
        this.#productPrice = productPrice;
    }

    displayProductInfo(): void {
        console.log(this.getProductName() + " $" + this.getProductPrice());
    }
}

const produce: ProductComponent = new ProductGroup("Produce");
const cereal: ProductComponent = new ProductGroup("Cereal");

const everyProduct: ProductComponent = new ProductGroup("All Products\n");

everyProduct.add(produce);
everyProduct.add(cereal);

produce.add(new Product("Tomato", 1.99));
produce.add(new Product("Orange", .99));
produce.add(new Product("Potato", .35));

cereal.add(new Product("Special K", 3.58));
cereal.add(new Product("Cheerios", 3.58));
cereal.add(new Product("Raisin Bran", 3.58));

everyProduct.displayProductInfo();/*

All Products

Produce
Tomato $1.99
Orange $0.99
Potato $0.35

Cereal
Special K $3.58
Cheerios $3.58
Raisin Bran $3.58
*/}