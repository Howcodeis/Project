package com.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@RestController
public class FileUpLoadController {

    @PostMapping("load")
    public String upload(String nickname, MultipartFile photo, HttpServletRequest request){
        System.out.println(nickname);
        System.out.println(photo.getContentType());
        System.out.println(photo.getOriginalFilename());
        String path = request.getServletContext().getRealPath("/upload");
        System.out.println(path);
        return "Upload Successful";
    }

    public void  saveFile(MultipartFile photo, String path) throws IOException {
        File dir = new File(path);
        if(!dir.exists()){
            dir.mkdir();
        }
//        File = new File(pathname:path + photo.getOriginalFilename());
//        photo.transferTo(file);
    }
}
