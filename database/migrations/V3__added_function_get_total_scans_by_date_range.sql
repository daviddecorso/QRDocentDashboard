CREATE OR REPLACE FUNCTION admin.fn_get_total_scans_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS INT
LANGUAGE plpgsql
AS
$$
    DECLARE
        _total_scans INT;
    BEGIN
        IF  (
                _start_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE) AND
                _end_date = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
            )
        THEN
            -- Get total scans for all exhibits for TODAY.
            SELECT COUNT(s.exhibit_id) AS total_scans FROM museum.exhibit AS e
                LEFT JOIN museum.scan AS s ON e.exhibit_id = s.exhibit_id
                    AND CAST(s.created_at AS DATE) = _start_date
            WHERE e.museum_id = _museum_id
            INTO _total_scans;

            RETURN COALESCE(_total_scans, 0);
        ELSE
            -- Get total scans from given range
            SELECT SUM(ea.total_scans) AS total_scans_from_range
            FROM admin.analytics AS a
                JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
            WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
            INTO _total_scans;

            RETURN COALESCE(_total_scans, 0);
        END IF;
    END
$$