package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import domain.Unavailability;
import java.time.Instant;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
import org.json.JSONObject;
/**
 *
 * This is the Resource class for the list of all Unavailabilities for a specified User.
 */
public class UnavailabilityListByUserResource extends Jooby {
    
    public UnavailabilityListByUserResource(LocalStorageDAO dao) {
        
        path("/api/staff/unavailability", () -> {
            
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
                * Gets list of User Unavailabilities
                */
		get("/:userId", (req) -> {
                    Integer id = Integer.parseInt(req.param("userId").value());
                    return dao.getUnavailabilityByUser(id);
		});
                        
                /**
                * Adds user Unavailability
                */
		post("/:userId", (req, rsp) -> {
                    //extract id value
                    Integer id = Integer.parseInt(req.param("userId").value());
                    
                    //extract instant values from request body to send in constructor (can be used to convert date to any format)
                    String shift = req.body(String.class);
                    JSONObject jsonObj = new JSONObject(shift);
                    String strt = jsonObj.getString("start");
                    Instant start = Instant.parse(strt);
                    String nd = jsonObj.getString("end");
                    Instant end = Instant.parse(nd);
                                
                    //Assign rest of constructor values
                    String repeat = jsonObj.getString("repeat");
                    String description = jsonObj.getString("description");
                    
                    //constructor for unavailability
                    Unavailability unavailability = new Unavailability(start, end, repeat, description);
                    
                    //store unavailability
                    dao.addUnavailabilityToUser(id, unavailability);
                    
                    // return a response with customer
                    rsp.status(Status.CREATED).send(unavailability);
                    
		});
        }).produces(MediaType.json).consumes(MediaType.json);
    
    }

}
