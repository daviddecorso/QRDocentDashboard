CREATE TABLE admin.user(
    user_id SERIAL PRIMARY KEY,
    email TEXT NOT NULL DEFAULT '',
    password TEXT NOT NULL DEFAULT '',
    museum_id INT NOT NULL,
    CONSTRAINT fk_admin_user_admin_museum FOREIGN KEY(museum_id) REFERENCES admin.museum(museum_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_admin_user_email
ON admin.user(email);

CREATE INDEX idx_admin_user_fk_museum_id
ON admin.user(museum_id);

CREATE TRIGGER tr_admin_user_update_timestamp
    BEFORE UPDATE ON admin.user
    FOR EACH ROW
EXECUTE PROCEDURE admin.fn_update_timestamp();