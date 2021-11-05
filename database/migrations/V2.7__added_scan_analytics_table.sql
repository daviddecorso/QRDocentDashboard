CREATE TABLE admin.analytics(
    analytics_id SERIAL PRIMARY KEY,
    average_user_visit TIME NOT NULL,
    museum_id INT NOT NULL,
    CONSTRAINT fk_admin_analytics_admin_museum FOREIGN KEY(museum_id) REFERENCES admin.museum(museum_id),
    date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX idx_admin_analytics_fk_museum_id
ON admin.analytics(museum_id);

CREATE INDEX idx_admin_analytics_date_created
ON admin.analytics(date_created);


CREATE TABLE admin.exhibit_analytics(
    exhibit_analytics_id SERIAL PRIMARY KEY,
    total_scans INT NOT NULL,
    exhibit_id INT NOT NULL,
    CONSTRAINT fk_admin_exhibit_analytics_exhibit_id FOREIGN KEY(exhibit_id) REFERENCES museum.exhibit(exhibit_id),
    analytics_id INT NOT NULL,
    CONSTRAINT fk_admin_exhibit_analytics_admin_analytics FOREIGN KEY(analytics_id) REFERENCES admin.analytics(analytics_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_exhibit_analytics_fk_exhibit_id
ON admin.exhibit_analytics(exhibit_id);

CREATE INDEX idx_admin_exhibit_analytics_fk_analytics_id
ON admin.exhibit_analytics(analytics_id);

CREATE TRIGGER tr_admin_exhibit_analytics_update_timestamp
    BEFORE UPDATE ON admin.exhibit_analytics
    FOR EACH ROW
EXECUTE PROCEDURE admin.fn_update_timestamp();