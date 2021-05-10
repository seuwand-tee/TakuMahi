package domain;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * The Event abstract class. Used to define Shift and Unavailability.
 */
public abstract class Event {

    private static Integer idCount = 0; // Events will receive a unique ID per session, as they are added.
                                        // This will be handled by the database later.

    private Integer eventID;
    private User user;
    private ZonedDateTime start; // Parse DateTimes from String in Resource.
    private ZonedDateTime end;

    public Event(){
        eventID = idCount;
        idCount++;
    };

    public Event(Instant start, Instant end) {
        eventID = idCount;
        idCount++;
        ZonedDateTime strt = start.atZone(ZoneId.of("Pacific/Auckland"));
        ZonedDateTime nd = end.atZone(ZoneId.of("Pacific/Auckland"));
        this.start = strt;
        this.end = nd;
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
