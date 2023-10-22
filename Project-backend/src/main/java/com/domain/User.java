package com.domain;

public class User {
    private int userId;
    private String username;
    private String password;
    private int permissionsId;

//    private Permissions permissions;

    public User() {
    }

    public User(int userId, String username, String password, int permissionsId, Permissions permissions) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.permissionsId = permissionsId;
//        this.permissions = permissions;
    }

//    public Permissions getPermissions() {
//        return permissions;
//    }
//
//    public void setPermissions(Permissions permissions) {
//        this.permissions = permissions;
//    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(int permissionsId) {
        this.permissionsId = permissionsId;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", permissionsId=" + permissionsId +
//                ", permissions=" + permissions +
                '}';
    }
}
