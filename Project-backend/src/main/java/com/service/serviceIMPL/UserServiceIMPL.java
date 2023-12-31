package com.service.serviceIMPL;

import com.Exception.NormalException;
import com.domain.User;
import com.mapper.UserMapper;
import com.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Objects;

@Service
public class UserServiceIMPL implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public User login(String username, String password) throws NormalException {
//        查询用户
        User user = userMapper.select(username);
        if (Objects.requireNonNull(username).trim().isEmpty()
                || Objects.requireNonNull(password).trim().isEmpty()) {
            throw new NormalException("账密不能为空");
        }
//        检查是否存在用户
        else if (user == null) {
            throw new NormalException("账户不存在");
        } else if (user.getPassword().equals(password)) {
            return user;
        } else {
            throw new NormalException("账号密码错误");
        }
    }

    @Override
    public void register(String username, String password, String gender, String date) throws NormalException {
//        查询用户
        User user = userMapper.select(username);
        if (Objects.requireNonNull(username).trim().isEmpty()
                || Objects.requireNonNull(password).trim().isEmpty()) {
            throw new NormalException("账密不能为空");
        }
//        检查是否存在用户
        else if (user == null) {
            userMapper.save(username, password, gender, date);
        } else {
            throw new NormalException("账号已存在");
        }
    }

    @Override
    public void delete(Integer userId) {
        userMapper.delete(userId);
    }
}

