package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the resource class for an individual user.
 */
public class UserResource extends Jooby {
    
    public UserResource(LocalStorageDAO dao) {
        
        path("/api/staff", () -> {

			/**
                         * Route that checks User ID is valid
                         */
			use("/:userId", (req, rsp, chain) -> {
				Integer id = Integer.parseInt(req.param("userId").value());

				if (dao.userExists(id)) {
					// ID is OK, so pass request on to the next route in the chain
					chain.next(req, rsp);
				} else {
					// Bad ID - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There is no user matching that ID."));
				}
			});

			/**
                         * Gets User by ID
                         */
			get("/:userId", (req) -> {
				Integer id = Integer.parseInt(req.param("userId").value());
				return dao.getUserByID(id);
			});
			
			/**
                         * Deletes a User by their ID
                         */
			delete("/:userId", (req, rsp) -> {
				Integer id = Integer.parseInt(req.param("userId").value());
				dao.deleteUserByID(id);
				rsp.status(Status.NO_CONTENT);
			});

		}).produces(MediaType.json).consumes(MediaType.json);
        
    }
    
}
