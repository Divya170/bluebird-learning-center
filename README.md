# Bluebird Learning Center

The Bluebird Learning Center website (tutoring and learning center, Newark DE) as a working application:

- `frontend/` is the Next.js 14 (App Router) website and staff admin.
- `backend/` is the NestJS 10 API, which holds all business logic and validation.
- `database/` holds SQLite 3: `app.sqlite`, `schema.sql` and `seed.sql`.

## Quick start

You need Node.js 18.18 or newer.

```bash
npm run install:all     # root, backend and frontend dependencies
npm run dev             # API on :4000, website on :3000
```

Open http://localhost:3000. The staff admin is at `/admin`; the passcode is `bluebird-staff` by default, set in `backend/.env`.

`database/app.sqlite` ships seeded. If it's deleted, the API recreates it on the next start; `npm run db:reset` returns to the seed. For production: `npm run build && npm start`.

## About the content

Bluebird hasn't supplied final copy yet, so the design uses its own placeholder wording ("Program One", "Course title A", "Teacher name"…) and flags unconfirmed details with "to confirm" markers. That content was extracted directly from the design into the database:

- 4 programs, 8 courses, 4 teachers and 4 "why Bluebird" themes;
- 13 FAQs, 8 of them marked as still to be confirmed;
- 3 hero photos.

Everything can now be replaced from the admin:

- **Blank fields** fall back to the design's placeholder text, so nothing invented is ever shown.
- **When a value is filled in**, its marker disappears automatically.
- **Before launch**, turn the markers off entirely in **Admin › Center details**.

## Pages

| Route | |
|---|---|
| `/` | Home: hero slideshow (pauses on hover, on request and with reduced motion), featured program, course preview with program chips, teachers, themes, FAQ by topic, contact summary |
| `/programs` | Every program with its courses. Program cards link to `/programs#program-<id>`. |
| `/courses` | Course catalog: server-side search and program filter (`?program=` and `?q=` stay in the URL); grid or list layout set in the admin; empty and error states |
| `/courses/[id]` | Course detail: program, schedule, level, requirements and teachers; related courses; mobile sticky "Register" bar; not-found and error states |
| `/teachers`, `/teachers/[id]` | Teacher list and profiles, with biography and the courses each teacher teaches |
| `/about` | Story (from the admin) and themes |
| `/register` | Registration request. `?course=<id>` pre-selects a course. |
| `/faq` | FAQ by topic (tabs on desktop, a select on mobile) |
| `/contact` | Contact details and the inquiry form |
| `/admin` | Staff admin |

### Forms

Both forms follow the design's behaviour and wording exactly:

- An error appears once you leave a field.
- A failed submit shows an error summary and focuses the first problem field.
- All checks run on the server, both as you go and again on submit.

**Registration:**
- Student name, course (or "Not sure yet") and email are required.
- A parent or guardian name is required unless "I'm the student" is ticked.
- The phone number is optional but must have 10 digits if given.
- Hidden or deleted courses are refused.
- **Success card:** the reference (BB-xxxx), the chosen course, **Back to courses** and **Register another student**.

**Contact:**
- Name, email and a message of at least 5 characters are required.
- The topic must be one of: general question, programs & courses, schedules, registration.
- **Success card:** the reference (MSG-xxxx), **Browse courses** and **Send another message**.

If sending fails, both forms keep what was typed and explain what happened.

## Staff admin

The design didn't include an admin; this one is built in the site's visual style.

| Tab | |
|---|---|
| Registrations | Search, filter by status (New, Contacted, Enrolled, Closed) and by course, change status, delete. Each request has email and call links. |
| Inquiries | Search, filter by status (New, Replied, Closed), change status, delete |
| Courses | Add, edit and delete courses: title, program, summary, full description, schedule, level, requirements, shown or hidden |
| Programs | Add, edit and delete programs: name, summary, description, "Intended for". Deleting is blocked while a program still has courses. |
| Teachers | Add, edit and remove teachers: name, role, biography, courses taught |
| FAQ & themes | Add, edit and delete questions, mark answers "to be confirmed", and edit the four "why Bluebird" themes |
| Center details | Address, city, phone, email, hours, directions link, "Our story", the marker switch, and grid or list course layout |

## API

All routes are prefixed with `/api`. Admin routes need the `x-admin-token` header when `ADMIN_TOKEN` is set.

| Method | Route | |
|---|---|---|
| GET | `/site` | Bootstrap: settings, programs, courses, teachers, themes, FAQ, hero, option lists |
| GET | `/courses?program=&q=` | Course search with counts per program |
| GET | `/courses/:id`, `/teachers/:id` | Detail, with related courses and teachers |
| POST | `/registrations`, `/registrations/validate` | Send a registration request, or check fields |
| POST | `/inquiries`, `/inquiries/validate` | Send an inquiry, or check fields |
| POST | `/admin/session` | Check a passcode |
| GET | `/admin/summary` | Counts for the admin tabs |
| GET, PATCH, DELETE | `/admin/registrations[/:id]` | `?status=&q=&course=`; PATCH `{ status }` |
| GET, PATCH, DELETE | `/admin/inquiries[/:id]` | `?status=&q=`; PATCH `{ status }` |
| GET, POST, PUT, DELETE | `/admin/courses[/:id]` | Course management |
| POST, PATCH, DELETE | `/admin/programs[/:id]` | Program management |
| POST, PUT, DELETE | `/admin/teachers[/:id]` | Teacher management (`courseIds` sets the courses taught) |
| POST, PUT, DELETE | `/admin/faqs[/:id]` | FAQ management |
| PATCH | `/admin/themes/:n` | Edit a theme |
| PUT | `/admin/settings` | Center details, marker switch and course layout |

Validation failures return `400 { message, errors: { field: "message" } }`.

## Project structure

```text
bluebird-learning-center/
├── backend/src/
│   ├── content/        programs, courses, teachers, themes, FAQ, settings (public + admin)
│   ├── registrations/  registration requests: validation, storage, admin
│   ├── inquiries/      contact inquiries: validation, storage, admin
│   ├── admin/          passcode check, summary counts
│   ├── common/         validation helpers, reference numbers, admin guard, constants
│   └── database/       better-sqlite3 service: applies schema.sql, seeds when empty
├── frontend/
│   ├── app/                   one route per design page
│   ├── components/views/      markup converted 1:1 from the design
│   ├── components/pages/      page logic and view-models
│   ├── components/admin/      staff admin
│   ├── hooks/useDesignForm.ts the design's form behaviour, validated by the API
│   └── public/assets/         photography as WebP (3.9 MB → 244 KB)
└── database/                  app.sqlite, schema.sql, seed.sql
```

The design's markup was converted mechanically into `components/views/`, keeping every inline style; hover and focus styles became the classes in `app/globals.css`. The design moved between pages with in-memory state, which became real URLs, so pages can be bookmarked, shared and reached with the back button.
