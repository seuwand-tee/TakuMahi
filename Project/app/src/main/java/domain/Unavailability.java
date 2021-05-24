package domain;

import java.time.Instant;
import java.util.Objects;

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

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.description);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Unavailability other = (Unavailability) obj;
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Unavailability{" + "description=" + description + '}';
    }
    
    
}
