package com.kanban.taskservice.controllers;

import com.kanban.taskservice.entities.Task;
import com.kanban.taskservice.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<Task>> getTasksByBoardId(@PathVariable int boardId) {
        List<Task> tasks = taskService.getTasksByBoardId(boardId);
        return ResponseEntity.ok(tasks);
    }
    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable int taskId, @RequestBody Task updatedTask) {
        Task task = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(task);
    }
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}