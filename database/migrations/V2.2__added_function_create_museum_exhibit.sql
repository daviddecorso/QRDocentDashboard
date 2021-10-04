CREATE OR REPLACE FUNCTION admin.fn_create_museum_exhibit(
   _name TEXT = '',
   _description TEXT = '',
   _image TEXT = '',
   _video TEXT = '',
   _website TEXT = '',
   _exhibit_status_id INT = 0,
   _museum_id INT = 0
)
RETURNS INT
LANGUAGE plpgsql
AS
$$
    DECLARE
        _exhibit_id INT;
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM museum.exhibit
                    WHERE name = _name AND museum_id = _museum_id
                    LIMIT 1
                 )
        THEN
            RETURN 0;
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
            )
            RETURNING exhibit_id INTO _exhibit_id;

            RETURN _exhibit_id;
        END IF;
    END
$$