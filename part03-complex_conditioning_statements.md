# [Not yet finished] Using Variables to Write Understandable Code

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

As can be seen avode, extracting the conditional statements into explaining variables makes the code more understandable <br>
<br>

