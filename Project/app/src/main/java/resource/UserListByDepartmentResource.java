package resource;

import dao.LocalStorageDAO;
import domain.User;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the resource class for filtering the User List by Role
 */
public class UserListByDepartmentResource extends Jooby {
    
    public UserListByDepartmentResource(LocalStorageDAO dao) {
        
        path("/api/staff/department", () -> {

			/**
                         * Route that checks Role is valid
                         */
			use("/:department", (req, rsp, chain) -> {
                                String department = req.param("department").value();
                                System.out.println(department);

				if (department.equals("StudentIT") || department.equals("AskIT") || department.equals("GeneralEnquiries")) {
					// Role is OK, so pass request on to the next route in the chain
					chain.next(req, rsp);
                                        System.out.println("success");
				} else {
					// Incorrect Role - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There is no Department with that name."));
				}
			});
                        
                        /**
                         * Gets User List by Role
                         */
			get("/:department", (req) -> {
				String department = req.param("department").value();
                                User.Department dpmnt = User.Department.valueOf(department);
                                System.out.println(department);
                                System.out.println(dpmnt);
				return dao.getUsersByDepartment(dpmnt);
			});
        }).produces(MediaType.json).consumes(MediaType.json);
    }
}
