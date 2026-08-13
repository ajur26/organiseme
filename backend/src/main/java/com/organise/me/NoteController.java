package com.organise.me;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {
    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }


    @GetMapping
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }
}
