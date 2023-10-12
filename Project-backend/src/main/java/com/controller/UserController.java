package com.controller;


import com.Exception.NormalException;
import com.domain.Permissions;
import com.domain.User;
import com.domain.User_Permissions;
import com.mapper.PermissionsMapper;
import com.mapper.User_PermissionsMapper;
import com.mysql.fabric.xmlrpc.base.Data;
import com.result.JsonResult;
import com.service.UserService;
import com.util.JwtUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
// @RestController就是 @ResponseBody 和@Controller的合写
@CrossOrigin
public class UserController {

    @Resource
    private UserService userService;
    @Resource
    private User_PermissionsMapper userPermissionsMapper;
    @Resource
    private PermissionsMapper permissionsMapper;

    @ApiOperation("登录")
    @GetMapping("/login")
    public JsonResult login(String username, String password) throws NormalException {
        try {
            User user = userService.login(username, password);
//            确定该账户后 创建一个token 给该用户
            String token = JwtUtil.createToken(username);
            return JsonResult.success().data("token", token, "user", user);
        } catch (NormalException e) {
            return JsonResult.fail(e.getMessage());
        }
    }

    @ApiOperation("展示所有用户")
    @GetMapping("/userlist")
    public JsonResult selcetAll(int permissionsId) {
//        权限判定
        if (permissionsId == 1) {
            List<User_Permissions> selectAll = userPermissionsMapper.selectAll();
            return JsonResult.success("读取用户列表成功").data("userlist", selectAll, "isOwnPermission", true);
        } else {
            return JsonResult.fail("权限不足!").data("isOwnPermission", false);
        }
    }

    @ApiOperation("获取所有权限")
    @GetMapping("/permission")
    public JsonResult selectAllPermission() {
        List<Permissions> permissionsList = permissionsMapper.selectAllPermissions();
        return JsonResult.success("获取权限列表成功").data("permissionsList", permissionsList);
    }

    @ApiOperation("注册")
    @PostMapping("/register")
    public JsonResult save(String username, String password, String date) throws NormalException {
        try {
            userService.register(username, password, date);
            return JsonResult.success("注册成功");
        } catch (NormalException e) {
            return JsonResult.fail(e.getMessage());
        }
    }

    @ApiOperation("登陆成功展示当前登录用户")
    @GetMapping("/info")
    public JsonResult info(@RequestHeader("Authorization") String Authorization, String token) {
        String username = JwtUtil.getClaimsByToken(token).getSubject();
        return JsonResult.success().data("name", username);
    }

    @ApiOperation("数据删除")
    @PostMapping("/delete")
    public JsonResult del(Integer userId) {
        userService.delete(userId);
        return JsonResult.success("删除成功");
    }

    @ApiOperation("登出")
    @PostMapping("/logout")
    public JsonResult logout() {
        return JsonResult.success("登出成功");
    }

    @ApiOperation("更新数据")
    @PostMapping("/update")
    public JsonResult update(String username, int permissionsId, int userId) {
//        查询数据是否修改   考虑:是否可以只查询一次
        User_Permissions selectOne = userPermissionsMapper.selectOne(userId);
        if (!username.equals(selectOne.getUsername()) || permissionsId != selectOne.getPermissionsId()) {
            userPermissionsMapper.update(username, permissionsId, userId);
            return JsonResult.success("修改数据成功");
        } else {
            return JsonResult.fail("暂未修改");
        }
    }
}
