package service;

import dao.LocalStorageDAO;
import resource.*;
import org.jooby.Jooby;
import org.jooby.json.Gzon;
import org.jooby.handlers.Cors;
import org.jooby.handlers.CorsHandler;
import java.io.IOException;
import domain.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Server extends Jooby {

    public Server() {

        LocalStorageDAO dao = new LocalStorageDAO();

        port(8080);
        
        Cors cor = new Cors().withMethods("*");
        cor.allowOrigin("*");
        use("*", new CorsHandler(cor));
        //use("*", new CorsHandler(new Cors().withMethods("*")));
        
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
        
                //Test users
//        User user1 = new User();
//        user1.setFirstName("Robert");
//        user1.setUsername("RobertTheDestroyer");
//        user1.setLastName("Potter");
//        user1.setIdNumber(1);
//        User user2 = new User();
//        user2.setFirstName("Rionagh");
//        user2.setUsername("RionaghTheBoss");
//        user2.setLastName("Isat");
//        user2.setIdNumber(2);
//        User user3 = new User();
//        user3.setUsername("LassoMartin");
//        user3.setFirstName("Martin");
//        user3.setLastName("Home");
//        user3.setIdNumber(3);
// 
//        //Test Shifts
//        Shift shift1 = new Shift();
//        shift1.setEventID(1);
//        shift1.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 10, 9, 0), ZoneId.of("Pacific/Auckland")));
//        shift1.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 10, 10, 0), ZoneId.of("Pacific/Auckland")));
//        shift1.setDescription("Clean the gutter");
//        shift1.setName("Gutter cleaning");
//        shift1.setUser(user1);
// 
//        Shift shift2 = new Shift();
//        shift2.setEventID(2);
//        shift2.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 12, 3, 0), ZoneId.of("Pacific/Auckland")));
//        shift2.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 14, 5, 0), ZoneId.of("Pacific/Auckland")));
//        shift2.setDescription("Loitering");
//        shift2.setName("Being a criminal");
//        shift2.setUser(user2);
// 
//        Shift shift3 = new Shift();
//        shift3.setEventID(3);
//        shift3.setName("Computer assistance");
//        shift3.setDescription("Helping elderly use tech");
//        shift3.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 11, 0), ZoneId.of("Pacific/Auckland")));
//        shift3.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 12, 0), ZoneId.of("Pacific/Auckland")));
//        shift3.setUser(user3);
//        
//        dao.addUser(user1);
//        dao.addUser(user2);
//        dao.addUser(user3);
    }

    public static void main(String[] args) throws IOException {
        new Server().start();
    }

}
