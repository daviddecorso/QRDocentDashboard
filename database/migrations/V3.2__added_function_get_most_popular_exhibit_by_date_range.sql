CREATE OR REPLACE FUNCTION admin.fn_get_most_popular_exhibit_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS TABLE(_exhibit_id INT, _name TEXT, _image TEXT, _most_scans_from_range BIGINT)
LANGUAGE plpgsql
AS
$$
    BEGIN
        IF  (
                _start_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE) AND
                _end_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
            )
        THEN
            -- Get total scans for all exhibits for TODAY.
            RETURN QUERY
                SELECT e.exhibit_id, e.name, e.image, COUNT(s.exhibit_id) AS most_scans_from_range
                FROM museum.exhibit AS e
                    LEFT JOIN museum.scan AS s ON e.exhibit_id = s.exhibit_id
                        AND CAST(s.created_at AS DATE) = _start_date
                WHERE e.museum_id = _museum_id
                GROUP BY e.exhibit_id
                ORDER BY COUNT(s.exhibit_id) DESC
                LIMIT 1;
        ELSE
            -- Get most popular exhibit from given range
            RETURN QUERY
                SELECT e.exhibit_id, e.name, e.image, SUM(ea.total_scans) AS most_scans_from_range
                FROM admin.analytics AS a
                    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
                    RIGHT JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
                WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
                GROUP BY e.exhibit_id
                ORDER BY SUM(ea.total_scans) DESC
                LIMIT 1;
        END IF;
    END
$$