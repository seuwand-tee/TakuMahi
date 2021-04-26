package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import domain.Event;
import domain.User;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;

public class UnavailabilityByUserResource extends Jooby {
    
    public UnavailabilityByUserResource(LocalStorageDAO dao) {
        
        path("/api/staff/unavailability", () -> {
                        
                        //Deletes Unavailability for specified user
			delete("/:userId/:eventId", (req, rsp) -> {
                            
                            //extracts params
                            Integer userId = Integer.parseInt(req.param("userId").value());
                            Integer eventId = Integer.parseInt(req.param("eventId").value());
                            
                            //checks event and user exists
                            if ((dao.eventExists(eventId))&&(dao.userExists(userId))) {
                                Event event = dao.getEventByID(eventId);
                                User user = dao.getUserByID(userId);
                                //ids are ok, check user matches shift
                                if (event.getUser()==user) {
                                    //event matches user, delete user from shift
                                    dao.deleteUnavailabilityFromUser(userId, eventId);
                                    rsp.status(Status.NO_CONTENT);
                                } else {
                                    rsp.status(Status.NOT_FOUND).send(new ErrorMessage("The user specified is not assigned to an unavailability"));
                                }
                            } else {
                                // Bad ID - send a 404 response
                                rsp.status(Status.NOT_FOUND).send(new ErrorMessage("Invalid Event or User ID."));
                            }
                        });
        
        }).produces(MediaType.json).consumes(MediaType.json);
    }     
}
