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
    BEGIN
        -- CAN START WORKING ON THE FUNCTION NOW.
        -- SOLVED STORING JSON TO TABLE AND NOW JUST SELECT THE PROPER TABLE TO CONVERT BACK TO JSON IN NODE
        IF EXISTS(
                    SELECT 1
                    FROM admin.user
                    WHERE email = _email
                    LIMIT 1
                 )
        THEN
            RETURN 0;
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

            RETURN 1;
        END IF;
    END
$$



-- TESTING
DROP TABLE IF EXISTS my_table;

CREATE TEMP TABLE my_table(
    url TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    position INT NOT NULL,
    exhibit_content_type_id INT NOT NULL,
    exhibit_id INT NOT NULL
);

INSERT INTO my_table
(
    url,
    description,
    position,
    exhibit_content_type_id,
    exhibit_id
)
SELECT "URL", "description", "position", "contentTypeID", 1
FROM json_to_recordset('
                        [
                            {
                                "URL": "www.image.com/image",
                                "description": "content description",
                                "position": 1,
                                "contentTypeID": 1
                            },
                            {
                                "URL": "www.video.com/video",
                                "description": "content description",
                                "position": 2,
                                "contentTypeID": 2
                            }
                        ]
                        ')
AS ("URL" TEXT, "description" TEXT, "position" INT, "contentTypeID" INT); --RETURNING url;


SELECT 'name of exhibit' AS exhibit_name, 'description of exhibit' AS exhibit_description, *
FROM my_table;


DROP TABLE IF EXISTS my_table;