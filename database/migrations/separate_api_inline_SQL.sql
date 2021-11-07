-- Get total scans from given range
SELECT SUM(ea.total_scans) AS total_scans_from_range
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE);

-- Get average daily scans from given range
SELECT AVG(total_scans) AS average_daily_scans_from_range FROM
    (SELECT SUM(ea.total_scans) AS total_scans
    FROM admin.analytics AS a
        JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE)
    GROUP BY a.analytics_id, a.date_created) AS total_scans_per_day;

-- Get average user visits from given range
SELECT CAST(AVG(average_user_visit) AS TIME) AS average_user_visit_from_range
FROM admin.analytics
WHERE museum_id = 1 AND (date_created >= '2021-10-31'::DATE AND date_created <= '2021-11-06'::DATE);

-- Get most popular exhibit from given range
SELECT e.exhibit_id, e.name, e.image, SUM(ea.total_scans) AS most_scans_from_range
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    RIGHT JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-11-2'::DATE AND a.date_created <= '2021-11-06'::DATE)
GROUP BY e.exhibit_id
ORDER BY SUM(ea.total_scans) DESC
LIMIT 1;

-- Figure out how to represent the data for today. Have it where we automate and create the analytical data after museum closing (6-7pm ish) to provide data for today sooner
-- Or manually generate data per each API call for today data. 
-- Can probably still get the cards data for today APIs a little easier, chart data won't be possible in combination with the automated tables for analyitcal data.


-- Get total scans from given range
SELECT SUM(ea.total_scans) AS total_scans_from_range
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE);

-- Note how independent TODAYs stats are from in relation to previous stats. (Make it like Today, Last 7 days, Month, Year, etc).
SELECT admin.fn_get_total_scans_by_date_range(1, '2021-11-07'::DATE, '2021-11-07'::DATE) AS total_scans;
SELECT admin.fn_get_total_scans_by_date_range(1, '2021-11-06'::DATE, '2021-11-07'::DATE) AS total_scans;
SELECT admin.fn_get_total_scans_by_date_range(1, '2021-11-06'::DATE, '2021-11-06'::DATE) AS total_scans;

-- Get average daily scans from given range (Inline SQL, no need for today implementation)
SELECT AVG(total_scans) AS average_daily_scans_from_range FROM
    (SELECT SUM(ea.total_scans) AS total_scans
    FROM admin.analytics AS a
        JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    WHERE a.museum_id = 1 AND (a.date_created >= '2021-10-31'::DATE AND a.date_created <= '2021-11-06'::DATE)
    GROUP BY a.analytics_id, a.date_created) AS total_scans_per_day;

-- Get average user visits from given range
SELECT CAST(AVG(average_user_visit) AS TIME) AS average_user_visit_from_range
FROM admin.analytics
WHERE museum_id = 1 AND (date_created >= '2021-10-31'::DATE AND date_created <= '2021-11-06'::DATE);

-- Note how independent TODAYs stats are from in relation to previous stats. (Make it like Today, Last 7 days, Month, Year, etc).
SELECT admin.fn_get_average_user_visit_by_date_range(1, '2021-11-07'::DATE, '2021-11-07'::DATE) AS average_user_visit;
SELECT admin.fn_get_average_user_visit_by_date_range(1, '2021-11-06'::DATE, '2021-11-07'::DATE) AS average_user_visit;
SELECT admin.fn_get_average_user_visit_by_date_range(1, '2021-11-06'::DATE, '2021-11-06'::DATE) AS average_user_visit;


-- Get most popular exhibit from given range
SELECT e.exhibit_id, e.name, e.image, SUM(ea.total_scans) AS most_scans_from_range
FROM admin.analytics AS a
    JOIN admin.exhibit_analytics AS ea ON a.analytics_id = ea.analytics_id
    RIGHT JOIN museum.exhibit AS e ON ea.exhibit_id = e.exhibit_id
WHERE a.museum_id = 1 AND (a.date_created >= '2021-11-2'::DATE AND a.date_created <= '2021-11-06'::DATE)
GROUP BY e.exhibit_id
ORDER BY SUM(ea.total_scans) DESC
LIMIT 1;