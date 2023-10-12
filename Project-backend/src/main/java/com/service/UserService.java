package com.service;

import com.Exception.NormalException;
import com.domain.User;

public interface UserService {
    User login(String username, String password) throws NormalException;

    void register(String username, String password, String date) throws NormalException;

    void delete(Integer userId);

}
