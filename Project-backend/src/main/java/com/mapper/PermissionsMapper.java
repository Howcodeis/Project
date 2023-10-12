package com.mapper;

import com.domain.Permissions;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PermissionsMapper {

    @Select("select * from permissions")
    List<Permissions> selectAllPermissions();
}
