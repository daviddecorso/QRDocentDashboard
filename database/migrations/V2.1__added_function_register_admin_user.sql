CREATE OR REPLACE FUNCTION admin.fn_register_admin_user(
   _email TEXT = '',
   _password TEXT = '',
   _museum_id INT = 0
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM admin.user
                    WHERE email = _email
                    LIMIT 1
                 )
        THEN
            RETURN FALSE;
        ELSE
            INSERT INTO admin.user
            (
                email,
                password,
                museum_id
            )
            VALUES
            (
                _email,
                _password,
                _museum_id
            );

            RETURN TRUE;
        END IF;
    END
$$
