## Extracting Methods

Points (uses of method extractions):
- Turn code fragments into methods with descriptive names
- Make code as readable as comments

```Java
//FootballPlayer class definition
public class FootballPlayer {
    private String name = "";
    private double[] fortyYardDashTimes = null;

    public String getName() { return name; }

    public double[] get40YardDashTimes() {return fortyYardDashTimes; }

    FootballPlayer(String name, double[] fortyYardDashTimes) {
        this.name = name;
        this.fortyYardDashTimes = fortyYardDashTimes;
    }
}

//main class
import java.util.ArrayList;
public class FootballPlayer40YardDashInfo {
    ArrayList<FootballPlayer> players = new ArrayList<FootballPlayer>();

    public void addFootballPlayer(FootballPlayer player){
        players.add(player);
    }

    public void printPlayerInfo() {
        double avg40YdTime = 0.0;

        System.out.printf("%-15s %15s", "Name", "Avg 40 Times\n");

        //Print dashes under titles
        for(int i = 0; i < 30; i++) { System.out.print("_"); }

        System.out.println();

        for(FootballPlayer player : players) {
            System.out.printf("%-19s", player.getName());
    
            double total40YdDashTimes = 0.0;
            double[] fortyYardDashTimes = player.get40YdDashTimes();
    
            for(int i = 0; i < player.get40YardDashTimes().length; i++) {
                total40YardDashTimes += fortyYardDashTimes[i];
            }
    
            avg40YdTime = total40YdDashTimes / player.get40YdDashTimes().length;
            
            System.out.printf("%1$.2f", avg40YdTime);
            
            System.out.println();
        }
    }
    public static void main(String[] args) {
        FootballPlayer40YardDashInfo fb40Dash = new FootballPlayer40YardDashInfo();

        //E.g. add Clark Kent

        double cKent40YdDashTimes[] = {4.36, 4.39, 4.41};
        FootballPlayer clarkKent = new FootballPlayer("Clark Kent", cKent40YdDashTimes);
        fb40Dash.addFootballPlayer(clarkKent);
    }
}
```

The FootballPlayer40YardDashInfo.printPlayerInfo method is quite long. Some parts could be extracted into separate methods with separate names.

```Java
//Original printPlayerInfo method
public void printPlayerInfo() {
    double avg40YdTime = 0.0;

    System.out.printf("%-15s %15s", "Name", "Avg 40 Times\n");

    //Print dashes under titles
    for(int i = 0; i < 30; i++) { System.out.print("_"); }

    System.out.println();

    for(FootballPlayer player : players) {
        System.out.printf("%-19s", player.getName());

        double total40YdDashTimes = 0.0;
        double[] fortyYardDashTimes = player.get40YdDashTimes();

        for(int i = 0; i < player.get40YardDashTimes().length; i++) {
            total40YardDashTimes += fortyYardDashTimes[i];
        }

        avg40YdTime = total40YdDashTimes / player.get40YdDashTimes().length;
        
        System.out.printf("%1$.2f", avg40YdTime);
        
        System.out.println();
    }
}
```

```Java
//printPlayerInfo - After extracting code fragments that "print the column titles" and which "prints player avg's" into separate methods
public void printPlayerInfo() {
    printTitles();

    printPlayersWith40Avg()
}

public void printTitles() {
    System.out.printf("%-15s %15s", "Name", "Avg 40 Times\n");

    //Print dashes under titles
    for(int i = 0; i < 30; i++) { System.out.print("_"); }

    System.out.println();
}

public void printPlayersWith40Avg() {
    for(FootballPlayer player : players) {
        System.out.printf("%-19s", player.getName());

        double total40YdDashTimes = 0.0;
        double[] fortyYardDashTimes = player.get40YdDashTimes();

        for(int i = 0; i < player.get40YardDashTimes().length; i++) {
            total40YardDashTimes += fortyYardDashTimes[i];
        }

        double avg40YdTime = total40YdDashTimes / player.get40YdDashTimes().length;
        
        System.out.printf("%1$.2f", avg40YdTime);

        System.out.println();
    }
}
```

