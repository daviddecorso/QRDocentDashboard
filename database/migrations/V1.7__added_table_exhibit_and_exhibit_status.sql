CREATE TABLE museum.exhibit_status(
    exhibit_status_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tr_museum_exhibit_status_update_timestamp
    BEFORE UPDATE ON museum.exhibit_status
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();

INSERT INTO museum.exhibit_status(exhibit_status_id, description) VALUES (1, 'No QR code has been created for this exhibit.');
INSERT INTO museum.exhibit_status(exhibit_status_id, description) VALUES (2, 'A QR code has been created for this exhibit, but has not been scanned yet.');
INSERT INTO museum.exhibit_status(exhibit_status_id, description) VALUES (3, 'A QR code has been created for this exhibit and has been successfully scanned.');


CREATE TABLE museum.exhibit(
    exhibit_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    exhibit_status_id INT NOT NULL,
    museum_id INT NOT NULL,
    CONSTRAINT fk_museum_exhibit_museum_exhibit_status FOREIGN KEY(exhibit_status_id) REFERENCES museum.exhibit_status(exhibit_status_id),
    CONSTRAINT fk_museum_exhibit_admin_museum FOREIGN KEY(museum_id) REFERENCES admin.museum(museum_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_museum_exhibit_fk_exhibit_status_id
ON museum.exhibit(exhibit_status_id);

CREATE INDEX idx_museum_exhibit_fk_museum_id
ON museum.exhibit(museum_id);

CREATE INDEX idx_museum_exhibit_name
ON museum.exhibit(name);

CREATE TRIGGER tr_museum_exhibit_update_timestamp
    BEFORE UPDATE ON museum.exhibit
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();