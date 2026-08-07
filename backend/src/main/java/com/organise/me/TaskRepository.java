package com.organise.me;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public TaskRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Task> findAll() {
        String sql = """
                SELECT id, title, description, completed
                FROM tasks
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, (resultSet, rowNum) ->
                new Task(
                        resultSet.getLong("id"),
                        resultSet.getString("title"),
                        resultSet.getString("description"),
                        resultSet.getBoolean("completed")
                )
        );
    }

    public void save(Task task) {
        String sql = """
                INSERT INTO tasks (title, description, completed)
                VALUES (?, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );
    }

    public void deleteById(Long id){
        String sql = """
                DELETE FROM tasks
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, id);
    }

    public void update(Task task) {
        String sql = """
                UPDATE tasks
                SET title = ?, description = ?, completed = ?
                WHERE id = ?
                """;

        jdbcTemplate.update(
            sql,
            task.getTitle(),
            task.getDescription(),
            task.isCompleted(),
            task.getId()
        );
    }
}