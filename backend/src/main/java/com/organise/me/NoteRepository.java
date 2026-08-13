package com.organise.me;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NoteRepository {
    private final JdbcTemplate jdbcTemplate;

    public NoteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Note> findAll() {

        String sql = """
                SELECT id, title, content, created_at, updated_at
                FROM notes
                Order BY updated_at DESC
                """;
    

        return jdbcTemplate.query(sql, (resultSet, rowNum) -> 
                new Note(
                        resultSet.getLong("id"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getTimestamp("created_at").toLocalDateTime(),
                        resultSet.getTimestamp("updated_at").toLocalDateTime()
                )
        );
    }

}
