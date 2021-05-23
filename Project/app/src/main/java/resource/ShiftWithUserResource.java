package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import domain.Event;
import domain.User;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the Resource class for a single shift for a specified User.
 */
public class ShiftWithUserResource extends Jooby {
    
    public ShiftWithUserResource(LocalStorageDAO dao) {
        
        path("/api/shifts/open", () -> {
                        
                        //Assigns a user to a shift
			post("/:eventId/:userId", (req, rsp) -> {
                                //extracts params
				Integer eventId = Integer.parseInt(req.param("eventId").value());
                                String userId = String.valueOf(req.param("userId").value());
                                
                                //checks Event and User exist
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
			put("/:eventId/:userId", (req, rsp) -> {
				//extracts params
				Integer eventId = Integer.parseInt(req.param("eventId").value());
                                String userId = String.valueOf(req.param("userId").value());
                                
                                //checks event and user exists
                                if ((dao.eventExists(eventId))&&(dao.userExists(userId))) {
                                    Event event = dao.getEventByID(eventId);
                                    User user = dao.getUserByID(userId);
                                    //ids are ok, check user matches shift
                                    if (event.getUser()==user) {
                                        //event matches user, delete user from shift
                                        dao.removeShiftFromUser(userId, eventId);
                                        rsp.status(Status.NO_CONTENT);
                                    } else {
                                        rsp.status(Status.NOT_FOUND).send(new ErrorMessage("The user specified is not assigned to shift"));
                                    }
                                } else {
                                    // Bad ID - send a 404 response
                                    rsp.status(Status.NOT_FOUND).send(new ErrorMessage("Invalid Event or User ID."));
                                }
                                
			});
            
        }).produces(MediaType.json).consumes(MediaType.json);
    }
    
}
