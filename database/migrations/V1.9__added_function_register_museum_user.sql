CREATE OR REPLACE FUNCTION museum.fn_register_museum_user(
   _phone_number VARCHAR(50) = ''
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM museum.user
                    WHERE phone_number = _phone_number
                    LIMIT 1
                 )
        THEN
            RETURN FALSE;
        ELSE
            INSERT INTO museum.user
            (
                phone_number
            )
            VALUES
            (
                _phone_number
            );

            RETURN TRUE;
        END IF;
    END
$$
