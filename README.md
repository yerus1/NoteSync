
```Technologies
Java
Spring Boot
Spring Security
PostgreSQL
React
```

```java
@Service
public class NoteSyncService {

  private final List<String> features = List.of(
    "Spring Boot backend",
    "Minimalist frontend",
    "Fast note creation",
    "Seamless syncing",
    "Scalable architecture"
  );

  @Autowired
  private NoteRepository noteRepository;

  public NoteAppInfo getAppInfo() {
    return NoteAppInfo.builder()
      .name("NoteSync")
      .description("A full-stack note-taking app with clean UI and fast, scalable performance.")
      .features(this.features)
      .version("1.0.0")
      .build();
  }

  public List<Note> getAllNotes() {
    return noteRepository.findAll();
  }
}
```

