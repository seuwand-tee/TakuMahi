package resource;

import dao.LocalStorageDAO;
import domain.ErrorMessage;
import org.jooby.Jooby;
import org.jooby.MediaType;
import org.jooby.Status;
/**
 *
 * This is the resource class for an individual open shift.
 */
public class OpenShiftResource extends Jooby {
    
    public OpenShiftResource(LocalStorageDAO dao) {
        
        path("/api/shifts/open", () -> {

			/**
                         * Route that checks shift ID is valid
                         */
			use("/:eventId", (req, rsp, chain) -> {
				Integer id = Integer.parseInt(req.param("eventId").value());

				if (dao.eventExists(id)) {
					// ID is OK, so pass request on to the next route in the chain
					chain.next(req, rsp);
				} else {
					// Bad ID - send a 404 response
					rsp.status(Status.NOT_FOUND).send(new ErrorMessage("There is no shift matching that ID."));
				}
			});

			/**
                         * Gets shift by ID
                         */
			get("/:eventId", (req) -> {
				Integer id = Integer.parseInt(req.param("eventId").value());
				return dao.getEventByID(id);
			});
			
			/**
                         * Deletes an event by their ID
                         */
			delete("/:eventId", (req, rsp) -> {
				Integer id = Integer.parseInt(req.param("eventId").value());
				dao.deleteFromOpenShifts(id);
				rsp.status(Status.NO_CONTENT);
			});

		}).produces(MediaType.json).consumes(MediaType.json);
        
    }
    
}
