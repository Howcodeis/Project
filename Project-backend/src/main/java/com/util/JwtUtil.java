package com.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.util.Date;

public class JwtUtil {
    //    七天过期
    private static final long expire = 604800;
    //    32位密钥
    private static final String secret = "jksmonesyjksmonesywdawdadfawdawyug";

    //    生成token
    public static String createToken(String username) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 1000 * expire);
        return Jwts.builder()
//                alg : algorithm , 签名算法(默认HMAC SHA256)
//                tye : 表示令牌(token)的类型
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
//                存储用户姓名
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiration)
//                打包
                .compact();
    }

    //    解析token
    public static Claims getClaimsByToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
//                解析token
                .parseClaimsJwt(token)
//                获取对应信息体
                .getBody();
    }
}
