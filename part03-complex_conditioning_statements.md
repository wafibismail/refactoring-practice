# Using Variables to Write Understandable Code

- The approach to use when method extraction is not an option

Example (of using an "explaining variable"):

```Java
//Source

//Product.java
public class Product {

    private String name = "";
    private double price = 0.0;
    private double shippingCost = 0.0;
    private int quantity = 0;
    
    public String getName(){ return name; }
    public double getPrice(){ return price; }
    public double getShippingCost(){ return shippingCost; }
    public int quantity(){ return quantity; }

    Product(String name, double price, double shippingCost, int quantity){
        this.name = name;
        this.price = price;
        this.shippingCost = shippingCost;
        this.quantity = quantity;
    }

    public double getTotalCost(){
        
        double quantityDiscount = 0.0;

        if((quantity > 50) || ((quantity * price) > 500)) {

            quantityDiscount = .10;

        } else if((quantity > 25) || ((quantity * price) > 100)) {

            quantityDiscount = .07;

        } else if((quantity >= 10) || ((quantity * price) > 50)) {

            quantityDiscount = .05;

        }
    }

    double discount = ((quantity -1) * quantityDiscount) * price;

    return (quantity * price) + (quantity * shippingCost) - discount;

}

//Store.java
import java.util.ArrayList;

public class Store {

    public ArrayList<Product> theProducts = new ArrayList<Product>();

    public void addAProduct(Product newProduct){

        theProducts.add(newProduct);

    }

    public void getCostOfProducts(){

        for(Product product : theProducts){

            System.out.println("Total cost for " + product.getQuantity() + " " + product.getName() + "s is $" + product.getTotalCost());

            System.out.println("Cost per product " + product.getTotalCost() / product.getQuantity());

            System.out.println("Savings per product " + ((product.getPrice() + product.getShippingCost()) - (product.getTotalCost() / product.getQuantity())) + "\n");
        }
    }

    public static void main(String[] args){

        Store cornerStore = new Store();

        cornerStore.addAProduct(new Product("Pizza", 10.00, 1.00, 52));

        cornerStore.addAProduct(new Product("Pizza", 10.00, 1.00, 26));

        cornerStore.addAProduct(new Product("Pizza", 10.00, 1.00, 10));

        cornerStore.getCostOfProducts();

    }
}
```

Looking closely at the method Product.getTotalCost, the expressions (which can't be further extracted into methods) can be made to make more sense by saving them into variables that can be referred to.

```Java
//Before
public double getTotalCost(){
        
    double quantityDiscount = 0.0;

    if((quantity > 50) || ((quantity * price) > 500)) {

        quantityDiscount = .10;

    } else if((quantity > 25) || ((quantity * price) > 100)) {

        quantityDiscount = .07;

    } else if((quantity >= 10) || ((quantity * price) > 50)) {

        quantityDiscount = .05;

    }

    double discount = ((quantity -1) * quantityDiscount) * price;

    return (quantity * price) + (quantity * shippingCost) - discount;

}
```

```Java
//After
public double getTotalCost(){
        
    double quantityDiscount = 0.0;

    final boolean over50Products = (quantity > 50) || ((quantity * price) > 500);
    final boolean over25Products = (quantity > 25) || ((quantity * price) > 100);
    final boolean over10Products = (quantity >= 10) || ((quantity * price) > 50);

    if(over50Products) {

        quantityDiscount = .10;

    } else if(over25Products) {

        quantityDiscount = .07;

    } else if(over10Products) {

        quantityDiscount = .05;

    }

    double discount = ((quantity -1) * quantityDiscount) * price;

    return (quantity * price) + (quantity * shippingCost) - discount;

}
```

As can be seen above, extracting the conditional statements into explaining variables makes the code more understandable <br>
<br>

Another example of using explaining variables, but now in the case of using them for complicated calculations that can't be extracted into methods:

```Java
//BEFORE - Store.getCostOfProducts
public void getCostOfProducts(){

    for(Product product : theProducts){

        System.out.println("Total cost for " + product.getQuantity() + " " + product.getName() + "s is $" + product.getTotalCost());

        System.out.println("Cost per product " + product.getTotalCost() / product.getQuantity());

        System.out.println("Savings per product " + ((product.getPrice() + product.getShippingCost()) - (product.getTotalCost() / product.getQuantity())) + "\n");

    }

}
```

```Java
//AFTER - Store.getCostOfProducts
public void getCostOfProducts(){

    for(Product product : theProducts){

        final int numOfProducts = product.getQuantity();
        final String prodName = product.getName();
        final double cost = product.getTotalCost();

        final double costWithDiscount = cost / numOfProducts;
        final double costWithoutDiscount = product.getPrice() + product.getShippingCost();
    
        System.out.println("Total cost for " + numOfProducts + " " + prodName + "s is $" + cost);

        System.out.println("Cost per product " + cost / numOfProducts);

        System.out.println("Savings per product " + (costWithoutDiscount - costWithDiscount) + "\n");

    }

}
```

After refactoring by extracting the calculations into explaining variables, the code is not only shorter, but also much more understandable.


## About temporary variable - why is it bad to assign many values to them?

Temporary variable:
- Don't assign multiple different values to it
- Always name them descriptively

```Java
//bad code
double temp = totalCost / numberOfProducts; // Individual Product Cost

temp = temp + shipping; // Individual Product Cost + Shipping

temp = temp - discount; // Individual Product Cost + Shipping / discount
```

The problem with the code above is that it is likely that it cannot be remembered easily e.g. when returning to the code years from when it's written. <br>

```Java
//clean code
double indivProductCost = totalCost / numberOfProducts;

double prodCostAndShipping = indivProductCost + shipping;

double discountedProductCost = prodCostAndShipping - discount;
```

Longer variable name, but more easily understandable especially in the long term.

### Another DON'T - DON'T assign values to parameters passed in methods

```Java
public double getTotPrice(double quantity, double price, double shippingCost, double discount){

    price = price + shippingCost;
    price = price * quantity;
    return price - discount;
}
```

The code snippet above may look convenient, but codes written this way can get very difficult to understand. Better to use temporary variables with descriptive names instead.