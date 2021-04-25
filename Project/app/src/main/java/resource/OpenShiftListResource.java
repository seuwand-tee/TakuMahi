package resource;

import dao.LocalStorageDAO;
import domain.Shift;
import domain.ErrorMessage;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
import org.json.JSONObject;
/**
 *
 * This is the Resource class for the list of all Users.
 */
public class OpenShiftListResource extends Jooby {
    
    public OpenShiftListResource(LocalStorageDAO dao) {
            
                path("/api/shifts/open", () -> {

			/**
                         * Gets list of shifts
                         */
			get(() -> {
				return dao.getOpenShifts();
			});
                        
                        /**
                         * Adds shift to list
                         */
			post((req, rsp) -> {
                                System.out.println("test1");
                                //Shift shift = new Shift();
                                
                                //extract instant values from request body to send in constructor
				String shift = req.body(String.class);
                                JSONObject jsonObj = new JSONObject(shift);
                                String strt = jsonObj.getString("start");
                                Instant start = Instant.parse(strt);
                                String nd = jsonObj.getString("end");
                                Instant end = Instant.parse(nd);
                                
                                //Assign rest of constructor values
                                String name = jsonObj.getString("name");
                                String description = jsonObj.getString("name");
                                String notes = jsonObj.getString("notes");
                                String type = jsonObj.getString("type");
                                
                                //constructor for shift
                                Shift shft = new Shift(start, end, name, description, notes, type);

				// store shift
				dao.addToOpenShifts(shft);

				// return a response with customer
				rsp.status(Status.CREATED).send(shift);

			});
                }).produces(MediaType.json).consumes(MediaType.json);
    
    }

}
