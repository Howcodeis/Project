package com.mapper;

import com.domain.User;
import com.domain.User_Permissions;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    //    查询用户
    //    Options 主键生成
//    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Select("select * from user where username = #{username}")
    User select(String username);


    //     注册
    @Insert("insert into user (username, password, permissions_id) values (#{username}, #{password}, 3)")
    void save(String username, String password);

    //    删除
    @Delete("delete from user where user_id = #{userId}")
    int delete(Integer userId);
}