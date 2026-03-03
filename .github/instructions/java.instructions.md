---
description: "Java and Spring Boot coding standards for backend development"
applyTo: "backend/**"
---

# Java and Spring Boot Coding Standards

This document defines coding standards for the CIVIC backend API built with Java 21 and Spring Boot 3.x.

## Java 21 Features

Leverage modern Java features where appropriate:

* **Records** for DTOs and immutable data carriers
* **Pattern matching** for instanceof checks
* **Text blocks** for multi-line strings (SQL queries, JSON)
* **Sealed classes** for restricted type hierarchies

Example record DTO:

```java
public record ProgramCreateRequest(
    @NotBlank @Size(max = 200) String programName,
    @NotBlank String programDescription,
    @NotNull Integer programTypeId,
    @Email String contactEmail
) {}
```

## Spring Boot 3.x Conventions

### Dependency Injection

* Use **constructor injection** exclusively
* Never use `@Autowired` on fields
* Mark dependencies as `final`

```java
@Service
public class ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramTypeRepository programTypeRepository;

    public ProgramService(ProgramRepository programRepository,
                          ProgramTypeRepository programTypeRepository) {
        this.programRepository = programRepository;
        this.programTypeRepository = programTypeRepository;
    }
}
```

### Controller Layer

* Return `ResponseEntity<T>` from all controller methods
* Use `@Valid` annotation for request body validation
* Use `@PathVariable` and `@RequestParam` for parameters

```java
@RestController
@RequestMapping("/api/programs")
public class ProgramController {
    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @Valid @RequestBody ProgramCreateRequest request) {
        // implementation
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

### Error Handling

Use RFC 7807 `ProblemDetail` for error responses:

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
    ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
    problem.setTitle("Not Found");
    problem.setDetail(ex.getMessage());
    return problem;
}
```

## Spring Data JPA

### Repository Pattern

* Extend `JpaRepository<Entity, ID>`
* Use method naming conventions for simple queries
* Use `@Query` for complex queries

```java
public interface ProgramRepository extends JpaRepository<Program, Long> {
    List<Program> findByStatus(String status);
    
    @Query("SELECT p FROM Program p WHERE p.programType.id = :typeId")
    List<Program> findByProgramTypeId(@Param("typeId") Integer typeId);
}
```

### Entity Design

* Use `@Entity` and `@Table` annotations
* Include audit columns: `createdAt`, `updatedAt`, `createdBy`
* Use `@PrePersist` and `@PreUpdate` for audit timestamps

```java
@Entity
@Table(name = "program")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
}
```

## Bean Validation

Use Jakarta Bean Validation annotations:

| Annotation   | Usage                              |
|-------------|------------------------------------|
| @NotBlank   | Non-null, non-empty string         |
| @NotNull    | Non-null value                     |
| @Size       | String/collection length bounds    |
| @Email      | Valid email format                 |
| @Pattern    | Regex pattern match                |
| @Min/@Max   | Numeric value bounds               |

## Database Configuration

### Flyway Migrations

* Location: `src/main/resources/db/migration/`
* Naming: `V001__description.sql`
* See `sql.instructions.md` for SQL standards

### Local Development (H2)

Configure H2 with SQL Server compatibility mode:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:civicdb;MODE=MSSQLServer;DATABASE_TO_LOWER=TRUE
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
```

### Azure SQL (Production)

Use Spring profiles for environment-specific configuration:

```yaml
spring:
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:local}
---
spring:
  config:
    activate:
      on-profile: azure
  datasource:
    url: ${AZURE_SQL_URL}
```

## Package Structure

```text
com.ontario.program/
├── controller/          # REST controllers
├── service/             # Business logic
├── repository/          # Data access
├── entity/              # JPA entities
├── dto/                 # Request/response DTOs
├── exception/           # Custom exceptions
└── config/              # Configuration classes
```

## Testing

* Use `@WebMvcTest` for controller tests
* Use `@DataJpaTest` for repository tests
* Use `@SpringBootTest` for integration tests
* Mock external dependencies with `@MockBean`
