package com.mapper;

import com.domain.User_Permissions;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
@Mapper
public interface User_PermissionsMapper {

    //    查询所有用户
    @Select("select u.user_id, u.username ,u.date, p.permissions_name from user u inner join permissions p on u.permissions_id = p.id")
    List<User_Permissions> selectAll();

//    权限更新
    @Update("update user u inner join permissions p on u.permissions_id=p.id set u.username=#{username},u.permissions_id = #{permissionsId} where u.user_id = #{userId}")
    void update(String username, int permissionsId, int userId);


    @Select("select u.username ,u.permissions_id from user u inner join permissions p on u.permissions_id = p.id where u.user_id = #{userId}")
    User_Permissions selectOne(int userId);
}

