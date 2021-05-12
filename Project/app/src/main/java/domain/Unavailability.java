package domain;

import java.time.Instant;
import java.time.ZonedDateTime;

/**
 * The Unavailability domain class.
 */
public class Unavailability extends Event {

    public enum Repeat {
        No,
        Daily,
        Weekly,
        Monthly
        // List can be extended as needed
    }

    private Repeat repeat;
    private ZonedDateTime repeatEnd; // Parse DateTimes from String in Resource.
    private String description;

    public Unavailability(){
        super();
    };

    public Unavailability(Instant start, Instant end, String repeat, String description) {
        super(start, end);
        this.repeat = Repeat.valueOf(repeat);
        this.description = description;
    }

    public Repeat getRepeat() {
        return repeat;
    }

    public void setRepeat(Repeat repeat) {
        this.repeat = repeat;
    }

    public ZonedDateTime getRepeatEnd() {
        return repeatEnd;
    }

    public void setRepeatEnd(ZonedDateTime repeatEnd) {
        this.repeatEnd = repeatEnd;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
