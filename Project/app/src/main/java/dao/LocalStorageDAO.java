package dao;

import domain.*;

import com.google.common.collect.Multimap;
import com.google.common.collect.HashMultimap;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.beans.Beans.isInstanceOf;

/**
 * This is the DAO class for the project pre database.
 * The data is stored in Maps while the session is running.
 */
public class LocalStorageDAO {

    // User access
    private static Multimap<User.Department, User> usersByDepartment = HashMultimap.create();
    private static Multimap<User.Role, User> usersByRole = HashMultimap.create();
    private static Map<Integer, User> usersByID = new HashMap<>();

    // Event access
    private static Map<Integer, Event> eventsByID = new HashMap<>();
    private static Multimap<LocalDate, Event> eventsByDate = HashMultimap.create();
    private static Multimap<User, Shift> shiftsByUser = HashMultimap.create();
    private static Multimap<User, Unavailability> unavailabilityByUser = HashMultimap.create();
    private static Map<Integer, Shift> openShifts = new HashMap<>();

    public LocalStorageDAO() {
        User userOne;
        userOne = new User();
        userOne.setUsername("jimmy10p");
        userOne.setIdNumber(1);
        userOne.setRole(User.Role.Casual);
        userOne.setDepartment(User.Department.StudentIT);
        userOne.setFirstName("Jimmy");
        userOne.setLastName("Bob");
        userOne.setEmailAddress("jim.bob@otago.ac.nz");

        Unavailability unavailabilityOne;
        unavailabilityOne = new Unavailability();
        unavailabilityOne.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 16, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 20, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setRepeatEnd(ZonedDateTime.of(LocalDateTime.of(2020, 5, 20, 0, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setDescription("Ain't nobody got time for dat");

        Unavailability unavailabilityTwo;
        unavailabilityTwo = new Unavailability();
        unavailabilityTwo.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 16, 7, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 16, 11, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setDescription("Ain't nobody got time for dat");

        addUser(userOne);
        addUnavailabilityToUser(1, unavailabilityOne);
        addUnavailabilityToUser(1, unavailabilityTwo);
    }

    /**
     * This adds a User object to the relevant collections, based on ID, Role, and Department.
     * @param user The User object to be added.
     */
    public void addUser(User user) {
        usersByID.put(user.getIdNumber(), user);
        usersByRole.put(user.getRole(), user);
        usersByDepartment.put(user.getDepartment(), user);
    }

    /**
     * This deletes a User from the relevant collections.
     * First the user's currently assigned shifts are relocated to the OpenShifts collection
     * and removed from the ShiftsByUser collection. Their Unavailability events are deleted from
     * the UnavailabilityByUser collection. And then they are removed from all User collections.
     * @param id The ID value for the User being deleted.
     */
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

    /**
     * This adds a Shift Event to the OpenShifts collection.
     * It also adds the shift to event collections grouped by ID and starting date.
     * @param shift The Shift object to be added.
     */
    public void addToOpenShifts(Shift shift) {
        openShifts.put(shift.getEventID(), shift);
        eventsByID.put(shift.getEventID(), shift);
        eventsByDate.put(shift.getStart().toLocalDate(), shift);
    }

    /**
     * This deletes a Shift from the OpenShifts collection.
     * It also deletes the shift from the event collections.
     * @param eventID The EventID for the shift.
     */
    public void deleteFromOpenShifts(Integer eventID) {
        Shift s = openShifts.get(eventID);
        eventsByID.remove(eventID);
        eventsByDate.remove(s.getStart().toLocalDate(), s);
        openShifts.remove(eventID);
    }

    /**
     * This assigns a Shift from the OpenShifts collection to a specific User.
     * The shift is added to the ShiftsByID collection and is then removed from the OpenShifts collection.
     * This process also adds the User as a field in the Event.
     * @param userID The ID for the user receiving the shift.
     * @param shiftID The ID for the shift being assigned.
     */
    public void assignShiftToUser(Integer userID, Integer shiftID) {
        Shift s = openShifts.get(shiftID);
        User u = usersByID.get(userID);
        s.setUser(u);
        shiftsByUser.put(u, s);
        openShifts.remove(shiftID);
    }

    /**
     * This removes a assigned shift from a user and re-adds it to the OpenShifts collection.
     * The user field in the Event is also set to null.
     * @param userID The ID for the user the shift is being removed from.
     * @param eventID The ID for the shift being removed.
     */
    public void removeShiftFromUser(Integer userID, Integer eventID) {
        Shift s = (Shift) eventsByID.get(eventID);
        User u = usersByID.get(userID);
        shiftsByUser.remove(u, s);
        s.setUser(null);
        openShifts.put(eventID, s);
    }

    /**
     * This adds a Unavailability for a specified User.
     * The event is added to the UnavailabilityByUser collection, and the event grouping collections.
     * @param userID The ID of the User.
     * @param unavailability The Unavailability being added.
     */
    public void addUnavailabilityToUser(Integer userID, Unavailability unavailability) {
        User u = usersByID.get(userID);
        unavailability.setUser(u);
        unavailabilityByUser.put(u, unavailability);
        eventsByID.put(unavailability.getEventID(), unavailability);
        eventsByDate.put(unavailability.getStart().toLocalDate(), unavailability);
    }

    /**
     * This deletes a Unavailability from the specified user.
     * The event is also removed from the event grouping collections.
     * @param userID The ID of the User.
     * @param eventID The EventID of the Unavailability.
     */
    public void deleteUnavailabilityFromUser(Integer userID, Integer eventID) {
        User u = usersByID.get(userID);
        Unavailability un = (Unavailability) eventsByID.get(eventID);
        unavailabilityByUser.remove(u, un);
        eventsByDate.remove(un.getStart().toLocalDate(), un);
        eventsByID.remove(eventID);
    }

    /**
     * This returns a Collection of events relevant to a given user, over a given period.
     * @param userID The ID of the user that the events belong to.
     * @param startOfPeriod The Start Date of the period you are interested in.
     * @param daysInPeriod The amount of days you want the period to be.
     * @param filter Filter decides which events get returned. 0 is all, 1 is Shift, and 2 is Unavailability.
     * @return Returns a Collection of type Event. If no events fit criteria the Collection will be empty.
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
                    if (e.getUser() != null) {
                        if (e.getUser().getIdNumber().equals(userID)) {
                            usersEvents.add(e);
                        }
                    }
                }
                break;
            case 1:
                for (Event e : events) {
                    if (e.getUser() != null) {
                        if (e.getUser().getIdNumber().equals(userID) && isInstanceOf(e, Shift.class)) {
                            usersEvents.add(e);
                        }
                    }
                }
                break;
            case 2:
                for (Event e : events) {
                    if (e.getUser() != null) {
                        if (e.getUser().getIdNumber().equals(userID) && isInstanceOf(e, Unavailability.class)) {
                            usersEvents.add(e);
                        }
                    }
                }
                break;
        }
        return usersEvents;
    }

    /**
     * This will return the amount of hours a User has been assigned for a given period.
     * It takes advantage of the getUserEventsForPeriod method. Where it will get all events of type Shift
     * for a User. It will then calculate the length of each shift in hours and sum this amount.
     * @param userID The ID of the User.
     * @param startOfPeriod The Start Date of the period you are interested in.
     * @param daysInPeriod The amount of days in the period.
     * @return Returns a Integer value representing the sum of hours assigned.
     */
    public Integer getUserHoursForPeriod(Integer userID, LocalDate startOfPeriod, int daysInPeriod) {
        Collection<Event> shifts = getUserEventsForPeriod(userID, startOfPeriod, daysInPeriod, 1);
        int sum = 0;
        for (Event e : shifts) {
            int diff = (int) e.getStart().until(e.getEnd(), ChronoUnit.HOURS);
            sum += diff;
        }
        return sum;
    }

    /**
     * This returns whether or not a User is in the DAO.
     * @param userID The ID of the User.
     * @return Returns true if the user is located, false if not.
     */
    public boolean userExists(Integer userID) {
        return usersByID.containsKey(userID);
    }
    
    /**
     * @return Returns all Users in the DAO.
     */
    public Collection<User> getAllUsers() {
        return usersByID.values();
    }

    /**
     * @param userID The ID of the User.
     * @return Returns the User object with that ID.
     */
    public User getUserByID(Integer userID) {
        return usersByID.get(userID);
    }

    /**
     * @param role The User Role value.
     * @return Returns all User objects in the DAO with that Role.
     */
    public Collection<User> getUsersByRole(User.Role role) {
        return usersByRole.get(role);
    }

    /**
     * @param department The User Department value.
     * @return Returns all Users in the DAO with that Department.
     */
    public Collection<User> getUsersByDepartment(User.Department department) {
        return usersByDepartment.get(department);
    }

    /**
     * @param userID The ID of the User.
     * @return Returns all shifts assigned to that User.
     */
    public Collection<Shift> getShiftsByUser(Integer userID) {
        return shiftsByUser.get(usersByID.get(userID));
    }

    /**
     * @param userID The ID of the User.
     * @return Returns all unavailability events for that User.
     */
    public Collection<Unavailability> getUnavailabilityByUser(Integer userID) {
        return unavailabilityByUser.get(usersByID.get(userID));
    }

    /**
     * @return Returns all the Open Shifts.
     */
    public Collection<Shift> getOpenShifts() {
        return openShifts.values();
    }
    
    /**
     * @param eventID The ID of the User.
     * @return Returns the event object with that ID.
     */
    public Event getEventByID(Integer eventID) {
        return eventsByID.get(eventID);
    }

    /**
     * @param eventID The EventID to check.
     * @return Returns whether or not a event exists in the DAO.
     */
    public boolean eventExists(Integer eventID) {
        return eventsByID.containsKey(eventID);
    }

    /**
     * WARNING: WILL WIPE ALL DATA.
     * This method resets all the collections in the DAO.
     */
    public void resetDAO() {
        // User access
        usersByDepartment = HashMultimap.create();
        usersByRole = HashMultimap.create();
        usersByID = new HashMap<>();

        // Event access
        eventsByID = new HashMap<>();
        eventsByDate = HashMultimap.create();
        shiftsByUser = HashMultimap.create();
        unavailabilityByUser = HashMultimap.create();
        openShifts = new HashMap<>();
    }

}
