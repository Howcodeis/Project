package com.domain;

import java.sql.Date;

public class User_Permissions {

    private int userId;
    private int permissionsId;
    private String username;
    private String permissionsName;
    private Date date;

    public User_Permissions() {
    }

    public int getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(int permissionsId) {
        this.permissionsId = permissionsId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
                ", date=" + date +
                '}';
    }
}
