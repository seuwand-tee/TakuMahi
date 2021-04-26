package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;

public class OpenShiftWithUserResource extends Jooby {
    
    public OpenShiftWithUserResource(LocalStorageDAO dao) {
        
        path("/api/shifts/open", () -> {
                        
                        //Assigns a user to a shift
			post("/:eventId/:userId", (req, rsp) -> {
                                //extracts params
				Integer eventId = Integer.parseInt(req.param("eventId").value());
                                Integer userId = Integer.parseInt(req.param("userId").value());
                                
                                if ((dao.eventExists(eventId))&&(dao.userExists(userId))) {
					// IDs are OK, so pass request on to DAO
					dao.assignShiftToUser(userId, eventId);
                                        rsp.status(Status.NO_CONTENT);
				} else {
					// Bad ID - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("Invalid Event or User ID."));
				}
                                
			});
                        
                        //Removes user from shift
//			put("/:id", (req, rsp) -> {
//				String id = req.param("id").value();
//				Account account = req.body().to(Account.class);
//
//				if (!id.equals(account.getId())) {
//					rsp.status(Status.CONFLICT).send(new ErrorMessage("Modifying the Customer ID via this operation is not allowed."));
//				} else {
//                                        dao.updateAccount(id, account);
//					rsp.status(Status.NO_CONTENT);
//				}
//			});
            
        }).produces(MediaType.json).consumes(MediaType.json);
    }
    
}
