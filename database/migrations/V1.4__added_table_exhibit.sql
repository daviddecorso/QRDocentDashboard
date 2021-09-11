CREATE TABLE museum.exhibit(
    exhibit_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT '',
    image VARCHAR(512) NOT NULL DEFAULT '',
    video VARCHAR(512) NOT NULL DEFAULT '',
    website VARCHAR(512) NOT NULL DEFAULT '',
    museum_id INT NOT NULL,
    CONSTRAINT fk_museum_exhibit_museum_museum FOREIGN KEY(museum_id) REFERENCES museum.museum(museum_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_museum_exhibit_fk_museum_id
ON museum.exhibit(museum_id);

CREATE UNIQUE INDEX idx_unique_museum_exhibit_name
ON museum.exhibit(name);

CREATE UNIQUE INDEX idx_unique_museum_exhibit_status
ON museum.exhibit(status);

CREATE TRIGGER tr_museum_exhibit_update_timestamp
    BEFORE UPDATE ON museum.exhibit
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();