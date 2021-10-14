CREATE TABLE museum.exhibit_content_type(
    exhibit_content_type_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tr_museum_content_type_update_timestamp
    BEFORE UPDATE ON museum.content_type
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();

INSERT INTO museum.content_type(exhibit_content_type_id, name) VALUES (1, 'Image');
INSERT INTO museum.content_type(exhibit_content_type_id, name) VALUES (2, 'Video');
INSERT INTO museum.content_type(exhibit_content_type_id, name) VALUES (3, 'Song');
INSERT INTO museum.content_type(exhibit_content_type_id, name) VALUES (4, 'Website');


CREATE TABLE museum.exhibit_content(
    exhibit_content_id SERIAL PRIMARY KEY,
    url TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    exhibit_content_type_id INT NOT NULL,
    exhibit_id INT NOT NULL,
    CONSTRAINT fk_museum_exhibit_content_museum_exhibit_content_type FOREIGN KEY(exhibit_content_type_id) REFERENCES museum.exhibit_content_type(exhibit_content_type_id),
    CONSTRAINT fk_museum_exhibit_content_museum_exhibit FOREIGN KEY(exhibit_id) REFERENCES museum.exhibit(exhibit_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_museum_exhibit_content_fk_exhibit_content_type_id
ON museum.exhibit_content(exhibit_content_type_id);

CREATE INDEX idx_museum_exhibit_content_fk_exhibit_id
ON museum.exhibit_content(exhibit_id);

CREATE TRIGGER tr_museum_exhibit_content_update_timestamp
    BEFORE UPDATE ON museum.exhibit_content
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();