## Extracting Methods (not finished yet)

```Java
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

//------------------------------------------------
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
            //to be continued https://youtu.be/50miLglyGJQ?t=102
        }
    }
}
```