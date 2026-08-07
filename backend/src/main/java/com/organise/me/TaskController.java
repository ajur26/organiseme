package com.organise.me;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")

public class TaskController {
    
    private final List<Task> tasks = new ArrayList<>();

    public TaskController() {
        tasks.add(new Task(1L, "Task 1", "Description for task 1", false));
        tasks.add(new Task(2L, "Task 2", "Description for task 2", true));
    }

    @GetMapping
    public List<Task> getTasks() {
        return tasks;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task){
        tasks.add(task);
        return task;
    }
}