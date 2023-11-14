package com.kob.backend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // 自动装配Getter、Setter、toSting函数
@NoArgsConstructor  // 自动装配无参构造函数
@AllArgsConstructor  // 自动装配有参构造函数
public class User {
    @TableId(type = IdType.AUTO)  // MyBatis-Plus提供的id自增的注解
    private Integer id;
    private String username;
    private String password;
    private String photo;
}
