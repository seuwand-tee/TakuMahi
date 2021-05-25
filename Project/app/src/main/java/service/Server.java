package service;

import dao.DAO;
import dao.LocalStorageDAO;
import dao.LocalStorageJdbcDAO;
import domain.*;
import resource.*;
import org.jooby.Jooby;
import org.jooby.json.Gzon;
import org.jooby.handlers.Cors;
import org.jooby.handlers.CorsHandler;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Server extends Jooby {

    public Server() {

        DAO dao = new LocalStorageJdbcDAO();

        port(8080);

        Cors cor = new Cors().withMethods("*");
        cor.allowOrigin("*");
        use("*", new CorsHandler(cor));

        use(new Gzon());

        use(new UserListResource(dao));
        use(new UserResource(dao));
        use(new UserListByRoleResource(dao));
        use(new UserListByDepartmentResource(dao));
        use(new OpenShiftListResource(dao));
        use(new OpenShiftResource(dao));
        use(new ShiftWithUserResource(dao));
        use(new ShiftListByUserResource(dao));
        use(new UnavailabilityListByUserResource(dao));
        use(new UnavailabilityByUserResource(dao));
        use(new EventsByUserResource(dao));
        use(new HoursByUserResource(dao));


        dao.resetDAO();
        //Test users
        User user1 = new User();
        user1.setFirstName("Robert");
        user1.setUsername("RobertTheDestroyer");
        user1.setLastName("Potter");
        user1.setEmailAddress("yeet@yote.org");
        user1.setIdNumber("1");
        user1.setRole(User.Role.Manager);
        user1.setDepartment(User.Department.AskIT);
        User user2 = new User();
        user2.setFirstName("Rionagh");
        user2.setUsername("RionaghTheBoss");
        user2.setLastName("Isat");
        user2.setEmailAddress("yeet@yote.org");
        user2.setIdNumber("2");
        user2.setRole(User.Role.Manager);
        user2.setDepartment(User.Department.AskIT);
        User user3 = new User();
        user3.setUsername("LassoMartin");
        user3.setFirstName("Martin");
        user3.setLastName("Home");
        user3.setEmailAddress("yeet@yote.org");
        user3.setIdNumber("3");
        user3.setRole(User.Role.Manager);
        user3.setDepartment(User.Department.AskIT);

        //Test Shifts
        Shift shift1 = new Shift();
        shift1.setEventID(1);
        shift1.setStart(LocalDateTime.of(2021, 5, 17, 9, 0));
        shift1.setEnd(LocalDateTime.of(2021, 5, 17, 10, 0));
        shift1.setDescription("Clean the gutter");
        shift1.setName("Gutter cleaning");
        shift1.setType(Shift.Type.Round);

        Shift shift2 = new Shift();
        shift2.setEventID(2);
        shift2.setStart(LocalDateTime.of(2021, 5, 17, 9, 0));
        shift2.setEnd(LocalDateTime.of(2021, 5, 17, 12, 0));
        shift2.setDescription("Loitering");
        shift2.setName("Being a criminal");
        shift2.setType(Shift.Type.Round);

        Shift shift3 = new Shift();
        shift3.setEventID(3);
        shift3.setName("Computer assistance");
        shift3.setDescription("Helping elderly use tech");
        shift3.setStart(LocalDateTime.of(2021, 5, 17, 11, 0));
        shift3.setEnd(LocalDateTime.of(2021, 5, 17, 12, 0));
        shift3.setType(Shift.Type.Round);

        //Test unavailability
        Unavailability unavailability1 = new Unavailability();
        unavailability1.setEventID(4);
        unavailability1.setDescription("Busy gaming");
        unavailability1.setStart(LocalDateTime.of(2021, 5, 17, 11, 0));
        unavailability1.setEnd(LocalDateTime.of(2021, 5, 17, 14, 0));
        unavailability1.setUser(user1);

        Unavailability unavailability2 = new Unavailability();
        unavailability2.setEventID(5);
        unavailability2.setDescription("Busy gaming");
        unavailability2.setStart(LocalDateTime.of(2021, 5, 17, 14, 0));
        unavailability2.setEnd(LocalDateTime.of(2021, 5, 17, 11, 0));
        unavailability2.setUser(user2);

        Unavailability unavailability3 = new Unavailability();
        unavailability3.setEventID(6);
        unavailability3.setDescription("Busy gaming");
        unavailability3.setStart(LocalDateTime.of(2021, 5, 10, 14, 0));
        unavailability3.setEnd(LocalDateTime.of(2021, 5, 10, 16, 0));
        unavailability3.setUser(user3);

        //open shifts
        Shift shift4 = new Shift();
        shift4.setEventID(7);
        shift4.setName("A Fresh open shift");
        shift4.setDescription("Helping elderly use tech");
        shift4.setStart(LocalDateTime.of(2021, 5, 12, 11, 0));
        shift4.setEnd(LocalDateTime.of(2021, 5, 13, 12, 0));
        shift4.setType(Shift.Type.Round);

        Shift shift5 = new Shift();
        shift5.setEventID(8);
        shift5.setName("My openshift");
        shift5.setDescription("Helping elderly use tech");
        shift5.setStart(LocalDateTime.of(2021, 5, 13, 15, 0));
        shift5.setEnd(LocalDateTime.of(2021, 5, 13, 18, 0));
        shift5.setType(Shift.Type.Round);

        dao.addToOpenShifts(shift1);
        dao.addToOpenShifts(shift2);
        dao.addToOpenShifts(shift3);
        dao.addToOpenShifts(shift4);
        dao.addToOpenShifts(shift5);

        dao.addUser(user1);
        dao.addUser(user2);
        dao.addUser(user3);

        dao.addUnavailabilityToUser(user1.getIdNumber(), unavailability1);
        dao.addUnavailabilityToUser(user2.getIdNumber(), unavailability2);
        dao.addUnavailabilityToUser(user3.getIdNumber(), unavailability3);

        dao.assignShiftToUser(user1.getIdNumber(), shift1.getEventID());
        dao.assignShiftToUser(user2.getIdNumber(), shift2.getEventID());
        dao.assignShiftToUser(user3.getIdNumber(), shift3.getEventID());
    }

    public static void main(String[] args) throws IOException {
        Server server = new Server();
        
        new Server().start();
    }
    

}
