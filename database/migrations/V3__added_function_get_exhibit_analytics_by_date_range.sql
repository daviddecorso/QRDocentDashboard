CREATE OR REPLACE FUNCTION admin.fn_get_graph_analytics_by_date_range(
   _museum_id INT = 0,
   _start_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE),
   _end_date DATE = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
)
RETURNS TABLE(_exhibit_percentages json, _date DATE, _total_scans BIGINT, _average_user_visit TIME, _exhibit_analytics json)
LANGUAGE plpgsql
AS
$$
    DECLARE
        _exhibit_percentages json;
    BEGIN
        DROP TABLE IF EXISTS exhibit_percentages;

        CREATE TEMP TABLE exhibit_percentages
        (
            exhibit_id INT NOT NULL,
            name TEXT NOT NULL,
            image TEXT NOT NULL,
            exhibit_scans_percentage REAL NOT NULL
        );

        INSERT INTO exhibit_percentages
        (
            exhibit_id,
            name,
            image,
            exhibit_scans_percentage
        )
        -- Percentage scanned per exhibit in given range
        SELECT e.exhibit_id, e.name, e.image,
            (
                SUM(ea.total_scans) * 100.0 /
                (SELECT SUM(ea.total_scans) AS total_scans
                FROM admin.analytics AS a
                    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
                WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date))
            ) AS exhibit_scans_percentage
        FROM admin.analytics AS a
            JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
            JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
        WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
        GROUP BY e.exhibit_id;

        SELECT json_agg(
                    json_build_object(
                            'exhibitID', exhibit_id,
                            'name', name,
                            'mainImage', image,
                            'exhibitScansPercentage', exhibit_scans_percentage
                    )
                )
        FROM exhibit_percentages
        INTO _exhibit_percentages;

        DROP TABLE IF EXISTS exhibit_percentages;


        -- Represent the analytics and exhibit analytics in one query from given range (aggregate exhibits per one analytics day).
        RETURN QUERY
            SELECT COALESCE(_exhibit_percentages, CAST('[]' AS json)), a.date_created AS date, SUM(ea.total_scans) AS total_scans, a.average_user_visit,
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