/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import domain.Event;
import domain.Shift;
import domain.Unavailability;
import domain.User;
import java.time.LocalDate;
import java.util.Collection;

/**
 *
 * @author User
 */
public interface DAO {

    /**
     * This adds a Shift Event to the OpenShifts collection.
     * It also adds the shift to event collections grouped by ID and starting date.
     * @param shift The Shift object to be added.
     */
    void addToOpenShifts(Shift shift);

    /**
     * This adds a Unavailability for a specified User.
     * The event is added to the UnavailabilityByUser collection, and the event grouping collections.
     * @param userID The ID of the User.
     * @param unavailability The Unavailability being added.
     */
    void addUnavailabilityToUser(String userID, Unavailability unavailability);

    /**
     * This adds a User object to the relevant collections, based on ID, Role, and Department.
     * @param user The User object to be added.
     */
    void addUser(User user);

    /**
     * This assigns a Shift from the OpenShifts collection to a specific User.
     * The shift is added to the ShiftsByID collection and is then removed from the OpenShifts collection.
     * This process also adds the User as a field in the Event.
     * @param userID The ID for the user receiving the shift.
     * @param shiftID The ID for the shift being assigned.
     */
    void assignShiftToUser(String userID, Integer shiftID);

    /**
     * This deletes a Shift from the OpenShifts collection.
     * It also deletes the shift from the event collections.
     * @param eventID The EventID for the shift.
     */
    void deleteFromOpenShifts(Integer eventID);

    /**
     * This deletes a Unavailability from the specified user.
     * The event is also removed from the event grouping collections.
     * @param userID The ID of the User.
     * @param eventID The EventID of the Unavailability.
     */
    void deleteUnavailabilityFromUser(String userID, Integer eventID);

    /**
     * This deletes a User from the relevant collections.
     * First the user's currently assigned shifts are relocated to the OpenShifts collection
     * and removed from the ShiftsByUser collection. Their Unavailability events are deleted from
     * the UnavailabilityByUser collection. And then they are removed from all User collections.
     * @param id The ID value for the User being deleted.
     */
    void deleteUserByID(String id);

    /**
     * @param eventID The EventID to check.
     * @return Returns whether or not a event exists in the DAO.
     */
    boolean eventExists(Integer eventID);

    /**
     * @return Returns all Users in the DAO.
     */
    Collection<User> getAllUsers();

    /**
     * @param eventID The ID of the User.
     * @return Returns the event object with that ID.
     */
    Event getEventByID(Integer eventID);

    /**
     * @return Returns all the Open Shifts.
     */
    Collection<Shift> getOpenShifts();

    /**
     * @param userID The ID of the User.
     * @return Returns all shifts assigned to that User.
     */
    Collection<Shift> getShiftsByUser(String userID);

    /**
     * @param userID The ID of the User.
     * @return Returns all unavailability events for that User.
     */
    Collection<Unavailability> getUnavailabilityByUser(String userID);

    /**
     * @param userID The ID of the User.
     * @return Returns the User object with that ID.
     */
    User getUserByID(String userID);

    /**
     * This returns a Collection of events relevant to a given user, over a given period.
     * @param userID The ID of the user that the events belong to.
     * @param startOfPeriod The Start Date of the period you are interested in.
     * @param daysInPeriod The amount of days you want the period to be.
     * @param filter Filter decides which events get returned. 0 is all, 1 is Shift, and 2 is Unavailability.
     * @return Returns a Collection of type Event. If no events fit criteria the Collection will be empty.
     */
    Collection<Event> getUserEventsForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod, int filter);

    /**
     * This will return the amount of hours a User has been assigned for a given period.
     * It takes advantage of the getUserEventsForPeriod method. Where it will get all events of type Shift
     * for a User. It will then calculate the length of each shift in hours and sum this amount.
     * @param userID The ID of the User.
     * @param startOfPeriod The Start Date of the period you are interested in.
     * @param daysInPeriod The amount of days in the period.
     * @return Returns a Integer value representing the sum of hours assigned.
     */
    Integer getUserHoursForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod);

    /**
     * @param department The User Department value.
     * @return Returns all Users in the DAO with that Department.
     */
    Collection<User> getUsersByDepartment(User.Department department);

    /**
     * @param role The User Role value.
     * @return Returns all User objects in the DAO with that Role.
     */
    Collection<User> getUsersByRole(User.Role role);

    /**
     * This removes a assigned shift from a user and re-adds it to the OpenShifts collection.
     * The user field in the Event is also set to null.
     * @param userID The ID for the user the shift is being removed from.
     * @param eventID The ID for the shift being removed.
     */
    void removeShiftFromUser(String userID, Integer eventID);

    /**
     * WARNING: WILL WIPE ALL DATA.
     * This method resets all the collections in the DAO.
     */
    //void resetDAO();

    /**
     * This returns whether or not a User is in the DAO.
     * @param userID The ID of the User.
     * @return Returns true if the user is located, false if not.
     */
    boolean userExists(String userID);
    
}
