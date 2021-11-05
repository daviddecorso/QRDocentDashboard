CREATE TABLE museum.scan(
    scan_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    exhibit_id INT NOT NULL,
    CONSTRAINT fk_museum_scan_museum_user FOREIGN KEY(user_id) REFERENCES museum.user(user_id),
    CONSTRAINT fk_museum_scan_museum_exhibit FOREIGN KEY(exhibit_id) REFERENCES museum.exhibit(exhibit_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_museum_scan_fk_user_id
ON museum.scan(user_id);

CREATE INDEX idx_museum_scan_fk_exhibit_id
ON museum.scan(exhibit_id);

CREATE INDEX idx_museum_scan_created_at
ON museum.scan(created_at);

CREATE TRIGGER tr_museum_scan_update_timestamp
    BEFORE UPDATE ON museum.scan
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();