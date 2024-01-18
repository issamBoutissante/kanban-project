package com.kanban.boardservice.services;

import com.kanban.boardservice.dtos.BoardDTO;
import com.kanban.boardservice.entities.Board;
import com.kanban.boardservice.repositories.BoardRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    ModelMapper modelMapper = new ModelMapper();
    public List<BoardDTO> getAllBoards(String userId) {
        return boardRepository.findAllByUserId(userId).stream()
                .map(board -> modelMapper.map(board, BoardDTO.class))
                .toList();
    }

    public BoardDTO createBoard(Board board) {
        return modelMapper.map(boardRepository.save(board),BoardDTO.class);
    }

    public void deleteBoard(Long id,String userId) {
        if(boardRepository.findByIdAndUserId(id,userId).isPresent()){
            boardRepository.deleteById(id);
        }
    }
}
