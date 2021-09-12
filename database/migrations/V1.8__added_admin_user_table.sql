CREATE TABLE admin.user(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_admin_user_email
ON admin.user(email);

CREATE TRIGGER tr_admin_user_update_timestamp
    BEFORE UPDATE ON admin.user
    FOR EACH ROW
EXECUTE PROCEDURE admin.fn_update_timestamp();