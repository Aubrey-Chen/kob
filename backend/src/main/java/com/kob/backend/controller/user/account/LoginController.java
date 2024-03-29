package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.LoginService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user/account/")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("token/")
    public Map<String, String> getToken(@RequestParam @NotNull Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        return loginService.getToken(username, password);
    }
}
