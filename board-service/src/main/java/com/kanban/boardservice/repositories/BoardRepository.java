package com.kanban.boardservice.repositories;

import com.kanban.boardservice.entities.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAllByUserId(String userId);
    Optional<Board> findByIdAndUserId(Long id, String userId);
}

