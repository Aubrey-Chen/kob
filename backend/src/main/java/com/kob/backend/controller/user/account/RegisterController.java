package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.RegisterService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user/account/")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @PostMapping("register/")
    public Map<String, String> register(@RequestBody @NotNull Map<String, Object> map){
        String username = map.get("username").toString();
        String password = map.get("password").toString();
        String confirmedPassword = map.get("confirmedPassword").toString();
        return registerService.register(username, password, confirmedPassword);
    }
}
