package resource;

import dao.DAO;
import domain.User;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the resource class for filtering the User List by Role
 */
public class UserListByRoleResource extends Jooby {
    
    public UserListByRoleResource(DAO dao) {
        
        path("/api/staff/role", () -> {

			/**
                         * Route that checks Role is valid
                         */
			use("/:role", (req, rsp, chain) -> {
                                String role = req.param("role").value();

				if (role.equals("Manager") || role.equals("Senior") || role.equals("Casual")) {
					// Role is OK, so pass request on to the next route in the chain
					chain.next(req, rsp);
				} else {
					// Incorrect Role - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There is no Role with that name."));
				}
			});
                        
                        /**
                         * Gets User List by Role
                         */
			get("/:role", (req) -> {
				String role = req.param("role").value();
                                User.Role rol = User.Role.valueOf(role);
				return dao.getUsersByRole(rol);
			});
        }).produces(MediaType.json).consumes(MediaType.json);
    }
}
