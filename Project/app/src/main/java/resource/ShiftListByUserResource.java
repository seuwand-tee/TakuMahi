package resource;

import dao.DAO;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;

/**
 *
 * This is the Resource class for the list of all Shifts for a specified User.
 */
public class ShiftListByUserResource extends Jooby {
    
    public ShiftListByUserResource(DAO dao) {
        
        path("/api/staff/shifts", () -> {

			/**
                         * Route that checks User ID is valid
                         */
			use("/:userId", (req, rsp, chain) -> {
				String id = String.valueOf(req.param("userId").value());

				if (dao.userExists(id)) {
					// ID is OK, so pass request on to the next route in the chain
					chain.next(req, rsp);
				} else {
					// Bad ID - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There is no user matching that ID."));
				}
			});
                        
                        /**
                         * Gets User Shifts by ID
                         */
			get("/:userId", (req) -> {
				String id = String.valueOf(req.param("userId").value());
				return dao.getShiftsByUser(id);
			});
        }).produces(MediaType.json).consumes(MediaType.json);
        
    }
}
