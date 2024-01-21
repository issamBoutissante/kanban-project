package com.kanban.taskservice.services;

import static org.junit.jupiter.api.Assertions.*;

import com.kanban.taskservice.entities.Task;
import com.kanban.taskservice.repositories.TaskRepository;
import jakarta.ws.rs.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService(taskRepository);
    }

    @Test
    void createTask() {
        // Arrange
        Task task = new Task(0, "New Task", "OPEN", "Summary", 1);
        Task savedTask = new Task(1, "New Task", "OPEN", "Summary", 1);
        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        // Act
        Task createdTask = taskService.createTask(task);

        // Assert
        assertNotNull(createdTask);
        assertEquals(savedTask.getId(), createdTask.getId());
    }

    @Test
    void deleteTask() {
        // Arrange
        int taskId = 1;
        doNothing().when(taskRepository).deleteById(taskId);

        // Act
        taskService.deleteTask(taskId);

        // Assert
        verify(taskRepository, times(1)).deleteById(taskId);
    }

    @Test
    void updateTask() {
        // Arrange
        int taskId = 1;
        Task existingTask = new Task(taskId, "Existing Task", "OPEN", "Summary", 1);
        Task updatedTask = new Task(taskId, "Updated Task", "IN_PROGRESS", "Updated Summary", 1);
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        // Act
        Task result = taskService.updateTask(taskId, updatedTask);

        // Assert
        assertNotNull(result);
        assertEquals(updatedTask.getTitle(), result.getTitle());
        assertEquals(updatedTask.getStatus(), result.getStatus());
        assertEquals(updatedTask.getSummary(), result.getSummary());
    }

    @Test
    void getTasksByBoardId() {
        // Arrange
        int boardId = 1;
        Task task = new Task(1, "Task", "OPEN", "Summary", boardId);
        when(taskRepository.findByBoardId(boardId)).thenReturn(Arrays.asList(task));

        // Act
        List<Task> tasks = taskService.getTasksByBoardId(boardId);

        // Assert
        assertFalse(tasks.isEmpty());
        assertEquals(1, tasks.size());
        assertEquals(task.getTitle(), tasks.get(0).getTitle());
    }

    @Test
    void updateTask_NotFound() {
        // Arrange
        int taskId = 1;
        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NoSuchElementException.class, () -> taskService.updateTask(taskId, new Task()));
    }
}
