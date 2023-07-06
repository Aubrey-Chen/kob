package com.kob.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("pcpr"));
        System.out.println(passwordEncoder.matches("pcpr", "$2a$10$JxUzSOQpgbP9RP5duGKQl.CUXeWsuikkTA/WBpSWbGJQFY2s1W9R."));
        System.out.println(passwordEncoder.encode("pcq"));
        System.out.println(passwordEncoder.encode("pczq"));
        System.out.println(passwordEncoder.encode("phsc"));
    }

}
