package com.neo.strider.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {

    @GetMapping("/h")
    public String toString() {
        return "Hello sir!";
    }
}
