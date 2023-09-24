package com.config;

import com.Interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 配置类 (等同于 配置文件 bean标签)
@Configuration
public class WebConfig implements WebMvcConfigurer {
    //    @Bean("user01") // 给容器中添加组件，以方法名作为组件的id，返回的类型就是组件的类型，返回值就是组件实例
//    public User userConfig(){
//        return new User("jwt", "1234");
//    }
//    添加拦截器使其生效
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor());
//                .addPathPatterns("/home/**") //静态资源被拦截
//                .excludePathPatterns("/","/login","/register");
    }
}
