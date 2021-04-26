package service;

import dao.LocalStorageDAO;
import resource.*;
import org.jooby.Jooby;
import org.jooby.json.Gzon;
import org.jooby.handlers.Cors;
import org.jooby.handlers.CorsHandler;
import java.io.IOException;

public class Server extends Jooby {

    public Server() {

        LocalStorageDAO dao = new LocalStorageDAO();

        port(8080);
        
        use("*", new CorsHandler(new Cors().withMethods("*")));
        
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
    }

    public static void main(String[] args) throws IOException {
        new Server().start();
    }

}
