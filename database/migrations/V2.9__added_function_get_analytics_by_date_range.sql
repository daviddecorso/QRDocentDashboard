CREATE OR REPLACE FUNCTION admin.fn_get_analytics_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS TABLE(_total_scans_from_range INT, _average_daily_scans_from_range REAL, _average_user_visit_from_range TIME,
    _date DATE, _total_scans BIGINT, _average_user_visit TIME, _exhibit_analytics json)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _total_scans_from_range INT;
        _average_daily_scans_from_range REAL;
        _average_user_visit_from_range TIME;
    BEGIN
        -- Get total scans from given range
        SELECT SUM(ea.total_scans) AS total_scans
        FROM admin.analytics AS a
            JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
        WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
        INTO _total_scans_from_range;

        -- Get average daily scans from given range
        SELECT AVG(total_scans) AS average_daily_scans FROM
            (SELECT SUM(ea.total_scans) AS total_scans
            FROM admin.analytics AS a
                JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
            WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
            GROUP BY a.analytics_id, a.date_created) AS total_scans_per_day
        INTO _average_daily_scans_from_range;

        -- Get average user visits from given range
        SELECT CAST(AVG(average_user_visit) AS TIME) AS average_user_visit_from_range
        FROM admin.analytics
        WHERE museum_id = _museum_id AND (date_created >= _start_date AND date_created <= _end_date)
        INTO _average_user_visit_from_range;

        
    END
$$