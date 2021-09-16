CREATE OR REPLACE FUNCTION museum.fn_register_museum_user(
   _phone_number VARCHAR(50) = ''
)
RETURNS BIT
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
            RETURN 0;
        ELSE
            INSERT INTO museum.user
            (
                phone_number
            )
            VALUES
            (
                _phone_number
            );

            RETURN 1;
        END IF;
    END
$$
