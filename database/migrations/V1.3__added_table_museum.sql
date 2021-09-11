CREATE TABLE museum.museum(
    museum_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tr_museum_museum_update_timestamp
    BEFORE UPDATE ON museum.museum
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();