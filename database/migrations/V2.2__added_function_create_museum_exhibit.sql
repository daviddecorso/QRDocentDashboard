CREATE OR REPLACE FUNCTION admin.fn_create_museum_exhibit(
   _name TEXT = '',
   _description TEXT = '',
   _image TEXT = '',
   _video TEXT = '',
   _website TEXT = '',
   _exhibit_status_id INT = 0,
   _museum_id INT = 0
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM museum.exhibit
                    WHERE name = _name
                    LIMIT 1
                 )
        THEN
            RETURN FALSE;
        ELSE
            INSERT INTO museum.exhibit
            (
                name,
                description,
                image,
                video,
                website,
                exhibit_status_id,
                museum_id
            )
            VALUES
            (
                _name,
                _description,
                _image,
                _video,
                _website,
                _exhibit_status_id,
                _museum_id
            );

            RETURN TRUE;
        END IF;
    END
$$