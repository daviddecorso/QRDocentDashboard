CREATE OR REPLACE FUNCTION admin.fn_get_average_user_visit_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS TIME
LANGUAGE plpgsql
AS
$$
    DECLARE
        _average_user_visit TIME;
    BEGIN
        IF  (
                _start_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE) AND
                _end_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
            )
        THEN
            -- Get the time spent for each user in the museum for TODAY.
            SELECT CAST(AVG(time_spent) AS TIME) AS average_user_visit FROM
                (SELECT CAST(MAX(CAST(s.created_at AS TIME)) - MIN(CAST(s.created_at AS TIME)) AS TIME) AS time_spent
                FROM museum.scan AS s
                    JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
                WHERE CAST(s.created_at AS DATE) = _start_date AND e.museum_id = _museum_id
                GROUP BY user_id) AS time_spent_per_user
            INTO _average_user_visit;

            RETURN COALESCE(_average_user_visit, CAST('00:00:00' AS TIME));
        ELSE
            -- Get average user visits from given range
            SELECT CAST(AVG(average_user_visit) AS TIME) AS average_user_visit_from_range
            FROM admin.analytics
            WHERE museum_id = _museum_id AND (date_created >= _start_date AND date_created <= _end_date)
            INTO _average_user_visit;

            RETURN COALESCE(_average_user_visit, CAST('00:00:00' AS TIME));
        END IF;
    END
$$