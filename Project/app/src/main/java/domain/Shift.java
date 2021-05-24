package domain;

import java.time.Instant;
import java.util.Objects;

/**
 * The Shift domain class.
 */
public class Shift extends Event {

    public enum Type {
        Round,
        Assistant,
        Senior,
        External
        // List can be extended as needed.
    }

    private String name;
    private String description;
    private String notes;
    private Type type;

    public Shift(){};

    public Shift(Instant start, Instant end, String name, String description, String notes, String type) {
        super(start, end);
        this.name = name;
        this.description = description;
        this.notes = notes;
        this.type = Type.valueOf(type);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + Objects.hashCode(this.name);
        hash = 47 * hash + Objects.hashCode(this.description);
        hash = 47 * hash + Objects.hashCode(this.notes);
        hash = 47 * hash + Objects.hashCode(this.type);
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
        final Shift other = (Shift) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.notes, other.notes)) {
            return false;
        }
        if (this.type != other.type) {
            return false;
        }
        return true;
    }
    
    

}
