package com.domain;

public class User_Permissions {

    private int userId;
    private String username;
    private String permissionsName;

    public User_Permissions() {
    }

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

    public String getPermissionsName() {
        return permissionsName;
    }

    public void setPermissionsName(String permissionsName) {
        this.permissionsName = permissionsName;
    }

    @Override
    public String toString() {
        return "User_Permissions{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", permissionsName='" + permissionsName + '\'' +
                '}';
    }
}
