package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;

/**
 *
 * This is the Resource class for Hours scheduled for a specified user in a specified time period.
 */
public class HoursByUserResource extends Jooby {
    
    public HoursByUserResource(LocalStorageDAO dao) {
        
        path("/api/staff/hours", () -> {
                        
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
            
            
                //Gets hours in period for specified user
		get("/:userId", (req, rsp) -> {       
                    //extract parameters
                    String userId = String.valueOf(req.param("userId").value());
                    String sPeriod = String.valueOf(req.param("startOfPeriod").value());
                    Integer daysInPeriod = Integer.parseInt(req.param("daysInPeriod").value());
                    //get localDate value
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
                    LocalDate startOfPeriod = LocalDate.parse(sPeriod, formatter);
                    //run dao method
                    Integer hours = dao.getUserHoursForPeriod(userId, startOfPeriod, daysInPeriod);
                    //send integer amount of hours
                    rsp.status(Status.OK).send(hours);
                });
        }).produces(MediaType.json).consumes(MediaType.json);
    }
}
