package domain;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * The Event abstract class. Used to define Shift and Unavailability.
 */
public abstract class Event {

    private static Integer idCount = 0; // Events will receive a unique ID per session, as they are added.
                                        // This will be handled by the database later.

    private Integer eventID;
    private User user;
    private LocalDateTime start; // Parse DateTimes from String in Resource.
    private LocalDateTime end;

    public Event(){
        eventID = idCount;
        idCount++;
    };

    public Event(Instant start, Instant end) {
        eventID = idCount;
        idCount++;
        ZoneId z =(ZoneId.of("Pacific/Auckland"));
        LocalDateTime strt = LocalDateTime.ofInstant(start, z);
        LocalDateTime nd = LocalDateTime.ofInstant(end, z);
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

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 43 * hash + Objects.hashCode(this.eventID);
        hash = 43 * hash + Objects.hashCode(this.user);
        hash = 43 * hash + Objects.hashCode(this.start);
        hash = 43 * hash + Objects.hashCode(this.end);
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
        final Event other = (Event) obj;
        if (!Objects.equals(this.eventID, other.eventID)) {
            return false;
        }
        if (!Objects.equals(this.user, other.user)) {
            return false;
        }
        if (!Objects.equals(this.start, other.start)) {
            return false;
        }
        if (!Objects.equals(this.end, other.end)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Event{" + "eventID=" + eventID + ", user=" + user + ", start=" + start + ", end=" + end + '}';
    }

    
    
}
