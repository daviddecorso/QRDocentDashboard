CREATE TABLE museum.user(
    user_id SERIAL PRIMARY KEY,
    phone_number TEXT NOT NULL DEFAULT '',
    confirmation_code TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_museum_user_phone_number
ON museum.user(phone_number);

CREATE TRIGGER tr_museum_user_update_timestamp
    BEFORE UPDATE ON museum.user
    FOR EACH ROW
EXECUTE PROCEDURE museum.fn_update_timestamp();