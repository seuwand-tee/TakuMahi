package domain;

import java.time.ZonedDateTime;

public abstract class Event {

    private static Integer idCount = 0;

    private Integer eventID;
    private User user;
    private ZonedDateTime start;
    private ZonedDateTime end;

    public Event(){};

    public Event(ZonedDateTime start, ZonedDateTime end) {
        eventID = idCount;
        idCount++;
        this.start = start;
        this.end = end;
    }

    public Integer getEventID() {
        return eventID;
    }

    public void setEventID(Integer eventID) {
        this.eventID = eventID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ZonedDateTime getStart() {
        return start;
    }

    public void setStart(ZonedDateTime start) {
        this.start = start;
    }

    public ZonedDateTime getEnd() {
        return end;
    }

    public void setEnd(ZonedDateTime end) {
        this.end = end;
    }

}
