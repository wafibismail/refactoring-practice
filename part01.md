## Replacing Constructors with Creation Method

```Java
public class FootballPlayer {
    private double passerRating; //Specific to QBs
    private int rushingYards; //Specific to RBs & QBs
    private int receivingYards; //Specific to RBs & WRs
    private int totalTackles; //Specific to DEF
    private int interceptions; //Specific to DEF
    private int fieldGoals; //Specific to Kickers
    private double avgPunt; //Specific to Punters
    private double avgKickoffReturn; //Specific to Special Teams
    private double avgPuntReturn; //Specific to Special Teams

    FootballPlayer(double passerRating, int rushingYards) {
        this.passerRating = passerRating;
        this.rushingYards = rushingYards;
    }

    FootballPlayer(int rushingYards) {
        this.rushingYards = rushingYards;
    }

    FootballPlayer(int receivingYards) {
        this.receivingYards = receivingYards;
    }
}
```

Error occurs with the above code due to two constructors having the same attribute signature (1 int and nothing else)<br>
<br>
The solution:

```Java
public class FootballPlayer {
    private double passerRating; //Specific to QBs
    private int rushingYards; //Specific to RBs & QBs
    private int receivingYards; //Specific to RBs & WRs
    private int totalTackles; //Specific to DEF
    private int interceptions; //Specific to DEF
    private int fieldGoals; //Specific to Kickers
    private double avgPunt; //Specific to Punters
    private double avgKickoffReturn; //Specific to Special Teams
    private double avgPuntReturn; //Specific to Special Teams

    public double getPasserRating() {return this.passerRating};

    private FootballPlayer(double passerRating, int rushingYards, int receivingYards, int totalTackles, int interceptions, int fieldGoals, double avgPunt, double avgKickoffReturn, double avgPuntReturn) {
        this.passerRating = passerRating;
        this.rushingYards = rushingYards;
        this.receivingYards = receivingYards;
        this.totalTackles = totalTackles;
        this.interceptions = interceptions;
        this.fieldGoals = fieldGoals;
        this.avgPunt = avgPunt;
        this.avgKickOffReturn = avgKickoffReturn;
        this.avgPuntReturn = avgPuntReturn;
    }
    public static FootballPlayer createQB(double passerRating, int rushingYards) {
        return new FootballPlayer(passerRating, rushingYards, 0, 0, 0, 0, 0.0, 0.0, 0.0);
    }
    public static void main(String[] args){
        FootballPlayer aaronRogers = FootballPlayer.createQB(108.0, 259);
        System.out.println("Aaron Rogers' Passer Rating: "+aaronRogers.getPasserRating());
    }
}
```