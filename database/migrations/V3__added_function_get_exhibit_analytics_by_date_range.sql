CREATE OR REPLACE FUNCTION admin.fn_get_exhibit_analytics_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS TABLE(_date DATE, _total_scans BIGINT, _average_user_visit TIME, _exhibit_analytics json)
LANGUAGE plpgsql
AS
$$
    BEGIN
        -- Represent the analytics and exhibit analytics in one query from given range (aggregate exhibits per one analytics day).
        RETURN QUERY
            SELECT a.date_created AS date, SUM(ea.total_scans) AS total_scans, a.average_user_visit,
                        json_agg(
                            json_build_object(
                                    'exhibitID', ea.exhibit_id,
                                    'name', e.name,
                                    'mainImage', e.image,
                                    'scans', ea.total_scans
                                ) ORDER BY ea.total_scans DESC
                            ) AS exhibit_analytics
            FROM admin.analytics AS a
                JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
                JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
            WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
            GROUP BY a.analytics_id, a.date_created
            ORDER BY a.date_created DESC;
    END
$$