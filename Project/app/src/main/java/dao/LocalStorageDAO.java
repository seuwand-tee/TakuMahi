package dao;

import domain.*;

import com.google.common.collect.Multimap;
import com.google.common.collect.HashMultimap;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.*;

import static java.beans.Beans.isInstanceOf;

public class LocalStorageDAO {

    // User access
    public static final Multimap<User.Department, User> usersByDepartment = HashMultimap.create();
    public static final Multimap<User.Role, User> usersByRole = HashMultimap.create();
    public static final Map<Integer, User> usersByID = new HashMap<>();

    // Event access
    public static final Map<Integer, Event> eventsByID = new HashMap<>();
    public static final Multimap<LocalDate, Event> eventsByDate = HashMultimap.create();
    public static final Multimap<User, Shift> shiftsByUser = HashMultimap.create();
    public static final Multimap<User, Unavailability> unavailabilityByUser = HashMultimap.create();
    public static final Map<Integer, Shift> openShifts = new HashMap<>();

    public void addUser(User user) {
        usersByID.put(user.getIdNumber(), user);
        usersByRole.put(user.getRole(), user);
        usersByDepartment.put(user.getDepartment(), user);
    }

    public void deleteUserByID(Integer id) {
        User u = usersByID.get(id);
        Collection<Shift> s = shiftsByUser.get(u);
        for (Shift sh : s) {
            openShifts.put(sh.getEventID(), sh);
        }
        shiftsByUser.removeAll(u);
        unavailabilityByUser.removeAll(u);
        usersByDepartment.remove(u.getDepartment(), u);
        usersByRole.remove(u.getRole(), u);
        usersByID.remove(id);
    }

    public void addToOpenShifts(Shift shift) {
        openShifts.put(shift.getEventID(), shift);
        eventsByID.put(shift.getEventID(), shift);
        eventsByDate.put(shift.getStart().toLocalDate(), shift);
    }

    public void deleteFromOpenShifts(Integer eventID) {
        Shift s = openShifts.get(eventID);
        eventsByID.remove(eventID);
        eventsByDate.remove(s.getStart().toLocalDate(), s);
        openShifts.remove(eventID);
    }

    public void assignShiftToUser(User user, Integer shiftID) {
        Shift s = openShifts.get(shiftID);
        s.setUser(user);
        shiftsByUser.put(user, s);
        openShifts.remove(shiftID);
    }

    public void removeShiftFromUser(User user, Integer eventID) {
        Shift s = (Shift) eventsByID.get(eventID);
        shiftsByUser.remove(user, s);
        s.setUser(null);
        openShifts.put(eventID, s);
    }

    public void addUnavailabilityToUser(User user, Unavailability unavailability) {
        unavailability.setUser(user);
        unavailabilityByUser.put(user, unavailability);
        eventsByID.put(unavailability.getEventID(), unavailability);
        eventsByDate.put(unavailability.getStart().toLocalDate(), unavailability);
    }

    public void deleteUnavailabilityFromUser(User user, Integer eventID) {
        Unavailability un = (Unavailability) eventsByID.get(eventID);
        unavailabilityByUser.remove(user, un);
        eventsByDate.remove(un.getStart().toLocalDate(), un);
        eventsByID.remove(eventID);
    }

    /**
     *
     * @param userID
     * @param startOfPeriod
     * @param daysInPeriod
     * @param filter Filter decides which events get returned. 0 is all, 1 is Shift, and 2 is Unavailability.
     * @return
     */
    public Collection<Event> getUserEventsForPeriod(Integer userID, LocalDate startOfPeriod, int daysInPeriod, int filter) {
        Collection<Event> events = new ArrayList<>();
        Collection<Event> usersEvents = new ArrayList<>();
        for (int i = 0; i < daysInPeriod; i++) {
            events.addAll(eventsByDate.get(startOfPeriod.plusDays(i)));
        }
        switch (filter){
            case 0:
                for (Event e : events) {
                    if (e.getUser().getIdNumber() == userID) {
                        usersEvents.add(e);
                    }
                }
                break;
            case 1:
                for (Event e : events) {
                    if (e.getUser().getIdNumber() == userID && isInstanceOf(e, Shift.class)) {
                        usersEvents.add(e);
                    }
                }
                break;
            case 2:
                for (Event e : events) {
                    if (e.getUser().getIdNumber() == userID && isInstanceOf(e, Unavailability.class)) {
                        usersEvents.add(e);
                    }
                }
                break;
        }
        return usersEvents;
    }

    public Integer getUserHoursForPeriod(Integer userID, LocalDate startOfPeriod, int daysInPeriod) {
        Collection<Event> shifts = getUserEventsForPeriod(userID, startOfPeriod, daysInPeriod, 1);
        int sum = 0;
        for (Event e : shifts) {
            int diff = (int) e.getStart().until(e.getEnd(), ChronoUnit.HOURS);
            sum += diff;
        }
        return sum;
    }

    public boolean userExists(String id) {
        return usersByID.containsKey(id);
    }

    public Collection<User> getAllUsers() {
        return usersByID.values();
    }

    public User getUserByID(String id) {
        return usersByID.get(id);
    }

    public Collection<User> getUsersByRole(User.Role role) {
        return usersByRole.get(role);
    }

    public Collection<User> getUsersByDepartment(User.Department department) {
        return usersByDepartment.get(department);
    }

    public Collection<Shift> getShiftsByUser(User user) {
        return shiftsByUser.get(user);
    }

    public Collection<Unavailability> getUnavailabilityByUser(User user) {
        return unavailabilityByUser.get(user);
    }

    public Collection<Shift> getOpenShifts() {
        return openShifts.values();
    }

}
