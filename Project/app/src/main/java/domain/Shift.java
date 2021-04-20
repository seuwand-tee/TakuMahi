package domain;

import java.time.ZonedDateTime;

public class Shift extends Event {

    public enum Type {
        Round,
        Assistant,
        Senior,
        External
    }

    private String name;
    private String description;
    private String notes;
    private Type type;

    public Shift(){};

    public Shift(ZonedDateTime start, ZonedDateTime end, String name, String description, String notes, Type type) {
        super(start, end);
        this.name = name;
        this.description = description;
        this.notes = notes;
        this.type = type;
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

}
