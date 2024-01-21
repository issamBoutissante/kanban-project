package com.kanban.boardservice.controllers;

import com.kanban.boardservice.dtos.BoardDTO;
import com.kanban.boardservice.entities.Board;
import com.kanban.boardservice.services.BoardService;
import com.kanban.boardservice.services.FirebaseAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final FirebaseAuthService firebaseAuthService;
    private final ModelMapper modelMapper = new ModelMapper();

    @GetMapping
    public List<BoardDTO> getAllBoards(HttpServletRequest request) {
        String userId = firebaseAuthService.getUidFromRequest(request);
        return boardService.getAllBoards(userId);
    }

    @PostMapping
    public BoardDTO createBoard(@RequestBody BoardDTO boardDto, HttpServletRequest request) {
        String userId = firebaseAuthService.getUidFromRequest(request);
        Board newBoard = modelMapper.map(boardDto, Board.class);
        newBoard.setUserId(userId);
        return modelMapper.map(boardService.createBoard(newBoard), BoardDTO.class);
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id, HttpServletRequest request) {
        String userId = firebaseAuthService.getUidFromRequest(request);
        boardService.deleteBoard(id, userId);
    }
}
