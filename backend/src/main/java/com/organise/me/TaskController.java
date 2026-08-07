package com.organise.me;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")

public class TaskController {

    @GetMapping
    public List<Task> getTasks() {
        return List.of(new Task(1L, "Task 1", "Description for Task 1", false),
                new Task(2L, "Task 2", "Description for Task 2", true),
                new Task(3L, "Task 3", "Description for Task 3", false)
            );
    }
}