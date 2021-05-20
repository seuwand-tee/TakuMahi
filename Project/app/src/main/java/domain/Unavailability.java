package domain;

import java.time.Instant;

/**
 * The Unavailability domain class.
 */
public class Unavailability extends Event {

    private String description;

    public Unavailability(){
        super();
    };

    public Unavailability(Instant start, Instant end, String description) {
        super(start, end);
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
