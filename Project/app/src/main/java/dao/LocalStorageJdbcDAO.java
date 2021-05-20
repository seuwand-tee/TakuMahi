/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import com.google.common.collect.HashMultimap;
import domain.Event;
import domain.Shift;
import domain.Unavailability;
import domain.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.HashSet;

/**
 *
 * @author User
 */
public class LocalStorageJdbcDAO implements DAO{
    private String uri;
    public LocalStorageJdbcDAO() {
		uri = dao.DbConnection.getDefaultConnectionUri();
	}

	public LocalStorageJdbcDAO(String uri) {
		this.uri = uri;
	}

    @Override
    public void addToOpenShifts(Shift shift) {
        String sql = "insert into Shift(name, start, end, description, notes, type) values (?,?,?,?,?,?)";
        try (
                 Connection dbCon = DbConnection.getConnection(uri);  
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, shift.getName());
            stmt.setDate(2, shift.getStart());
            stmt.setDate(3, shift.getEnd());
            stmt.setString(4, shift.getDescription());
            stmt.setString(5, shift.getNotes());
            stmt.setString(6, shift.getType().toString());

            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
    }
    }

    @Override
    public void addUnavailabilityToUser(Integer userID, Unavailability unavailability) {
        String sql = "insert into Unavailability(shiftid, idnumber, start, end, repeat, repeatend, description) values (?,?,?,?,?)";
        try (
                 Connection dbCon = DbConnection.getConnection(uri);  
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, unavailability.getEventID());
            stmt.setInt(2, userID);
            stmt.setString(3, unavailability.getStart().format(DateTimeFormatter.ISO_DATE));
            stmt.setString(4, unavailability.getEnd().format(DateTimeFormatter.ISO_DATE));
            stmt.setString(7, unavailability.getDescription());

            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
    }
    }

    @Override
    public void addUser(User user) {
        String sql = "insert into User(username, idnumber, role, department, firstname, lastname, emailaddress) values (?,?,?,?,?,?,?)";
        try (
                 Connection dbCon = DbConnection.getConnection(uri);  
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, user.getUsername());
            stmt.setInt(2, user.getIdNumber());
            stmt.setString(3, user.getRole().toString());
            stmt.setString(4, user.getDepartment().toString());
            stmt.setString(5, user.getFirstName());
            stmt.setString(6, user.getLastName());
            stmt.setString(7, user.getEmailAddress());


            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
    }
    }

    @Override
    public void assignShiftToUser(Integer userID, Integer shiftID) {
        
    }

    @Override
    public void deleteFromOpenShifts(Integer eventID) {
        String sql = "delete from Shift where shiftid = ?";
		try (
				  Connection dbCon = DbConnection.getConnection(uri);
				  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
			stmt.setInt(1, eventID);
			stmt.executeUpdate();  // execute the statement

		} catch (SQLException ex) {  // we are forced to catch SQLException
			// don't let the SQLException leak from our DAO encapsulation
			throw new DAOException(ex.getMessage(), ex);
		}
    }

    @Override
    public void deleteUnavailabilityFromUser(Integer userID, Integer eventID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteUserByID(Integer id) {
        String sql = "delete from User where idnumber = ?";
		try (
				  Connection dbCon = DbConnection.getConnection(uri);
				  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
			stmt.setInt(1, id);
			stmt.executeUpdate();  // execute the statement

		} catch (SQLException ex) {  // we are forced to catch SQLException
			// don't let the SQLException leak from our DAO encapsulation
			throw new DAOException(ex.getMessage(), ex);
		}
    }

    @Override
    public boolean eventExists(Integer eventID) {
        String sql = "select * from Shift where eventid = ?";

        try (
                // get a connection to the database
                 Connection dbCon = DbConnection.getConnection(uri); // create the statement
                  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, eventID);
// execute the query
            ResultSet rs = stmt.executeQuery();

            return (rs.next());

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }

    @Override
    public Collection<User> getAllUsers() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Event getEventByID(Integer eventID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Collection<Shift> getOpenShifts() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Collection<Shift> getShiftsByUser(Integer userID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Collection<Unavailability> getUnavailabilityByUser(Integer userID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public User getUserByID(Integer userID) {
        String sql = "select * from User where idnumber = ?";

		try (
				  // get connection to database
				  Connection connection = DbConnection.getConnection(uri);
				  // create the statement
				  PreparedStatement stmt = connection.prepareStatement(sql);) {
			// set the parameter
			stmt.setInt(1, userID);

			// execute the query
			ResultSet rs = stmt.executeQuery();

			// query only returns a single result, so use 'if' instead of 'while'
			if (rs.next()) {
				String username = rs.getString("username");
				Integer idnumber = rs.getInt("idnumber");
                                User.Role role = (User.Role) rs.getObject("role");
                                String firstname = rs.getString("firstname");
				String lastname = rs.getString("lastname");
				String emailaddress = rs.getString("emailaddress");


				return new User(username,idnumber, role, firstname, lastname, emailaddress);

			} else {
				// no student matches given ID so return null
				return null;
			}

		} catch (SQLException ex) {  // we are forced to catch SQLException
			// don't let the SQLException leak from our DAO encapsulation
			throw new DAOException(ex.getMessage(), ex);
		}
	}

    @Override
    public Collection<Event> getUserEventsForPeriod(Integer userID, LocalDate startOfPeriod, int daysInPeriod, int filter) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Integer getUserHoursForPeriod(Integer userID, LocalDate startOfPeriod, int daysInPeriod) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Collection<User> getUsersByDepartment(User.Department department) {
        String sql = "select * from Users where department = ?";
		try (
				  // get a connection to the database
				  Connection dbCon = DbConnection.getConnection(uri);
				  // create the statement
				  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
			stmt.setString(1, department.toString());
			// execute the query
			ResultSet rs = stmt.executeQuery();

			// Using a List to preserve the order in which the data was returned from the query.
			Collection<User> user = new HashSet<>();

			// iterate through the query results
			while (rs.next()) {

				// get the data out of the query
				String username = rs.getString("username");
				Integer idnumber = rs.getInt("idnumber");
                                //Role role = rs.get****
                                String firstname = rs.getString("firstname");
				String lastname = rs.getString("lastname");
				String emailaddress = rs.getString("emailaddress");

                                
				// use the data to create a user object
				User u = new User(username,idnumber,role,firstname,lastname,emailaddress);

				// and put it in the collection
				user.add(u);
			}

			return user;

		} catch (SQLException ex) {  // we are forced to catch SQLException
			// don't let the SQLException leak from our DAO encapsulation
			throw new DAOException(ex.getMessage(), ex);
		}
    }

    @Override
    public Collection<User> getUsersByRole(User.Role role) {
        String sql = "select * from Users where role = ?";
		try (
				  // get a connection to the database
				  Connection dbCon = DbConnection.getConnection(uri);
				  // create the statement
				  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
			stmt.setString(1, role.toString());
			// execute the query
			ResultSet rs = stmt.executeQuery();

			// Using a List to preserve the order in which the data was returned from the query.
			Collection<User> user = new HashSet<>();

			// iterate through the query results
			while (rs.next()) {

				// get the data out of the query
				String username = rs.getString("username");
				Integer idnumber = rs.getInt("idnumber");
                                String firstname = rs.getString("firstname");
				String lastname = rs.getString("lastname");
				String emailaddress = rs.getString("emailaddress");

                                
				// use the data to create a user object
				User u = new User(username,idnumber,role,firstname,lastname,emailaddress);

				// and put it in the collection
				user.add(u);
			}

			return user;

		} catch (SQLException ex) {  // we are forced to catch SQLException
			// don't let the SQLException leak from our DAO encapsulation
			throw new DAOException(ex.getMessage(), ex);
		}
    }

    @Override
    public void removeShiftFromUser(Integer userID, Integer eventID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void resetDAO() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean userExists(Integer userID) {
        String sql = "select * from User where idnumber = ?";

        try (
                // get a connection to the database
                 Connection dbCon = DbConnection.getConnection(uri); // create the statement
                  PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, userID);
// execute the query
            ResultSet rs = stmt.executeQuery();

            return (rs.next());

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    }
    
