src/
│
├── components/                         (Reusable UI parts used across the app)
│    ├── Navbar.jsx                     (Top navigation for public pages)
│    ├── Footer.jsx                     (Bottom section with contact/info)
│    ├── ServiceCard.jsx                (Displays a single service item)
│    ├── ProjectCard.jsx                (Displays a single project/image)
│
├── public/                             (Customer-facing website)
│    └── pages/
│         ├── Home.jsx                  (Landing page: hero, intro, highlights)
│         ├── Services.jsx              (Displays all services using ServiceCard)
│         ├── Portfolio.jsx             (Fetches & displays projects from backend)
│         ├── Contact.jsx               (Form to send message to backend)
│         ├── About.jsx                 (Company info + CEO section)
│
├── admin/                              (Admin dashboard - restricted access)
│    └── pages/
│         ├── Login.jsx                 (Admin authentication, stores JWT token)
│         ├── Dashboard.jsx             (Overview: stats like messages/projects)
│         ├── Projects.jsx              (Upload, edit, delete project images)
│         ├── Messages.jsx              (View all contact form submissions)
│         ├── CEO.jsx                   (Edit CEO info: name, bio, image)
│
├── routes/                             (Route protection & navigation logic)
│    ├── ProtectedRoute.jsx             (Blocks access to admin pages without token)
│
├── services/                           (Handles API communication with backend)
│    ├── api.js                         (All fetch/axios requests: contact, projects, etc.)
│
├── App.jsx                             (Main router: connects all pages together)
├── main.jsx                            (App entry point: renders React app)