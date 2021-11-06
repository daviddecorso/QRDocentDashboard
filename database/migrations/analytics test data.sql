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
SELECT CAST(AVG(time_spent) AS TIME) FROM
    (SELECT CAST(MAX(CAST(created_at AS TIME)) - MIN(CAST(created_at AS TIME)) AS TIME) AS time_spent
    FROM museum.scan
    WHERE CAST(created_at AS DATE) = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
    GROUP BY user_id) AS result;

SELECT user_id, CAST(MAX(CAST(created_at AS TIME)) - MIN(CAST(created_at AS TIME)) AS TIME) AS time_spent
FROM museum.scan
WHERE CAST(created_at AS DATE) = CAST(NOW() AT TIME ZONE 'EDT' AS DATE)
GROUP BY user_id ORDER BY user_id;

SELECT * FROM museum.scan ORDER BY user_id, created_at;

SELECT CAST(created_at AS DATE) FROM museum.scan ORDER BY user_id, created_at;