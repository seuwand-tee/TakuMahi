package domain;

/**
 *  The User class is used for all user accounts in the system.
 *  Users are differentiated between Manager and Employee status by the adminPerms
 *  field. Where this being set to 'true' signifies admin permission and subsequently
 *  Manager status.
 */
public class User {

    public enum Role {
        Manager,
        Senior,
        Casual
        // List can be extended as needed.
    }

    private String username;
    private Integer idNumber;
    private boolean adminPerms;
    private Role role;
    //private String password; <- This would be a hashed password in functioning product. We are not
    //                            implementing password authentication in this prototype.
    private String firstName;
    private String lastName;
    private String emailAddress;

    public User(){};

    public User(String username, Integer idNumber, boolean adminPerms, Role role, String firstName, String lastName, String emailAddress) {
        this.username = username;
        this.idNumber = idNumber;
        this.adminPerms = adminPerms;
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

    public Integer getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(Integer idNumber) {
        this.idNumber = idNumber;
    }

    public boolean isAdminPerms() {
        return adminPerms;
    }

    public void setAdminPerms(boolean adminPerms) {
        this.adminPerms = adminPerms;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
