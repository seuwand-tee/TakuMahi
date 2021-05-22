package dao;

import domain.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

public class LocalStorageDAOTest {

    //private static LocalStorageDAO dao;
   private static LocalStorageJdbcDAO dao;

    private static User userOne;
    private static User userTwo;
    private static User userThree;

    private static Shift shiftOne;
    private static Shift shiftTwo;
    private static Shift shiftThree;
    private static Shift shiftFour;
    private static Shift shiftFive;

    private static Unavailability unavailabilityOne;
    private static Unavailability unavailabilityTwo;
    private static Unavailability unavailabilityThree;

    @BeforeAll
    public static void declareAll() {
        //dao = new LocalStorageDAO();
        dao = new LocalStorageJdbcDAO();

        userOne = new User();
        userOne.setUsername("jimmy10p");
        userOne.setIdNumber("1");
        userOne.setRole(User.Role.Casual);
        userOne.setDepartment(User.Department.StudentIT);
        userOne.setFirstName("Jimmy");
        userOne.setLastName("Bob");
        userOne.setEmailAddress("jim.bob@otago.ac.nz");

        userTwo = new User();
        userTwo.setUsername("billy20p");
        userTwo.setIdNumber("2");
        userTwo.setRole(User.Role.Manager);
        userTwo.setDepartment(User.Department.GeneralEnquiries);
        userTwo.setFirstName("Billy");
        userTwo.setLastName("Smith");
        userTwo.setEmailAddress("bill.smith@otago.ac.nz");

        userThree = new User();
        userThree.setUsername("donna30p");
        userThree.setIdNumber("3");
        userThree.setRole(User.Role.Senior);
        userThree.setDepartment(User.Department.StudentIT);
        userThree.setFirstName("Donna");
        userThree.setLastName("Beth");
        userThree.setEmailAddress("don.beth@otago.ac.nz");

        shiftOne = new Shift();
        shiftOne.setEventID(1);
        shiftOne.setStart(LocalDateTime.of(2020, 3, 20, 7, 30));
        shiftOne.setEnd(LocalDateTime.of(2020, 3, 20, 9, 30));
        shiftOne.setName("Morning ISB");
        shiftOne.setDescription("Hmm yes, this is a shift");
        shiftOne.setNotes("Remember Staples");
        shiftOne.setType(Shift.Type.Round);

        shiftTwo = new Shift();
        shiftTwo.setEventID(2);
        shiftTwo.setStart(LocalDateTime.of(2020, 3, 21, 11, 30));
        shiftTwo.setEnd(LocalDateTime.of(2020, 3, 21, 13, 30));
        shiftTwo.setName("Midday ISB");
        shiftTwo.setDescription("Hmm yes, this is a shift");
        shiftTwo.setNotes("Remember Staples");
        shiftTwo.setType(Shift.Type.Round);

        shiftThree = new Shift();
        shiftThree.setEventID(3);
        shiftThree.setStart(LocalDateTime.of(2020, 3, 22, 3, 30));
        shiftThree.setEnd(LocalDateTime.of(2020, 3, 22, 5, 30));
        shiftThree.setName("Afternoon ISB");
        shiftThree.setDescription("Hmm yes, this is a shift");
        shiftThree.setNotes("Remember Staples");
        shiftThree.setType(Shift.Type.Round);

        shiftFour = new Shift();
        shiftFour.setEventID(4);
        shiftFour.setStart(LocalDateTime.of(2020, 3, 20, 7, 30));
        shiftFour.setEnd(LocalDateTime.of(2020, 3, 20, 9, 30));
        shiftFour.setName("Senior Desk");
        shiftFour.setDescription("Hmm yes, this is a shift");
        shiftFour.setNotes("Remember Phones");
        shiftFour.setType(Shift.Type.Senior);

        shiftFive = new Shift();
        shiftFive.setEventID(5);
        shiftFive.setStart(LocalDateTime.of(2020, 3, 20, 14, 0));
        shiftFive.setEnd(LocalDateTime.of(2020, 3, 20, 16, 0));
        shiftFive.setName("Ewaste");
        shiftFive.setDescription("Hmm yes, this is a shift");
        shiftFive.setNotes("Remember Glue");
        shiftFive.setType(Shift.Type.External);

        unavailabilityOne = new Unavailability();
        //unavailabilityOne.setEventID(6);
        unavailabilityOne.setStart(LocalDateTime.of(2020, 3, 20, 16, 0));
        unavailabilityOne.setEnd(LocalDateTime.of(2020, 3, 20, 20, 0));
        unavailabilityOne.setDescription("Ain't nobody got time for dat");

        unavailabilityTwo = new Unavailability();
        unavailabilityTwo.setEventID(7);
        unavailabilityTwo.setStart(LocalDateTime.of(2020, 3, 30, 7, 0));
        unavailabilityTwo.setEnd(LocalDateTime.of(2020, 3, 30, 11, 0));
        unavailabilityTwo.setDescription("Ain't nobody got time for dat");

        unavailabilityThree = new Unavailability();
        unavailabilityThree.setEventID(8);
        unavailabilityThree.setStart(LocalDateTime.of(2020, 4, 20, 11, 0));
        unavailabilityThree.setEnd(LocalDateTime.of(2020, 4, 20, 15, 0));
        unavailabilityThree.setDescription("Ain't nobody got time for dat");

    }

