package com.neo.strider.notes.Service;

import com.neo.strider.notes.DTO.NotesDTO;
import com.neo.strider.notes.Exception.NoteNotFoundException;
import com.neo.strider.notes.Entity.Notes;
import com.neo.strider.notes.Repository.NotesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class NoteService {

    @Autowired
    NotesRepo notesRepo;

    public ResponseEntity<NotesDTO> create(Notes note) {
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        notesRepo.save(note);
        NotesDTO notesDTO=new NotesDTO();
        notesDTO.setTitle(note.getTitle());
        notesDTO.setContent(note.getContent());
        notesDTO.setUpdatedAt(note.getUpdatedAt());
        return ResponseEntity.status(HttpStatus.CREATED).body(notesDTO);
    }

    public ResponseEntity<List<NotesDTO>> getnotes() {
        List<NotesDTO> notesDTO =notesRepo.findAll().stream()
                .map(Notes->{
                    NotesDTO dto = new NotesDTO();
                    dto.setTitle(Notes.getTitle());
                    dto.setContent(Notes.getContent());
                    dto.setUpdatedAt(Notes.getUpdatedAt());
                    return dto;
                }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(notesDTO);
    }

    public ResponseEntity<NotesDTO> getNoteById(int id) {
       Notes note=notesRepo.findById(id).orElseThrow(()->new NoteNotFoundException("Note not found!"));
       NotesDTO dto=new NotesDTO();
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        dto.setUpdatedAt(note.getUpdatedAt());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    public ResponseEntity<NotesDTO> updateNote(Notes note, int id) {
        Notes existingNotes=notesRepo.findById(id).orElseThrow(()->new NoteNotFoundException("Note not found!"));
        existingNotes.setTitle(note.getTitle());
        existingNotes.setContent(note.getContent());
        existingNotes.setUpdatedAt(LocalDateTime.now());
        notesRepo.save(existingNotes);
        NotesDTO dto=new NotesDTO();
        dto.setTitle(existingNotes.getTitle());
        dto.setContent(existingNotes.getContent());
        dto.setUpdatedAt(existingNotes.getUpdatedAt());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    public ResponseEntity<String> deleteNote(int id) {
        Notes note=notesRepo.findById(id).orElseThrow(()->new NoteNotFoundException("Note not found!"));
        notesRepo.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully!");
    }
}
