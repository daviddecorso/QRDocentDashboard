-- api to create analytics entity (from scans aggregate data)
-- then we can make apis to pull data from it (further aggregate data from the individual analytics days)
INSERT INTO museum.scan(user_id, exhibit_id, created_at)
VALUES
        (1, 1, '2021-11-06 14:33:11'),
        (1, 2, '2021-11-06 14:45:01'),
        (1, 3, '2021-11-06 14:47:02'),
        (2, 3, '2021-11-06 9:27:02'),
        (2, 2, '2021-11-06 9:27:02'),
        (3, 1, '2021-11-05 9:30:22'),
        (3, 2, '2021-11-05 9:40:12'),
        (3, 3, '2021-11-05 9:55:42'),
        (3, 4, '2021-11-05 10:30:02'),
        (4, 4, '2021-11-04 10:30:02'),
        (4, 1, '2021-11-04 12:30:02'),

        (6, 1, '2021-11-03 13:23:11'),
        (6, 2, '2021-11-03 11:55:01'),
        (6, 3, '2021-11-03 12:18:02'),
        (6, 4, '2021-11-03 13:27:02'),
        (7, 3, '2021-11-03 8:27:02'),
        (8, 1, '2021-11-03 9:31:22'),
        (8, 2, '2021-11-03 9:43:12'),
        (8, 3, '2021-11-03 9:57:42'),
        (9, 2, '2021-11-02 12:30:02'),
        (9, 4, '2021-11-02 12:39:02'),
        (9, 1, '2021-11-02 12:20:02'),

        (10, 1, '2021-11-01 9:59:11'),
        (10, 2, '2021-11-01 10:55:01'),
        (11, 3, '2021-11-01 10:57:02'),
        (11, 4, '2021-11-01 11:10:02'),
        (11, 3, '2021-11-01 11:12:02'),
        (11, 1, '2021-11-01 10:55:22'),
        (12, 2, '2021-10-31 8:43:12'),
        (12, 3, '2021-10-31 8:57:42'),
        (12, 2, '2021-10-31 8:51:02'),
        (12, 4, '2021-10-31 9:12:02'),
        (13, 1, '2021-10-31 11:20:02');



-- Testing for average time in a specific date

-- Get the time spent for each user in the museum for TODAY.
SELECT CAST(AVG(time_spent) AS TIME) AS average_user_visit FROM
    (SELECT CAST(MAX(CAST(s.created_at AS TIME)) - MIN(CAST(s.created_at AS TIME)) AS TIME) AS time_spent
    FROM museum.scan AS s
        JOIN museum.exhibit AS e ON s.exhibit_id = e.exhibit_id
    WHERE CAST(s.created_at AS DATE) = CAST(NOW() AT TIME ZONE 'EDT' AS DATE) AND e.museum_id = 1
    GROUP BY user_id) AS time_spent_per_user;


-- Get total scans for all exhibits for TODAY.
SELECT e.exhibit_id, COUNT(s.exhibit_id) AS total_scans FROM museum.exhibit AS e
    LEFT JOIN museum.scan AS s ON e.exhibit_id = s.exhibit_id
        AND CAST(s.created_at AS DATE) = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
WHERE e.museum_id = 1
GROUP BY e.exhibit_id;



-- Represent the analytics and exhibit analytics in one query (aggregate exhibits per one analytics day).
-- Then establish a date range for this data.
SELECT a.date_created AS date, a.average_user_visit,
            json_agg(
                json_build_object(
                        'exhibitID', ea.exhibit_id,
                        'name', e.name,
                        'mainImage', e.image,
                        'scans', ea.total_scans
                    )
                ) AS exhibit_analytics
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
WHERE a.museum_id = _museum_id AND (a.date_created >= _start_date AND a.date_created <= _end_date)
GROUP BY a.analytics_id, a.date_created
ORDER BY a.date_created DESC;

-- Get total scans from given range
SELECT SUM(ea.total_scans) AS total_scans
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-11-04'::DATE AND a.date_created <= '2021-11-06'::DATE);

-- Get average daily scans from given range
SELECT AVG(total_scans) AS average_daily_scans FROM
    (SELECT SUM(ea.total_scans) AS total_scans
    FROM admin.analytics AS a
        JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    WHERE a.museum_id = 1 AND (a.date_created >= '2021-11-04'::DATE AND a.date_created <= '2021-11-06'::DATE)
    GROUP BY a.analytics_id, a.date_created) AS total_scans_per_day;


DROP TABLE IF EXISTS exhibit_percentages;

CREATE TEMP TABLE exhibit_percentages
(
    exhibit_id INT NOT NULL,
    exhibit_scans_percentage REAL NOT NULL
);

INSERT INTO exhibit_percentages
(
    exhibit_id,
    exhibit_scans_percentage
)
-- Percentage scanned per exhibit in given range
SELECT e.exhibit_id,
    (
        SUM(ea.total_scans) * 100.0 /
        (SELECT SUM(ea.total_scans) AS total_scans
        FROM admin.analytics AS a
            JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
        WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE))
    ) AS exhibit_scans_percentage
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE)
GROUP BY e.exhibit_id;

SELECT * FROM exhibit_percentages;

DROP TABLE IF EXISTS exhibit_percentages;

