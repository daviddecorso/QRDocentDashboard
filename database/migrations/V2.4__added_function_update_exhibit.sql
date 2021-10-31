CREATE OR REPLACE FUNCTION admin.fn_update_museum_exhibit(
    _exhibit_id INT = 0,
    _name TEXT = '',
    _description TEXT = '',
    _image TEXT = '',
    _exhibit_contents json = '[]'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    BEGIN
        UPDATE museum.exhibit
        SET name = _name, description = _description, image = _image
        WHERE exhibit_id = _exhibit_id; 

        DELETE FROM museum.exhibit_content
        WHERE exhibit_id = _exhibit_id;

        INSERT INTO museum.exhibit_content
        (
            url,
            description,
            position,
            exhibit_content_type_id,
            exhibit_id
        )
        SELECT "URL", "description", "position", "contentTypeID", _exhibit_id
        FROM json_to_recordset(_exhibit_contents)
        AS ("URL" TEXT, "description" TEXT, "position" INT, "contentTypeID" INT);

        RETURN TRUE;
    END
$$