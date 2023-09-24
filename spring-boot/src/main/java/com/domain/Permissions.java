package com.domain;

public class Permissions {
    private int id;
    private String permissionsName;

    public Permissions() {
    }

    public Permissions(int id, String permissionsName) {
        this.id = id;
        this.permissionsName = permissionsName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPermissionsName() {
        return permissionsName;
    }

    public void setPermissionsName(String permissionsName) {
        this.permissionsName = permissionsName;
    }

    @Override
    public String toString() {
        return "Permissions{" +
                "id=" + id +
                ", permissionsName='" + permissionsName + '\'' +
                '}';
    }
}
