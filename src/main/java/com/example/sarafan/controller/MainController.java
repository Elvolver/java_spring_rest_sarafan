package com.example.sarafan.controller;

import com.example.sarafan.domain.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/")
public class MainController {
    @GetMapping
    public User main(Model model, @AuthenticationPrincipal User user) {
        HashMap<Object, Object> data = new HashMap<>();
        data.put("profile", user);
        data.put("messages", null);

        model.addAttribute("frontendData", data.get("profile"));

        return user;
    }
}
