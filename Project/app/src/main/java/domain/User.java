package domain;

import java.util.Objects;

/**
 *  The User class is used for all user accounts in the system.
 *  The role data-field will be used to allocate a users permissions on the site.
 */
public class User {

    public enum Role {
        Manager,
        Senior,
        Casual
        // List can be extended as needed.
    }

    public enum Department {
        StudentIT,
        AskIT,
        GeneralEnquiries
        // List can be extended as needed
    }

    private String username;
    private  String idNumber;
    private Role role;
    private Department department;
    //private String password; <- This would be a hashed password in functioning product. We are not
    //                            implementing password authentication in this prototype.
    private String firstName;
    private String lastName;
    private String emailAddress;



    public User(){};

    public User(String username, String idNumber, Role role, String firstName, String lastName, String emailAddress) {
        this.username = username;
        this.idNumber = idNumber;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 23 * hash + Objects.hashCode(this.username);
        hash = 23 * hash + Objects.hashCode(this.idNumber);
        hash = 23 * hash + Objects.hashCode(this.role);
        hash = 23 * hash + Objects.hashCode(this.department);
        hash = 23 * hash + Objects.hashCode(this.firstName);
        hash = 23 * hash + Objects.hashCode(this.lastName);
        hash = 23 * hash + Objects.hashCode(this.emailAddress);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (!Objects.equals(this.username, other.username)) {
            return false;
        }
        if (!Objects.equals(this.idNumber, other.idNumber)) {
            return false;
        }
        if (!Objects.equals(this.firstName, other.firstName)) {
            return false;
        }
        if (!Objects.equals(this.lastName, other.lastName)) {
            return false;
        }
        if (!Objects.equals(this.emailAddress, other.emailAddress)) {
            return false;
        }
        if (this.role != other.role) {
            return false;
        }
        if (this.department != other.department) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "User{" + "username=" + username + ", idNumber=" + idNumber + ", role=" + role + ", department=" + department + ", firstName=" + firstName + ", lastName=" + lastName + ", emailAddress=" + emailAddress + '}';
    }

    
    
}
