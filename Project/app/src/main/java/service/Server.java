package service;

import dao.LocalStorageDAO;
import resource.UserListResource;
import resource.UserResource;
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

    }

    public static void main(String[] args) throws IOException {
        new Server().start();
    }

}
