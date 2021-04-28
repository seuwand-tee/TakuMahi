package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import domain.Event;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;

/**
 *
 * This is the Resource class for the list of all Events for a specified User in a specified time period.
 */
public class EventsByUserResource extends Jooby {
    
    public EventsByUserResource(LocalStorageDAO dao) {
        
        path("/api/staff/events", () -> {
                        
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
            
            
                //Gets events in period for specified user
		get("/:userId", (req, rsp) -> {       
                    //extracts parameters
                    Integer userId = Integer.parseInt(req.param("userId").value());
                    String sPeriod = String.valueOf(req.param("startOfPeriod").value());
                    Integer daysInPeriod = Integer.parseInt(req.param("daysInPeriod").value());
                    Integer filter = Integer.parseInt(req.param("filter").value());
                    //get localDate value
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
                    LocalDate startOfPeriod = LocalDate.parse(sPeriod, formatter);
                    //run dao method
                    Collection<Event> events = dao.getUserEventsForPeriod(userId, startOfPeriod, daysInPeriod, filter);
                    //return 404 if empty, otherwise send all events
                    if (events.isEmpty()){
                        rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There were no shifts found with that query."));
                    } else {
                        rsp.status(Status.OK).send(events);
                    }
                });
        }).produces(MediaType.json).consumes(MediaType.json);
    }
}
