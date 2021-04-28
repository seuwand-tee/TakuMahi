package resource;

import dao.LocalStorageDAO;
import domain.User;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the Resource class for the list of all Users.
 */
public class UserListResource extends Jooby {
    
    public UserListResource(LocalStorageDAO dao) {
            
                path("/api/staff", () -> {

			/**
                         * Gets list of Users
                         */
			get(() -> {
				return dao.getAllUsers();
			});
                        
                        /**
                         * Adds user to list
                         */
			post((req, rsp) -> {
				User user = req.body(User.class);

				if (!dao.userExists(user.getIdNumber())) {
					// store user
					dao.addUser(user);

					// return a response with customer
					rsp.status(Status.CREATED).send(user);
				} else {
					// Non-unique ID
					rsp.status(Status.UNPROCESSABLE_ENTITY).send(new ErrorMessage("There is already a user with that ID."));
				}

			});
                }).produces(MediaType.json).consumes(MediaType.json);
    
    }

}
