CREATE OR REPLACE FUNCTION museum.fn_create_museum_scan(
   _user_id INT = 0,
   _exhibit_id INT = 0
)
RETURNS TABLE(_scan_id INT, _name TEXT, _description TEXT, _image TEXT, _exhibit_contents json)
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
                SELECT 0, '', '', '', '[]'::json;
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

            -- Update the exhibit status code where it is originally marked as 'not scanned'.
            UPDATE museum.exhibit
            SET exhibit_status_id = 2
            WHERE exhibit_id = _exhibit_id AND (exhibit_status_id = 1 OR exhibit_status_id = 3);

            RETURN QUERY
                SELECT s.scan_id, e.name, e.description, e.image,
                    json_agg(
                        json_build_object(
                            'URL', ec.url,
                            'description', ec.description,
                            'position', ec.position,
                            'contentTypeID', ec.exhibit_content_type_id
                        ) ORDER BY ec.position
                    ) AS exhibit_contents
                FROM museum.scan AS s
                    JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
                    JOIN museum.exhibit_content AS ec ON e.exhibit_id = ec.exhibit_id
                WHERE s.scan_id = _scan_id
                GROUP BY e.exhibit_id, s.scan_id;
        END IF;
    END
$$