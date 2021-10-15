CREATE OR REPLACE FUNCTION admin.fn_create_museum_exhibit(
   _name TEXT = '',
   _description TEXT = '',
   _exhibit_contents json = '[]',
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
        INSERT INTO museum.exhibit
        (
            name,
            description,
            exhibit_status_id,
            museum_id
        )
        VALUES
        (
            _name,
            _description,
            _exhibit_status_id,
            _museum_id
        )
        RETURNING exhibit_id INTO _exhibit_id;

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

        RETURN _exhibit_id;
    END
$$