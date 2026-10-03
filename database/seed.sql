-- Bluebird Learning Center — seed data, extracted from the design. The center has not yet supplied final copy,
-- so text is the design's placeholder wording, ready to be replaced from the admin. Runs only when programs is empty.

INSERT OR IGNORE INTO settings (key, value) VALUES ('address',''),('city','Newark, DE'),('phone',''),('email',''),('hours',''),('story',''),('mapsUrl','https://www.google.com/maps/search/?api=1&query=Newark%2C+Delaware'),('showMarkers','true'),('courseView','grid');

INSERT INTO programs (id, code, name, bg, short, long, sort) VALUES
 ('p1', '01', 'Program One', '#DDEFFC', 'Short summary of this program — who it serves and what it covers. Supplied by Bluebird.', 'A fuller description of this program goes here: what students work on, how sessions are organized, and who it is designed for. This text is a placeholder until Bluebird supplies the final copy.', 1),
 ('p2', '02', 'Program Two', '#DDF3E8', 'Short summary of this program, to be written with the center.', 'Program description placeholder. Replace with Bluebird’s own wording describing focus areas, format, and intended students.', 2),
 ('p3', '03', 'Program Three', '#FCE6DF', 'Short summary of this program, to be written with the center.', 'Program description placeholder. Replace with Bluebird’s own wording describing focus areas, format, and intended students.', 3),
 ('p4', '04', 'Program Four', '#F3EBDD', 'Short summary of this program, to be written with the center.', 'Program description placeholder. Replace with Bluebird’s own wording describing focus areas, format, and intended students.', 4);

INSERT INTO courses (id, program_id, name, description, sort) VALUES
 ('c1', 'p1', 'Course title A', 'One or two sentences describing what this course covers.', 1),
 ('c2', 'p1', 'Course title B', 'One or two sentences describing what this course covers.', 2),
 ('c3', 'p2', 'Course title C', 'One or two sentences describing what this course covers.', 3),
 ('c4', 'p2', 'Course title D', 'One or two sentences describing what this course covers.', 4),
 ('c5', 'p3', 'Course title E', 'One or two sentences describing what this course covers.', 5),
 ('c6', 'p3', 'Course title F', 'One or two sentences describing what this course covers.', 6),
 ('c7', 'p4', 'Course title G', 'One or two sentences describing what this course covers.', 7),
 ('c8', 'p1', 'Course title H', 'One or two sentences describing what this course covers.', 8);

INSERT INTO teachers (id, name, role, sort) VALUES
 ('t1', 'Teacher name', 'Role to be confirmed', 1),
 ('t2', 'Teacher name', 'Role to be confirmed', 2),
 ('t3', 'Teacher name', 'Role to be confirmed', 3),
 ('t4', 'Teacher name', 'Role to be confirmed', 4);

INSERT INTO themes (n, title, body, sort) VALUES
 ('01', 'A supportive environment', 'Placeholder — how the center makes students feel comfortable asking questions and trying again.', 1),
 ('02', 'Organized programs', 'Placeholder — how programs and courses are structured so families know what to expect.', 2),
 ('03', 'Attention to each student', 'Placeholder — how teachers get to know each learner. Confirm group sizes before stating any.', 3),
 ('04', 'Clear communication', 'Placeholder — how and when the center keeps parents and students informed.', 4);

INSERT INTO faq_categories (key, label, sort) VALUES
 ('registration', 'Registration', 1),
 ('programs', 'Programs', 2),
 ('courses', 'Courses', 3),
 ('schedule', 'Schedule', 4),
 ('location', 'Location', 5),
 ('general', 'General', 6);

INSERT INTO faqs (id, category, question, answer, pending, sort) VALUES
 ('f0', 'registration', 'How do I register?', 'Use the registration form on this website. Choose a course — or “Not sure yet” — and add your contact details. Bluebird Learning Center will follow up using the information you provide.', 0, 1),
 ('f1', 'registration', 'Can I ask a question before registering?', 'Yes. The Contact page has an inquiry form that doesn’t require registration.', 0, 2),
 ('f2', 'registration', 'Is there a registration fee?', 'Answer to be supplied by Bluebird Learning Center.', 1, 3),
 ('f3', 'programs', 'Which program is right for my student?', 'Each program page describes what it covers and, once confirmed, who it’s designed for. If you’re unsure, send an inquiry and the center can help you choose.', 0, 4),
 ('f4', 'programs', 'What ages or grade levels do you work with?', 'Answer to be supplied by Bluebird Learning Center.', 1, 5),
 ('f5', 'courses', 'Where can I see course details?', 'Every course has its own page with its description, program, and schedule when available.', 0, 6),
 ('f6', 'courses', 'Can a student take more than one course?', 'Answer to be supplied by Bluebird Learning Center.', 1, 7),
 ('f7', 'schedule', 'When are classes held?', 'Schedules are listed on each course page once published.', 1, 8),
 ('f8', 'schedule', 'What are the center’s hours?', 'Answer to be supplied by Bluebird Learning Center.', 1, 9),
 ('f9', 'location', 'Where is Bluebird Learning Center?', 'In Newark, Delaware. The full street address will be listed on the Contact page.', 1, 10),
 ('f10', 'location', 'Is parking available?', 'Answer to be supplied by Bluebird Learning Center.', 1, 11),
 ('f11', 'general', 'How can I contact the center?', 'Send a message through the Contact page. Phone and email will be listed there once published.', 0, 12),
 ('f12', 'general', 'Do you offer online sessions?', 'Answer to be supplied by Bluebird Learning Center.', 1, 13);

INSERT INTO hero_slides (src, alt, pos, sort) VALUES
 ('/assets/tutor.webp', 'A teacher leaning in to help a student with her writing', 'center 30%', 1),
 ('/assets/reading.webp', 'Students reading quietly at their desks in a sunlit classroom', 'center', 2),
 ('/assets/whiteboard.webp', 'A teacher working through a problem at the whiteboard with a small class', 'center 40%', 3);
