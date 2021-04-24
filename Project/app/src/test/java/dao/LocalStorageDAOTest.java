package dao;

import domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class LocalStorageDAOTest {

    LocalStorageDAO dao;

    User userOne;
    User userTwo;
    User userThree;

    Shift shiftOne;
    Shift shiftTwo;
    Shift shiftThree;
    Shift shiftFour;
    Shift shiftFive;

    Unavailability unavailabilityOne;
    Unavailability unavailabilityTwo;
    Unavailability unavailabilityThree;

    @BeforeEach
    public void setUp() {

        dao = new LocalStorageDAO();

        userOne = new User();
        userOne.setUsername("jimmy10p");
        userOne.setIdNumber(1);
        userOne.setRole(User.Role.Casual);
        userOne.setDepartment(User.Department.StudentIT);
        userOne.setFirstName("Jimmy");
        userOne.setLastName("Bob");
        userOne.setEmailAddress("jim.bob@otago.ac.nz");

        userTwo = new User();
        userTwo.setUsername("billy20p");
        userTwo.setIdNumber(2);
        userTwo.setRole(User.Role.Casual);
        userTwo.setDepartment(User.Department.GeneralEnquiries);
        userTwo.setFirstName("Billy");
        userTwo.setLastName("Smith");
        userTwo.setEmailAddress("bill.smith@otago.ac.nz");

        userThree = new User();
        userThree.setUsername("donna30p");
        userThree.setIdNumber(3);
        userThree.setRole(User.Role.Senior);
        userThree.setDepartment(User.Department.StudentIT);
        userThree.setFirstName("Donna");
        userThree.setLastName("Beth");
        userThree.setEmailAddress("don.beth@otago.ac.nz");

        shiftOne = new Shift();
        shiftOne.setEventID(1);
        shiftOne.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 7, 30), ZoneId.of("Pacific/Auckland")));
        shiftOne.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 9, 30), ZoneId.of("Pacific/Auckland")));
        shiftOne.setName("Morning ISB");
        shiftOne.setDescription("Hmm yes, this is a shift");
        shiftOne.setNotes("Remember Staples");
        shiftOne.setType(Shift.Type.Round);

        shiftTwo = new Shift();
        shiftTwo.setEventID(2);
        shiftTwo.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 11, 30), ZoneId.of("Pacific/Auckland")));
        shiftTwo.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 13, 30), ZoneId.of("Pacific/Auckland")));
        shiftTwo.setName("Midday ISB");
        shiftTwo.setDescription("Hmm yes, this is a shift");
        shiftTwo.setNotes("Remember Staples");
        shiftTwo.setType(Shift.Type.Round);

        shiftThree = new Shift();
        shiftThree.setEventID(3);
        shiftThree.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 3, 30), ZoneId.of("Pacific/Auckland")));
        shiftThree.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 5, 30), ZoneId.of("Pacific/Auckland")));
        shiftThree.setName("Afternoon ISB");
        shiftThree.setDescription("Hmm yes, this is a shift");
        shiftThree.setNotes("Remember Staples");
        shiftThree.setType(Shift.Type.Round);

        shiftFour = new Shift();
        shiftFour.setEventID(4);
        shiftFour.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 7, 30), ZoneId.of("Pacific/Auckland")));
        shiftFour.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 9, 30), ZoneId.of("Pacific/Auckland")));
        shiftFour.setName("Senior Desk");
        shiftFour.setDescription("Hmm yes, this is a shift");
        shiftFour.setNotes("Remember Phones");
        shiftFour.setType(Shift.Type.Senior);

        shiftFive = new Shift();
        shiftFive.setEventID(5);
        shiftFive.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 14, 0), ZoneId.of("Pacific/Auckland")));
        shiftFive.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 16, 0), ZoneId.of("Pacific/Auckland")));
        shiftFive.setName("Ewaste");
        shiftFive.setDescription("Hmm yes, this is a shift");
        shiftFive.setNotes("Remember Glue");
        shiftFive.setType(Shift.Type.External);

        unavailabilityOne = new Unavailability();
        unavailabilityOne.setEventID(6);
        unavailabilityOne.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 16, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 20, 20, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setRepeat(Unavailability.Repeat.Weekly);
        unavailabilityOne.setRepeatEnd(ZonedDateTime.of(LocalDateTime.of(2020, 5, 20, 0, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setDescription("Ain't nobody got time for dat");

        unavailabilityTwo = new Unavailability();
        unavailabilityTwo.setEventID(7);
        unavailabilityTwo.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 3, 30, 7, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 3, 30, 11, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setRepeat(Unavailability.Repeat.No);
        unavailabilityTwo.setDescription("Ain't nobody got time for dat");

        unavailabilityThree = new Unavailability();
        unavailabilityThree.setEventID(8);
        unavailabilityThree.setStart(ZonedDateTime.of(LocalDateTime.of(2020, 4, 20, 11, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityThree.setEnd(ZonedDateTime.of(LocalDateTime.of(2020, 4, 20, 15, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityThree.setRepeat(Unavailability.Repeat.Monthly);
        unavailabilityThree.setRepeatEnd(ZonedDateTime.of(LocalDateTime.of(2020, 8, 20, 0, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityThree.setDescription("Ain't nobody got time for dat");
        
        dao.addUser(userOne);
        dao.addUser(userTwo);
        // leaving userThree
        dao.addToOpenShifts(shiftOne);
        dao.addToOpenShifts(shiftTwo);
        dao.addToOpenShifts(shiftThree);
        dao.addToOpenShifts(shiftFour);
        // leaving shiftFive
        dao.assignShiftToUser(1, 1);
        dao.assignShiftToUser(1, 2);
        dao.assignShiftToUser(1, 3);
        // leaving shiftFour and shiftFive unassigned
        dao.addUnavailabilityToUser(1, unavailabilityOne);
        dao.addUnavailabilityToUser(2, unavailabilityTwo);
        // leaving unavailabilityThree

    }

    @Test
    public void addUserTest() {

        assertFalse(dao.userExists(3));

        assertFalse(dao.getUsersByRole(User.Role.Senior).contains(userThree));

        assertFalse(dao.getUsersByDepartment(User.Department.StudentIT).contains(userThree));

        dao.addUser(userThree);

        assertTrue(dao.userExists(3));

        User user = dao.getUserByID(3);

        assertEquals(userThree, user);

        assertTrue(dao.getUsersByRole(User.Role.Senior).contains(userThree));

        assertTrue(dao.getUsersByDepartment(User.Department.StudentIT).contains(userThree));

    }

    @Test
    public void deleteUserByIDTest() {

        assertTrue(dao.userExists(1));

        assertTrue(dao.getUsersByRole(User.Role.Casual).contains(userOne));

        assertTrue(dao.getUsersByDepartment(User.Department.StudentIT).contains(userOne));

        dao.deleteUserByID(1);

        assertFalse(dao.userExists(1));

        assertFalse(dao.getUsersByRole(User.Role.Casual).contains(userOne));

        assertFalse(dao.getUsersByDepartment(User.Department.StudentIT).contains(userOne));

    }

    @Test
    public void addToOpenShiftsTest() {

        assertFalse(dao.eventExists(5));

        assertFalse(dao.getOpenShifts().contains(shiftFive));

        dao.addToOpenShifts(shiftFive);

        assertTrue(dao.eventExists(5));

        assertTrue(dao.getOpenShifts().contains(shiftFive));

    }

    @Test
    public void deleteFromOpenShiftsTest() {

        assertTrue(dao.eventExists(4));

        assertTrue(dao.getOpenShifts().contains(shiftFour));

        dao.deleteFromOpenShifts(4);

        assertFalse(dao.eventExists(4));

        assertFalse(dao.getOpenShifts().contains(shiftFour));

    }

    @Test
    public void assignShiftToUserTest() {

        assertFalse(dao.getShiftsByUser(2).contains(shiftFour));

        assertTrue(dao.getOpenShifts().contains(shiftFour));

        dao.assignShiftToUser(2, 4);

        assertTrue(dao.getShiftsByUser(2).contains(shiftFour));

        assertFalse(dao.getOpenShifts().contains(shiftFour));

    }
    
}
