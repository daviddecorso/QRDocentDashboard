CREATE OR REPLACE FUNCTION admin.fn_create_daily_analytics(
   _museum_id INT = 0,
   _date_of_analytics DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS
$$
    DECLARE
        _analytics_id INT;
        _average_user_visit TIME;
    BEGIN
        IF EXISTS(
                    SELECT 1
                    FROM admin.analytics
                    WHERE date_created = _date_of_analytics
                    LIMIT 1
                 )
        THEN
            RETURN FALSE;
        ELSE
            -- Get the time spent for each user in the museum for TODAY.
            SELECT CAST(AVG(time_spent) AS TIME) AS average_user_visit FROM
                (SELECT CAST(MAX(CAST(s.created_at AS TIME)) - MIN(CAST(s.created_at AS TIME)) AS TIME) AS time_spent
                FROM museum.scan AS s
                    JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
                WHERE CAST(s.created_at AS DATE) = _date_of_analytics AND e.museum_id = _museum_id
                GROUP BY user_id) AS time_spent_per_user
            INTO _average_user_visit;

            INSERT INTO admin.analytics
            (
                average_user_visit,
                museum_id
            )
            VALUES
            (
                _average_user_visit,
                _museum_id
            )
            RETURNING analytics_id INTO _analytics_id;

            INSERT INTO admin.exhibit_analytics
            (
                exhibit_id,
                total_scans,
                analytics_id
            )
            -- Get total scans for all exhibits for TODAY.
            SELECT e.exhibit_id, COUNT(s.exhibit_id) AS total_scans, _analytics_id FROM museum.exhibit AS e
                LEFT JOIN museum.scan AS s ON e.exhibit_id = s.exhibit_id
                    AND CAST(s.created_at AS DATE) = _date_of_analytics
            WHERE e.museum_id = _museum_id
            GROUP BY e.exhibit_id;

            RETURN TRUE;
        END IF;
    END
$$