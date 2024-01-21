package com.kanban.taskservice.services;

import com.kanban.taskservice.entities.Task;
import com.kanban.taskservice.repositories.TaskRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }
    public Task updateTask(int taskId, Task updatedTask) {
        // Find the existing task by taskId
        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new NoSuchElementException("Task not found with id: " + taskId));

        // Update the fields of the existing task with the data from updatedTask
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setSummary(updatedTask.getSummary());

        // Save the updated task to the repository
        return taskRepository.save(existingTask);
    }
    public List<Task> getTasksByBoardId(int boardId) {
        return taskRepository.findByBoardId(boardId);
    }
}