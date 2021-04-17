package service;

import org.jooby.Jooby;
import org.jooby.json.Gzon;
import java.io.IOException;

public class Server extends Jooby {

    public Server() {

        // Create new DAO instance here

        port(8080);

        use(new Gzon());

        // use(new <Resource>(<DAO>));

    }

    public static void main(String[] args) throws IOException {
        new Server().start();
    }

}
