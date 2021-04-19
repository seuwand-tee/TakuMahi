package domain;

import java.time.ZonedDateTime;

public class Unavailability extends Event {

    public enum Repeat {
        Daily,
        Weekly,
        Monthly
    }

    private Repeat repeat;
    private String description;

    public Unavailability(){};

    public Unavailability(ZonedDateTime start, ZonedDateTime end, Repeat repeat, String description) {
        super(start, end);
        this.repeat = repeat;
        this.description = description;
    }

    public Repeat getRepeat() {
        return repeat;
    }

    public void setRepeat(Repeat repeat) {
        this.repeat = repeat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
