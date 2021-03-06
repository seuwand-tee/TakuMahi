/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import domain.Event;
import domain.Shift;
import domain.Unavailability;
import domain.User;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

/**
 *
 * @author User
 */
public class LocalStorageJdbcDAO implements DAO {
    
    private final String uri;
    
    public LocalStorageJdbcDAO() {
        uri = dao.DbConnection.getDefaultConnectionUri();
    }
    
    public LocalStorageJdbcDAO(String uri) {
        this.uri = uri;
    }
    
    @Override
    public void addToOpenShifts(Shift shift) {
        String sql = "insert into Shift(shiftid, name, start, end, description, notes, type) values (?,?,?,?,?,?,?)";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            Timestamp start = Timestamp.valueOf(shift.getStart());
            Timestamp end = Timestamp.valueOf(shift.getEnd());
            stmt.setInt(1, shift.getEventID());
            stmt.setString(2, shift.getName());
            stmt.setTimestamp(3, start);
            stmt.setTimestamp(4, end);
            stmt.setString(5, shift.getDescription());
            stmt.setString(6, shift.getNotes());
            stmt.setString(7, shift.getType().name());
            stmt.executeUpdate();  // execute the statement
            System.out.println(stmt.toString());
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public void addUnavailabilityToUser(String userID, Unavailability unavailability) {
        String sql = "insert into Unavailability(shiftid, idnumber, start, end, description) values (?,?,?,?,?)";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            Timestamp start = Timestamp.valueOf(unavailability.getStart());
            Timestamp end = Timestamp.valueOf(unavailability.getEnd());
            stmt.setInt(1, unavailability.getEventID());
            stmt.setString(2, userID);
            stmt.setTimestamp(3, start);
            stmt.setTimestamp(4, end);
            stmt.setString(5, unavailability.getDescription());
            
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
            stmt.setString(2, user.getIdNumber());
            stmt.setString(3, user.getRole().toString());
            stmt.setString(4, user.getDepartment().toString());
            stmt.setString(5, user.getFirstName());
            stmt.setString(6, user.getLastName());
            stmt.setString(7, user.getEmailAddress());
            
            stmt.executeUpdate();  // execute the statement
            System.out.println(stmt.toString());
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public void assignShiftToUser(String userID, Integer shiftID) {
        String sql = "update Shift set idnumber = ? where shiftid = ?";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            
            stmt.setString(1, userID);
            stmt.setInt(2, shiftID);
            
            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
        
    }
    
    @Override
    public void deleteFromOpenShifts(Integer eventID) {
        String sql = "Delete from Shift where shiftid = ?";
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
    public void deleteUnavailabilityFromUser(String userID, Integer eventID) {
        String sql = "delete from Unavailability where shiftid = ? and idnumber = ?";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, eventID);
            stmt.setString(2, userID);
            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public void deleteUserByID(String id) {
        String sql = "delete from User where idnumber = ?";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, id);
            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public boolean eventExists(Integer eventID) {
        String sql = "select shiftid from Shift where shiftid = ? union select shiftid from unavailability where shiftid = ?";
        
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, eventID);
            stmt.setInt(2, eventID);
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
        String sql = "select * from User order by idnumber";
        
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            // execute the query
            ResultSet rs = stmt.executeQuery();

            // Using a List to preserve the order in which the data was returned from the query.
            Collection<User> user = new ArrayList<>();

            // iterate through the query results
            while (rs.next()) {

                // get the data out of the query
                String username = rs.getString("username");
                String idnumber = rs.getString("idnumber");
                String rolee = rs.getString("role");
                User.Role role = User.Role.valueOf(rolee);
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                String emailaddress = rs.getString("emailaddress");
                String dept = rs.getString("department");
                
                User u = new User(username, idnumber, role, firstname, lastname, emailaddress);
                u.setDepartment(User.Department.valueOf(dept));
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
    public Event getEventByID(Integer eventID) {
        String sql = "select * from Shift where shiftid = ?";
        
        try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
            // set the parameter
            stmt.setInt(1, eventID);

            // execute the query
            ResultSet rs = stmt.executeQuery();

            // query only returns a single result, so use 'if' instead of 'while'
            if (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String name = rs.getString("name");
                String description = rs.getString("description");
                String notes = rs.getString("notes");
                String type = rs.getString("type");
                Integer id = rs.getInt("shiftID");
                String userID = rs.getString("IdNumber");

                User test = new User();
                test.setIdNumber(userID);

                Shift s = new Shift(start, end, name, description, notes, type);

                s.setEventID(id);
                s.setUser(test);


                return s;
                
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
    public Collection<Event> getOpenShifts() {
        String sql = "select * from Shift where idnumber is null";
        
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            
            ResultSet rs = stmt.executeQuery();
            Collection<Event> shift = new HashSet<>();

            // query only returns a single result, so use 'if' instead of 'while'
            while (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String name = rs.getString("name");
                String description = rs.getString("description");
                String notes = rs.getString("notes");
                String type = rs.getString("type");


                Shift s = new Shift(start, end, name, description, notes, type);
                s.setEventID(Integer.valueOf(rs.getString("shiftID")));

                shift.add(s);
            }
            
            return shift;
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public Collection<Event> getShiftsByUser(String userID) {
        String sql = "select * from Shift where idnumber = ?";
        
        try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
            // set the parameter
            stmt.setString(1, userID);

            // execute the query
            ResultSet rs = stmt.executeQuery();
            Collection<Event> shift = new HashSet<>();

            // query only returns a single result, so use 'if' instead of 'while'
            while (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String name = rs.getString("name");
                String description = rs.getString("description");
                String notes = rs.getString("notes");
                String type = rs.getString("type");
                Integer id = rs.getInt("shiftID");
                
                Shift s = new Shift(start, end, name, description, notes, type);
                s.setEventID(id);
                
                shift.add(s);
                
            }
            
            return shift;
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public Collection<Event> getUnavailabilityByUser(String userID) {
        String sql = "select * from Unavailability where idnumber = ?";
        
        try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
            // set the parameter
            stmt.setString(1, userID);

            // execute the query
            ResultSet rs = stmt.executeQuery();
            Collection<Event> unavailable = new HashSet<>();

            // query only returns a single result, so use 'if' instead of 'while'
            while (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String description = rs.getString("description");
                int id = rs.getInt("shiftid");
                
                Unavailability un = new Unavailability(start, end, description);
                un.setEventID(id);
                
                unavailable.add(un);
                
            }
            
            return unavailable;
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public User getUserByID(String userID) {
        String sql = "select * from User where idnumber = ?";
        
        try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
            // set the parameter
            stmt.setString(1, userID);

            // execute the query
            ResultSet rs = stmt.executeQuery();

            // query only returns a single result, so use 'if' instead of 'while'
            if (rs.next()) {
                String username = rs.getString("username");
                String idnumber = rs.getString("idnumber");
                String rolee = rs.getString("role");
                User.Role role = User.Role.valueOf(rolee);
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                String emailaddress = rs.getString("emailaddress");
                String dept = rs.getString("department");
                final User user = new User(username, idnumber, role, firstname, lastname, emailaddress);
                user.setDepartment(User.Department.valueOf(dept));
                return user;
                
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
    public Collection<Event> getUserEventsForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod, int filter) {

            switch (filter) {
                case 0:
                    return getAllEventsForPeriod(userID, startOfPeriod, daysInPeriod);
                case 1:
                    return getShiftEventsForPeriod(userID, startOfPeriod, daysInPeriod);
                case 2:
                    return getUnavailableEventsForPeriod(userID, startOfPeriod, daysInPeriod);
            }
            
            return null;
    }
    
    private Collection<Event> getUnavailableEventsForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod) {
        String sql = "select * from unavailability where shiftid in (select shiftid from unavailability where datediff(DAY, start, DATEADD(DAY, ?, ?) ) >0 and idnumber = ?)";
         try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
                
            // set the parameter
            Date starto = Date.valueOf(startOfPeriod);
            stmt.setInt(1, daysInPeriod);
            stmt.setDate(2, starto);
            stmt.setInt(3, Integer.valueOf(userID));

            // execute the query
            ResultSet rs = stmt.executeQuery();
            Collection<Event> unavailable = new HashSet<>();

            // query only returns a single result, so use 'if' instead of 'while'
            while (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String description = rs.getString("description");
                int id = rs.getInt("shiftid");
                
                Unavailability un = new Unavailability(start, end, description);
                un.setEventID(id);
                
                unavailable.add(un);
                
            }
            
            return unavailable;
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    private Collection<Event> getShiftEventsForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod) {
        String sql = "select * from shift where shiftid in (select shiftid from shift where datediff(DAY, start, DATEADD(DAY, ?, ?) ) >0 and idnumber = ?)";
        
            try (
                // get connection to database
                Connection connection = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = connection.prepareStatement(sql);) {
                
            // set the parameter
            Date starto = Date.valueOf(startOfPeriod);
            stmt.setInt(1, daysInPeriod);
            stmt.setDate(2, starto);
            stmt.setInt(3, Integer.valueOf(userID));

            // execute the query
            ResultSet rs = stmt.executeQuery();
            Collection<Event> shift = new HashSet<>();

            // query only returns a single result, so use 'if' instead of 'while'
            while (rs.next()) {
                Timestamp startt = rs.getTimestamp("start");
                Timestamp endd = rs.getTimestamp("end");
                Instant start = startt.toInstant();
                Instant end = endd.toInstant();
                String name = rs.getString("name");
                String description = rs.getString("description");
                String notes = rs.getString("notes");
                String type = rs.getString("type");
                Integer id = rs.getInt("ShiftID");
                
                Shift s = new Shift(start, end, name, description, notes, type);
                s.setEventID(id);
                
                shift.add(s);
                
            }
            
            return shift;
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }

    }    

    private Collection<Event> getAllEventsForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod) {
        ArrayList<Event> all = new ArrayList();
        all.addAll(getUnavailableEventsForPeriod(userID, startOfPeriod, daysInPeriod));
        all.addAll(getShiftEventsForPeriod(userID, startOfPeriod, daysInPeriod));
        return all;
    }

    @Override
    public Integer getUserHoursForPeriod(String userID, LocalDate startOfPeriod, int daysInPeriod) {
        String sql = "select sum(datediff(HOUR, start, end)) as hours from shift where shiftid in (select shiftid from shift where datediff(DAY, start, DATEADD(DAY, ?, ?) ) >0 and idnumber= ?) group by idnumber";
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);
            ) {
            // set the parameter
            Date starto = Date.valueOf(startOfPeriod);
            stmt.setInt(1, daysInPeriod);
            stmt.setDate(2, starto);
            stmt.setInt(3, Integer.valueOf(userID));
            // execute the query
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                int total = rs.getInt("hours");
                return total;
            } else {
                return null;
            }
            // int dap = dp.executeUpdate();
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }

    @Override
    public Collection<User> getUsersByDepartment(User.Department department) {
        String sql = "select * from User where department = ?";
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, department.toString());
            System.out.println(stmt.toString());
            // execute the query
            ResultSet rs = stmt.executeQuery();

            // Using a List to preserve the order in which the data was returned from the query.
            Collection<User> user = new HashSet<>();

            // iterate through the query results
            while (rs.next()) {

                // get the data out of the query
                String username = rs.getString("username");
                String idnumber = rs.getString("idnumber");
                String rolee = rs.getString("role");
                User.Role role = User.Role.valueOf(rolee);
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                String emailaddress = rs.getString("emailaddress");
                String dept = rs.getString("department");

                // use the data to create a user object
                User u = new User(username, idnumber, role, firstname, lastname, emailaddress);
                u.setDepartment(User.Department.valueOf(dept));

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
        String sql = "select * from User where role = ?";
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, role.toString());
            // execute the query
            ResultSet rs = stmt.executeQuery();

            // Using a List to preserve the order in which the data was returned from the query.
            Collection<User> user = new ArrayList<>();

            // iterate through the query results
            while (rs.next()) {

                // get the data out of the query
                String username = rs.getString("username");
                String idnumber = rs.getString("idnumber");
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                String emailaddress = rs.getString("emailaddress");
                String dept = rs.getString("department");
                // use the data to create a user object
                User u = new User(username, idnumber, role, firstname, lastname, emailaddress);
                u.setDepartment(User.Department.valueOf(dept));

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
    public void removeShiftFromUser(String userID, Integer eventID) {
        String sql = "Update Shift set idnumber = null where shiftid = ? and idnumber = ?";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setInt(1, eventID);
            stmt.setString(2, userID);
            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    public void resetDAO() {
        String sql = "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE SHIFT; TRUNCATE TABLE UNAVAILABILITY; TRUNCATE TABLE USER;SET FOREIGN_KEY_CHECKS = 1;";
        try (
                Connection dbCon = DbConnection.getConnection(uri);
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.executeUpdate();  // execute the statement

        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
    
    @Override
    public boolean userExists(String userID) {
        String sql = "select * from User where idnumber = ?";
        
        try (
                // get a connection to the database
                Connection dbCon = DbConnection.getConnection(uri); // create the statement
                PreparedStatement stmt = dbCon.prepareStatement(sql);) {
            stmt.setString(1, userID);
// execute the query
            ResultSet rs = stmt.executeQuery();
            
            return (rs.next());
            
        } catch (SQLException ex) {  // we are forced to catch SQLException
            // don't let the SQLException leak from our DAO encapsulation
            throw new DAOException(ex.getMessage(), ex);
        }
    }
}
