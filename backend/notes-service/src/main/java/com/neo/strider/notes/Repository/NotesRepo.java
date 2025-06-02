package com.neo.strider.notes.Repository;

import com.neo.strider.notes.Entity.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepo extends JpaRepository<Notes,Integer> {
}
