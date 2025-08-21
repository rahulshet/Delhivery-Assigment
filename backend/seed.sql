-- password for admin: admin123
INSERT INTO users (name, email, password_hash) VALUES
('Admin', 'admin@example.com', '$2a$10$hE2w2iF9gI9Cw8t3oZ8BNOi7kN0fF0B1u9e1R7pV0gJ2bVg6h4Jc6');

INSERT INTO robots (robot_id, location, status, battery_level) VALUES
('AGV-01','Dock','idle',82),
('AGV-02','Aisle A3','busy',56),
('AGV-03','Charging Bay','charging',23),
('AGV-04','Aisle B1','idle',92);

INSERT INTO inventory (item_name, location, quantity) VALUES
('Widget A', 'Shelf A1', 120),
('Widget B', 'Shelf B2', 55),
('Widget C', 'Shelf C3', 240);

INSERT INTO tasks (description, item_id, from_location, to_station, status, robot_assigned) VALUES
('Pick Widget A -> Station 1', 1, 'Shelf A1', 'Station 1', 'assigned', 2),
('Replenish Widget B -> Station 2', 2, 'Shelf B2', 'Station 2', 'pending', NULL),
('Move empty bin -> Dock', NULL, 'Station 3', 'Dock', 'completed', 1);