    @BeforeEach
    public void setUp() {

        dao.addUser(userOne);
        dao.addUser(userTwo);
        // leaving userThree
        dao.addToOpenShifts(shiftOne);
        dao.addToOpenShifts(shiftTwo);
        dao.addToOpenShifts(shiftThree);
        dao.addToOpenShifts(shiftFour);
        // leaving shiftFive
        dao.assignShiftToUser("1", 1);
        dao.assignShiftToUser("1", 2);
        dao.assignShiftToUser("1", 3);
        // leaving shiftFour unassigned
        dao.addUnavailabilityToUser("1", unavailabilityOne);
        dao.addUnavailabilityToUser("2", unavailabilityTwo);
        // leaving unavailabilityThree

    }

    @AfterEach
    public void tearDown() {

        dao.resetDAO();

    }

    @Test
    public void addUserTest() {

        assertFalse(dao.userExists("3"));

        assertFalse(dao.getUsersByRole(User.Role.Senior).contains(userThree));

        assertFalse(dao.getUsersByDepartment(User.Department.StudentIT).contains(userThree));

        dao.addUser(userThree);

        assertTrue(dao.userExists("3"));

        User user = dao.getUserByID("3");

        assertEquals(userThree, user);

        assertTrue(dao.getUsersByRole(User.Role.Senior).contains(userThree));

        assertTrue(dao.getUsersByDepartment(User.Department.StudentIT).contains(userThree));

    }

    @Test
    public void deleteUserByIDTest() {

        assertTrue(dao.userExists("1"));

        assertTrue(dao.getUsersByRole(User.Role.Casual).contains(userOne));

        assertTrue(dao.getUsersByDepartment(User.Department.StudentIT).contains(userOne));

        dao.deleteUserByID("1");

        assertFalse(dao.userExists("1"));

        assertFalse(dao.getUsersByRole(User.Role.Casual).contains(userOne));

        assertFalse(dao.getUsersByDepartment(User.Department.StudentIT).contains(userOne));

    }

    @Test
    public void addToOpenShiftsTest() {

        //assertFalse(dao.eventExists(5));

        assertFalse(dao.getOpenShifts().contains(shiftFive));

        dao.addToOpenShifts(shiftFive);

        //assertTrue(dao.eventExists(5));

        assertTrue(dao.getOpenShifts().contains(shiftFive));

    }

    @Test
    public void deleteFromOpenShiftsTest() {

        //assertTrue(dao.eventExists(4));

        assertTrue(dao.getOpenShifts().contains(shiftFour));

        dao.deleteFromOpenShifts(4);

        assertFalse(dao.eventExists(4));

        assertFalse(dao.getOpenShifts().contains(shiftFour));

    }

    @Test
    public void assignShiftToUserTest() {

        assertFalse(dao.getShiftsByUser("2").contains(shiftFour));

        assertTrue(dao.getOpenShifts().contains(shiftFour));

        dao.assignShiftToUser("2", 4);

        assertTrue(dao.getShiftsByUser("2").contains(shiftFour));

        assertFalse(dao.getOpenShifts().contains(shiftFour));

    }

    @Test
    public void removeShiftFromUserTest() {

        assertTrue(dao.getShiftsByUser("1").contains(shiftThree));

        assertFalse(dao.getOpenShifts().contains(shiftThree));

        dao.removeShiftFromUser("1", 3);

        assertFalse(dao.getShiftsByUser("1").contains(shiftThree));

        assertTrue(dao.getOpenShifts().contains(shiftThree));

    }

