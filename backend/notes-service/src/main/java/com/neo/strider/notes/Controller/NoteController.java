package com.neo.strider.notes.Controller;

import com.neo.strider.notes.DTO.NotesDTO;
import com.neo.strider.notes.Entity.Notes;
import com.neo.strider.notes.Service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
public class NoteController {

    @Autowired
    NoteService noteService;

    @GetMapping("/")
    public String greet(){
        return "Hello Sir!";
    }

    @GetMapping("/getnotes")
    public ResponseEntity<List<NotesDTO>> getnotes(){
        return noteService.getnotes();
    }

    @PostMapping("/addnote")
    public ResponseEntity<NotesDTO> createNote(@Valid @RequestBody Notes notes){
        return noteService.create(notes);
    }

    @GetMapping("/getnote/{Id}")
    public ResponseEntity<NotesDTO> getNoteById(@PathVariable  int id){
        return noteService.getNoteById(id);
    }

    @PutMapping("/getnote/{Id}")
    public ResponseEntity<NotesDTO> updateNote(@Valid @RequestBody Notes note,@PathVariable  int Id){
        return noteService.updateNote(note,Id);
    }

    @DeleteMapping("/getnote/{Id}")
    public ResponseEntity<String> deleteNote(@PathVariable  int id){
        return noteService.deleteNote(id);
    }

}
