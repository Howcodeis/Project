package com.mapper;

import com.domain.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    //    查询用户
    //    Options 主键生成
//    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Select("select * from user where username = #{username}")
    User select(String username);


    //     注册
    @Insert("insert into user (username, password, permissions_id, date) values (#{username}, #{password}, 3, #{date})")
    void save(String username, String password, String date);

    //    删除
    @Delete("delete from user where user_id = #{userId}")
    void delete(Integer userId);
}