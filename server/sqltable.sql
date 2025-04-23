CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'completed')),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  projectId INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (name, description, status)
VALUES 
  ('Website Redesign', 'Revamp the UI and UX of the company website.', 'active'),
  ('Mobile App', 'Develop a cross-platform mobile app.', 'active'),
  ('Marketing Campaign', 'Launch Q2 marketing efforts.', 'completed');

INSERT INTO tasks (title, description, status, priority, projectId)
VALUES 
  -- Tasks for Project 1
  ('Design Homepage', 'Create mockups for the new homepage.', 'in_progress', 'high', 1),
  ('User Testing', 'Conduct usability testing with target users.', 'not_started', 'medium', 1),

  -- Tasks for Project 2
  ('Setup React Native', 'Initialize the RN app and set up navigation.', 'completed', 'high', 2),
  ('Build Authentication', 'Implement login and signup features.', 'in_progress', 'high', 2),

  -- Tasks for Project 3
  ('Write Ad Copy', 'Draft engaging copy for Facebook ads.', 'completed', 'low', 3),
  ('Launch Email Campaign', 'Send announcement emails to all users.', 'completed', 'medium', 3);
