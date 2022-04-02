# Extracting Methods, Fields, Classes

```Java
public class Customer {
    private String firstName = "";
    private String lastName = "";
    private String street = "";
    private String city = "";
    private String state = "";
    private int postalCode = 0;
    private String birthDay = "";

    //Note in Eclipse IDE, there's a shortcut to generate getters, setters & constructors

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public int getPostalCode() {
        return postalCode;
    }
    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }
    public String getBirthDay() {
        return birthDay;
    }
    public void setBirthDay(String birthDay) {
        this.birthDay = birthDay;
    }
    public Customer(String firstName, String lastName, String street, String city, String state, int postalCode, String birthDay) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.birthDay = birthDay;
    }
}
```

The problem is that the class is getting too big. <br>
<br>
Some of the information can be extracted into a separate class, (including moving methods and fields over). How?
- Look for (to be continued from 2nd minute of part 4 of the playlist)