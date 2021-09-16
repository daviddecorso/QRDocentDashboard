CREATE OR REPLACE FUNCTION museum.fn_login_museum_user(
   _phone_number VARCHAR(50) = ''
)
RETURNS INT
LANGUAGE plpgsql
AS
$$
    DECLARE
        _user_id INT;
    BEGIN
        SELECT user_id INTO _user_id
        FROM museum.user
        WHERE phone_number = _phone_number
        LIMIT 1;

        IF _user_id IS NOT NULL
        THEN
            RETURN _user_id;
        ELSE
            RETURN 0;
        END IF;
    END
$$
