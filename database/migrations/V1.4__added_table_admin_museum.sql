CREATE TABLE admin.museum(
    museum_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tr_admin_museum_update_timestamp
    BEFORE UPDATE ON admin.museum
    FOR EACH ROW
EXECUTE PROCEDURE admin.fn_update_timestamp();