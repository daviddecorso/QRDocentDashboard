CREATE OR REPLACE FUNCTION museum.fn_update_timestamp()
    RETURNS TRIGGER AS
    $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
    $$
    LANGUAGE plpgsql;