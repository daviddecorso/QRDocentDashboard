CREATE OR REPLACE FUNCTION museum.fn_login_museum_user(
   _phone_number TEXT = '',
   _confirmation_code TEXT = ''
)
RETURNS BOOLEAN
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
            UPDATE museum.user 
            SET confirmation_code = _confirmation_code
            WHERE user_id = _user_id;

            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END
$$
