CREATE OR REPLACE FUNCTION admin.fn_delete_museum_exhibit(
    _exhibit_id INT = 0
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    BEGIN
        DELETE FROM museum.exhibit_content
        WHERE exhibit_id = _exhibit_id;

        DELETE FROM museum.exhibit
        WHERE exhibit_id = _exhibit_id;

        RETURN TRUE;
    END
$$