package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController  // 默认是返回一个数据，而不是像@Controller一样去找模板
@RequestMapping("/pk/")
public class BotInfoController {
    @RequestMapping("getbotinfo/")
    public List<Map<String, String>> getBotInfo() {
        List<Map<String, String>> list = new LinkedList<>();
        Map<String, String> bot1 = new HashMap<>();
        bot1.put("name", "Saber");
        bot1.put("rating", "1500");
        Map<String, String> bot2 = new HashMap<>();
        bot2.put("name", "Lancer");
        bot2.put("rating", "1000");
        list.add(bot1);
        list.add(bot2);
        return list;
    }
}
