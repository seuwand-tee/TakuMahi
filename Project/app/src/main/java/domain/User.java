package domain;

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

}
