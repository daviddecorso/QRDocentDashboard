CREATE OR REPLACE FUNCTION museum.fn_create_museum_user_scan(
   _user_id INT = 0,
   _exhibit_id INT = 0
)
RETURNS TABLE(_scan_id INT, _name TEXT, _description TEXT, _image TEXT, _video TEXT, _website TEXT)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _scan_id INT;
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM museum.scan
                    WHERE user_id = _user_id AND exhibit_id = _exhibit_id
                    LIMIT 1
                 )
        THEN
            RETURN QUERY
                SELECT 0, '', '', '', '', '';
        ELSE
            INSERT INTO museum.scan
            (
                user_id,
                exhibit_id
            )
            VALUES
            (
                _user_id,
                _exhibit_id
            )
            RETURNING scan_id INTO _scan_id;

            RETURN QUERY
                SELECT s.scan_id, e.name, e.description, e.image, e.video, e.website
                FROM museum.scan AS s
                    JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
                WHERE s.scan_id = _scan_id;
        END IF;
    END
$$
