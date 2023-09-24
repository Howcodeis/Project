package com.controller;


import com.Exception.NormalException;
import com.domain.User;
import com.domain.User_Permissions;
import com.mapper.User_PermissionsMapper;
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
    private User_PermissionsMapper userPermissions;

    @ApiOperation("登录")
    @GetMapping("/login")
    public JsonResult login(String username, String password) throws NormalException {
        try {
            User user = userService.login(username, password);
            String token = JwtUtil.createToken(username);
            return JsonResult.success().data("token", token, "user", user);
        } catch (NormalException e) {
            return JsonResult.fail(e.getMessage());
        }
    }

    @ApiOperation("登陆成功展示所有用户")
    @GetMapping("/user")
    public List<User_Permissions> selcetAll() {
        List<User_Permissions> selectAll = userPermissions.selectAll();
        return selectAll;
    }

    @ApiOperation("注册")
    @PostMapping("/register")
    public JsonResult save(String username, String password) throws NormalException {
        try {
            userService.register(username, password);
            return JsonResult.success("注册成功");
        } catch (NormalException e) {
            return JsonResult.fail(e.getMessage());
        }
    }

    @ApiOperation("登陆成功展示当前登录用户")
    @GetMapping("/info")
    public JsonResult info(@RequestHeader("Authorization") String Authorization, String token) {
        System.out.println(Authorization);
        String username = JwtUtil.getClaimsByToken(token).getSubject();
        return JsonResult.success().data("name", username);
    }

    @PostMapping("/delete")
    public JsonResult del(Integer userId) {
        System.out.println(userId);
        if (userId != null) {
            userService.delete(userId);
        }
//        else {
//            JsonResult.fail("用户不存在").data("staus", 0);
//        }
        return JsonResult.success("删除成功");
    }

    @ApiOperation("登出")
    @PostMapping("/logout")
    public JsonResult logout() {
        return JsonResult.success("登出成功");
    }
}
