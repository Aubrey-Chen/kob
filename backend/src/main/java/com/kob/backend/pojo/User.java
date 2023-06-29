package com.kob.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // 自动装配Getter、Setter、toSting函数
@NoArgsConstructor  // 自动装配无参构造函数
@AllArgsConstructor  // 自动装配有参构造函数
public class User {
    private Integer id;
    private String username;
    private String password;
}
