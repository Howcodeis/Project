package com.mapper;

import com.domain.User_Permissions;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface User_PermissionsMapper {

    //    查询所有用户
    @Select("select u.user_id, u.username , p.permissions_name from user u inner join permissions p on u.permissions_id = p.id")
    List<User_Permissions> selectAll();
}
