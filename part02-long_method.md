## Extracting Methods (not finished yet)

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