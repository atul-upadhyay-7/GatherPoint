package com.GatherPoint.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Order(1)
@RequiredArgsConstructor
public class OfflineSellingSchemaMigration implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        jdbcTemplate.execute(
                "ALTER TABLE users ADD COLUMN IF NOT EXISTS allow_offline_selling BOOLEAN DEFAULT true"
        );
        jdbcTemplate.execute(
                "UPDATE users SET allow_offline_selling = true WHERE allow_offline_selling IS NULL"
        );
        jdbcTemplate.execute(
                "ALTER TABLE orders ADD COLUMN IF NOT EXISTS offline BOOLEAN DEFAULT false"
        );
        jdbcTemplate.execute(
                "UPDATE orders SET offline = false WHERE offline IS NULL"
        );
        jdbcTemplate.execute(
                "ALTER TABLE orders ADD COLUMN IF NOT EXISTS offline_reference VARCHAR(255)"
        );
        jdbcTemplate.execute(
                "ALTER TABLE orders ADD COLUMN IF NOT EXISTS pos_session_id BIGINT"
        );
    }
}
