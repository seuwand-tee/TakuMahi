package service;

import dao.LocalStorageDAO;
import domain.Unavailability;
import domain.User;
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

        LocalStorageDAO dao = new LocalStorageDAO();

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
        unavailabilityOne.setEventID(6);
        unavailabilityOne.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 16, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 13, 20, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setRepeat(Unavailability.Repeat.Weekly);
        unavailabilityOne.setRepeatEnd(ZonedDateTime.of(LocalDateTime.of(2020, 5, 20, 0, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityOne.setDescription("Ain't nobody got time for dat");

        Unavailability unavailabilityTwo;
        unavailabilityTwo = new Unavailability();
        unavailabilityTwo.setEventID(7);
        unavailabilityTwo.setStart(ZonedDateTime.of(LocalDateTime.of(2021, 5, 15, 7, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setEnd(ZonedDateTime.of(LocalDateTime.of(2021, 5, 15, 11, 0), ZoneId.of("Pacific/Auckland")));
        unavailabilityTwo.setRepeat(Unavailability.Repeat.No);
        unavailabilityTwo.setDescription("Ain't nobody got time for dat");

        dao.addUser(userOne);
        dao.addUnavailabilityToUser(1, unavailabilityOne);
        dao.addUnavailabilityToUser(1, unavailabilityTwo);

    }

    public static void main(String[] args) throws IOException {
        new Server().start();

        //INFO202 AssetModule handles pages
    }

}
