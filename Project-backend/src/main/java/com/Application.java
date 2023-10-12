package com;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 主程序类
// @SpringBootApplication：这是一个SpringBoot应用(必须添加)
@SpringBootApplication
@MapperScan("com.mapper")
public class Application {

    public static void main(String[] args) {
        // 返回IOC容器
        SpringApplication.run(Application.class, args);
    }
}