    @Test
    public void addUnavailabilityToUserTest() {

        assertFalse(dao.getUnavailabilityByUser("2").contains(unavailabilityThree));

        assertFalse(dao.eventExists(8));

        dao.addUnavailabilityToUser("2", unavailabilityThree);

        assertTrue(dao.getUnavailabilityByUser("2").contains(unavailabilityThree));

        assertTrue(dao.eventExists(8));

    }

    @Test
    public void deleteUnavailabilityFromUserTest() {

        assertTrue(dao.getUnavailabilityByUser("2").contains(unavailabilityTwo));

        assertTrue(dao.eventExists(7));

        dao.deleteUnavailabilityFromUser("2", 7);

        assertFalse(dao.getUnavailabilityByUser("2").contains(unavailabilityTwo));

        assertFalse(dao.eventExists(7));

    }

    @Test
    public void getUserEventsForPeriodTest() {

        Collection<Event> events = dao.getUserEventsForPeriod("1", LocalDate.of(2020, 3, 20), 2, 0);
        Collection<Event> shifts = dao.getUserEventsForPeriod("1", LocalDate.of(2020, 3, 20), 2, 1);
        Collection<Event> unavailabilitys = dao.getUserEventsForPeriod("1", LocalDate.of(2020, 3, 20), 2, 2);

        assertEquals(3, events.size());
        assertTrue(events.contains(shiftOne));
        assertTrue(events.contains(shiftTwo));
        assertTrue(events.contains(unavailabilityOne));

        assertEquals(2, shifts.size());
        assertTrue(shifts.contains(shiftOne));
        assertTrue(shifts.contains(shiftTwo));

        assertEquals(1, unavailabilitys.size());
        assertTrue(unavailabilitys.contains(unavailabilityOne));

    }

    @Test
    public void getUserHoursForPeriodTest() {

        int hours = dao.getUserHoursForPeriod("1", LocalDate.of(2020, 3, 20), 2);

        assertEquals(4, hours);

        hours = dao.getUserHoursForPeriod("1", LocalDate.of(2020, 3, 20), 1);

        assertEquals(2, hours);

    }

    @Test
    public void userExistsTest() {

        assertTrue(dao.userExists("1"));

        assertFalse(dao.userExists("3"));

    }

    @Test
    public void getAllUsersTest() {

        Collection<User> users = dao.getAllUsers();

        assertEquals(2, users.size());
        assertTrue(users.contains(userOne));
        assertTrue(users.contains(userTwo));

    }

    @Test
    public void getUserByIDTest() {

        User user = dao.getUserByID("1");

        assertEquals(userOne, user);

    }

    @Test
    public void getUsersByRoleTest() {

        Collection<User> users = dao.getUsersByRole(User.Role.Casual);

        assertEquals(1, users.size());
        assertTrue(users.contains(userOne));

        users = dao.getUsersByRole(User.Role.Manager);

        assertEquals(1, users.size());
        assertTrue(users.contains(userTwo));

    }

    @Test
    public void getUsersByDepartmentTest() {

        Collection<User> users = dao.getUsersByDepartment(User.Department.StudentIT);

        assertEquals(1, users.size());
        assertTrue(users.contains(userOne));

        users = dao.getUsersByDepartment(User.Department.GeneralEnquiries);

        assertEquals(1, users.size());
        assertTrue(users.contains(userTwo));

    }

    @Test
    public void getShiftsByUserTest() {

        Collection<Shift> shifts = dao.getShiftsByUser("1");

        assertEquals(3, shifts.size());
        assertTrue(shifts.contains(shiftOne));
        assertTrue(shifts.contains(shiftTwo));
        assertTrue(shifts.contains(shiftThree));

    }

    @Test
    public void getUnavailabilityByUserTest() {

        Collection<Unavailability> unavailabilitys = dao.getUnavailabilityByUser("1");

        assertEquals(1, unavailabilitys.size());
        assertTrue(unavailabilitys.contains(unavailabilityOne));

    }

    @Test
    public void getOpenShiftsTest() {

        Collection<Shift> shifts = dao.getOpenShifts();

        assertEquals(1, shifts.size());
        assertTrue(shifts.contains(shiftFour));

    }

    @Test
    public void eventExistsTest() {

        assertTrue(dao.eventExists(1));

        assertFalse(dao.eventExists(9));

    }
    
}