Still, after extraction, there are still some fragments of code that can be extracted into methods with descriptive names, e.g. the code to print dashes multiple times.

```Java
//printPlayerInfo - After further method extraction
public void printPlayerInfo() {
    printTitles();

    printPlayersWith40Avg()
}

public void printTitles() {
    System.out.printf("%-15s %15s", "Name", "Avg 40 Times\n");

    printCharMultTimes('_', 30);
}

public void printCharMultTimes(char charToPrint, int howManyTimes) {
    //Print dashes under titles
    for(int i = 0; i < howManyTimes; i++) { System.out.print(char); }

    System.out.println();
}

public void printPlayersWith40Avg() {
    for(FootballPlayer player : players) {
        System.out.printf("%-19s", player.getName());

        double total40YdDashTimes = 0.0;
        double[] fortyYardDashTimes = player.get40YdDashTimes();

        for(int i = 0; i < player.get40YardDashTimes().length; i++) {
            total40YardDashTimes += fortyYardDashTimes[i];
        }

        double avg40YdTime = total40YdDashTimes / player.get40YdDashTimes().length;
        
        System.out.printf("%1$.2f", avg40YdTime);

        System.out.println();
    }
}
```

### Another example:

```Java
//Original code: 6 lines long
public static void main(String[] args) {
    double average = 0.0;
    double[] dashTimes {4.36, 4.39, 4.41};
    for(int i = 0; i < dashTimes.length; i++){
        totalDashTimes += dashTimes[i];
    }
    average = totalDashTimes / dashTimes.length;
}
```

Question: How do we keep the local variable "average" easy to deal with while extracting the rest of the code?

```Java
//Refactored: 2 lines of code
public static void main(String[] args) {
    double[] dashTimes {4.36, 4.39, 4.41};
    double average = getAvgDashTime(dashTimes);
}
//Try to keep methods between 5 to 10 lines long, with descriptive names
public static double getAvgDashTime(double[] dashTimes){
    double totalDashTimes = 0.0;
    for(int i = 0; i < dashTimes.length; i++){
        totalDashTimes += dashTimes[i];
    }
    return totalDashTimes / dashTimes.length;
}
```

## When to NOT extract methods:

- If the code is clear as a method (extracting does not make it more understandable), e.g.:

```Java
//With method extraction
public static void main(String[] args) {
    String inTop15 = checkIfInTop15(avg40YdTime) ? " *Top 15\n" : "\n";
}
public static boolean checkIfInTop15(double avg40YdTime) {
    return avg40YdTime < 4.41;
}
```

When compared to:

```Java
//Without method extraction
public static void main(String[] args) {
    String inTop15 = (avg40YdTime < 4.41) ? " *Top 15\n" : "\n";
}
```

It is evident that extracting the boolean expression into a method does not make the code clearer. In fact it does the opposite. <br>
In cases like this e.g. doing conditionals in expressions, it is better to just leave the code in one place.

## Temps

When to get rid of temps?
- The temp is used once and doesn't add to understanding (example below)
- The temp holds the value of an expression

```Java
//Original
public static void main(String[] args) {
    double dashTime = 4.50;

    final double avg40YdDash = getAvgDashTime();

    String dashGrade = ((dashTime <= avg40YdDash) ? "Good" : "Bad");

    System.out.println("That was a " + dashGrade + " time)
}
```

```Java
//Refactored
public static void main(String[] args) {
    double dashTime = 4.50;

    String dashGrade = ((dashTime <= getAvgDashTime()) ? "Good" : "Bad");

    System.out.println("That was a " + dashGrade + " time)
}
```

#### Replacing temp variables with a query

```Java
public static void main(String[] args) {
    //...
    double avgDashTime = totalDashTime / totalDashes;

    if(avgDashTime > 4.41){
        System.out.println("Average Time");
    }
}
```

```Java
public static void main(String[] args) {
    //...
    if(avgDashTime() > 4.41){
        System.out.println("Average Time");
    }
}
public static double avgDashTime(){
    return totalDashTime / totalDashes;
}
```

The latter does not make the code less understandable. It is just as understandable as the original code with the advantage of bringing the expression elsewhere so the overall code is more understandable.