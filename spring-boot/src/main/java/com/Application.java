package com;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;

// 主程序类
// @SpringBootApplication：这是一个SpringBoot应用(必须添加)
@SpringBootApplication
@MapperScan("com.mapper")
@CrossOrigin
public class Application {

    public static void main(String[] args) {
        // 返回IOC容器
        SpringApplication.run(Application.class, args);
        // 查看组件
//        String[] names = run.getBeanDefinitionNames();
//        for (String name: names) {
//            System.out.println(name);
//        }
        // 从容器中获取组件
//        User user01 = run.getBean("user01", User.class);
//        System.out.println(user01);
    }
}
