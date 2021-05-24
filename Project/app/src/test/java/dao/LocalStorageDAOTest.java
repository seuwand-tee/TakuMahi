package dao;

import domain.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
//import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.hamcrest.Matchers.*;

public class LocalStorageDAOTest {

    private static DAO dao;

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
        dao = new LocalStorageDAO();
//        dao = new LocalStorageJdbcDAO("jdbc:h2:mem:tests;INIT=runscript from 'src/main/java/dao/schema.sql'");

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
        unavailabilityOne.setEventID(6);
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
        //fail();
        dao.addUser(userThree);
        assertThat(userThree, equalTo(dao.getUserByID("3")));
    }

    @Test
    public void deleteUserByIDTest() {
        assertThat(dao.getAllUsers(), hasItem(userOne));
        dao.deleteUserByID("1");
        assertThat(dao.getAllUsers(), not(hasItem(userOne)));
        assertThat(dao.getAllUsers(), hasSize(1));

    }

    @Test
    public void addToOpenShiftsTest() {
        //  fail();
        dao.addToOpenShifts(shiftFive);
        assertThat(dao.getOpenShifts(), hasItem(shiftFive));
    }

    @Test
    public void deleteFromOpenShiftsTest() {

        assertThat(dao.getOpenShifts(), hasItem(shiftFour));
        dao.deleteFromOpenShifts(4);
        assertThat(dao.getOpenShifts(), not(hasItem(shiftFour)));

    }

    @Test
    public void assignShiftToUserTest() {
        //fail();
        dao.assignShiftToUser("2", 4);
        //assertTrue(dao.getShiftsByUser("2"),equalsTo());
        assertThat(dao.getOpenShifts(), not(hasItem(shiftFour)));

    }

    @Test
    public void removeShiftFromUserTest() {
        //fail();
        dao.removeShiftFromUser("1", 3);
        //assertFalse(dao.getShiftsByUser("1").contains(shiftThree));
        assertThat(dao.getOpenShifts(), hasItem(shiftThree));

    }

    @Test
    public void addUnavailabilityToUserTest() {
        assertThat(dao.getUnavailabilityByUser("2"), hasItem(dao.getEventByID(7)));
        dao.deleteUnavailabilityFromUser("2", 7);
        assertThat(dao.getUnavailabilityByUser("2"), not(hasItem(dao.getEventByID(7))));

        assertThat(dao.getUnavailabilityByUser("2"), not(hasItem(shiftFour)));
//        dao.assignShiftToUser("2", unavailabilityThree.getEventID());
        dao.addUnavailabilityToUser("2", unavailabilityThree);
        assertThat(dao.getUnavailabilityByUser("2"),hasItem(unavailabilityThree));
        assertTrue(dao.eventExists(8));

    }

    @Test
    public void deleteUnavailabilityFromUserTest() {
        //fail();
        assertThat(dao.getUnavailabilityByUser("2"), hasItem(dao.getEventByID(7)));
        dao.deleteUnavailabilityFromUser("2", 7);
        assertThat(dao.getUnavailabilityByUser("2"), not(hasItem(dao.getEventByID(7))));
    }

    @Test
    public void getUserEventsForPeriodTest() {
        //fail();

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
        //fail();

        int hours = dao.getUserHoursForPeriod("1", LocalDate.of(2020, 3, 20), 2);

        assertEquals(4, hours);

        hours = dao.getUserHoursForPeriod("1", LocalDate.of(2020, 3, 20), 1);

        assertEquals(2, hours);

    }

    @Test
    public void userExistsTest() {
        //fail();
        assertThat(userOne, equalTo(dao.getUserByID("1")));
        assertThat(userTwo, equalTo(dao.getUserByID("2")));
    }

    @Test
    public void getAllUsersTest() {
        //  fail();

            assertThat(dao.getAllUsers(), hasItem(userOne));
	assertThat(dao.getAllUsers(), hasItem(userTwo));
		assertThat(dao.getAllUsers(), hasSize(2));

    }

    @Test
    public void getUserByIDTest() {
        // fail();
        assertThat(userOne, equalTo(dao.getUserByID("1")));

    }

    @Test
    public void getUsersByRoleTest() {
        //fail();
        assertThat(dao.getUsersByRole(User.Role.Casual), hasItem(userOne));
        assertThat(dao.getUsersByRole(User.Role.Manager), hasItem(userTwo));
    }

    @Test
    public void getUsersByDepartmentTest() {
        //fail();
        assertThat(dao.getUsersByDepartment(User.Department.StudentIT), hasItem(userOne));
        assertThat(dao.getUsersByDepartment(User.Department.GeneralEnquiries), hasItem(userTwo));

    }

    @Test
    public void getShiftsByUserTest() {
        //fail();
        assertThat(dao.getShiftsByUser("1"), hasItem(shiftOne));
        assertThat(dao.getShiftsByUser("1"), hasSize(3));

    }

    @Test
    public void getUnavailabilityByUserTest() {

        assertThat(dao.getUnavailabilityByUser("1"), hasItem(unavailabilityOne));
        assertThat(dao.getUnavailabilityByUser("1"), hasSize(1));

    }

    @Test
    public void getOpenShiftsTest() {
        //fail();
        assertThat(dao.getOpenShifts(), hasItem(shiftFour));
        assertThat(dao.getOpenShifts(), hasSize(1));

    }

    @Test
    public void eventExistsTest() {
        //fail();
        assertThat(shiftOne, equalTo(dao.getEventByID(1)));

    }

}
