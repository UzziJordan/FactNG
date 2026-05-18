Got it — your old spec used `/api/public` and `/api/admin` for everything. With the new structure, we split it by resource and only protect the admin mutations. 

Here’s the updated spec matching your current folder + routes:

### 1. Public Routes - No Auth  
Used by customer frontend. All return only published/active items.

#### Projects
1. `GET /api/projects`  
   Returns all published projects. Query: `?category=X&search=Y`.  
   Sort: `date` descending.
2. `GET /api/projects/featured`  
   Returns 6 latest published projects for homepage.  
   Sort: `date` descending, limit 6.
3. `GET /api/projects/:id`  
   Returns single published project.

#### Experts
4. `GET /api/experts`  
   Returns all experts.  
   Sort: `display_order` ascending.

#### Story
5. `GET /api/story`  
   Returns the single story document with `content` and `imageUrl`.

#### Offices
6. `GET /api/offices`  
   Returns all offices.  
   Sort: `name` ascending.  
   Each office includes `addresses: [{address}]`.

#### Social Links
7. `GET /api/social-links`  
   Returns only active social links.  
   Sort: `display_order` ascending.

#### Contact
8. `POST /api/contacts`  
   Submit contact form. Saves to `Contact` collection with `status: "unread"`.  
   Body: `{fullname, email, phone?, message}`

---

### 2. Admin Routes - JWT Required  
All routes under `/api/admin/_` and mutation routes under `/api/_` need `Authorization: Bearer <token>`.

#### Auth - `/api/admin`
1. `POST /api/admin/login` - Login, returns JWT
2. `GET /api/admin/me` - Get current admin profile
3. `POST /api/admin/create` - Create new admin. Only logged-in admins
4. `PUT /api/admin/profile` - Update name, email, password
5. `DELETE /api/admin/account` - Delete admin account

#### Dashboard - `/api/admin/dashboard`
1. `GET /api/admin/dashboard/stats`  
   Returns: total projects, published projects, unread messages, total contacts.
2. `GET /api/admin/dashboard/recent-projects`  
   Returns 3 newest projects.
3. `GET /api/admin/dashboard/recent-messages`  
   Returns 4 newest contacts.

#### Projects - `/api/projects`
1. `GET /api/projects/admin?filter=all|published|unpublished&category=X&search=Y`  
   Admin list with filters. Search on `title`, `client`, `location`.
2. `POST /api/projects` - Create project
3. `GET /api/projects/:id/admin` - Get single project for editing
4. `PUT /api/projects/:id` - Update project
5. `DELETE /api/projects/:id` - Delete project

#### Contacts/Messages - `/api/contacts`
1. `GET /api/contacts/admin?status=unread|read|replied&search=Y`  
   List messages with filter + search on `fullname`, `email`, `message`.
2. `GET /api/contacts/:id` - Get single message
3. `PUT /api/contacts/:id` - Update status
4. `DELETE /api/contacts/:id` - Delete message

#### Experts - `/api/experts`
1. `GET /api/experts/admin` - List all experts
2. `POST /api/experts` - Create expert
3. `PUT /api/experts/:id` - Update expert
4. `DELETE /api/experts/:id` - Delete expert
5. `PUT /api/experts/reorder` - Update `display_order` for multiple experts

#### Story - `/api/story`
1. `GET /api/story/admin` - Get story doc for editing
2. `PUT /api/story` - Update `content` and `imageUrl`. Upserts single doc.

#### Offices - `/api/offices`
1. `GET /api/offices/admin` - List all offices
2. `POST /api/offices` - Create office. Body: `{name, addresses:[{address}]}`
3. `PUT /api/offices/:id` - Update office
4. `DELETE /api/offices/:id` - Delete office

#### Social Links - `/api/social-links`
1. `GET /api/social-links/admin` - List all social links
2. `POST /api/social-links` - Create link. Platform must be from allowed list
3. `PUT /api/social-links/:id` - Update link, platform, `is_active`, `display_order`
4. `DELETE /api/social-links/:id` - Delete link

#### File Upload - `/api/admin`
1. `POST /api/admin/upload`  
   Upload image via multer + Cloudinary. Returns `{url, public_id}` for use in projects/experts/story.

---

### 3. Key Logic Rules - Updated

*Publishing*
- Public APIs only return docs where `is_published: true` for projects.
- Social links only return where `is_active: true`.

*Sorting*
- Projects: `date` descending.
- Experts, Social Links: `display_order` ascending.
- Offices: `name` ascending.

*Filtering & Search*
- Projects admin: filter by `is_published`, filter by `category`, search on `title`, `client`, `location`.
- Contacts admin: filter by `status`, search on `fullname`, `email`, `message`.

*Security*
- Passwords hashed with bcrypt.
- JWT expires after 30 days. Admin must re-login.
- `auth` middleware blocks any request without valid token to protected routes.
- Validate all inputs with `express-validator` before saving to DB.

*Data Model Changes*
- `Office` now only has `name` and `addresses: [{address}]`. No phone, email, mapUrl.
- `Story` is a single document. `PUT` upserts it.
- `Contact` replaces `Message`. Fields: `fullname`, `email`, `phone`, `message`, `status`.

---

This matches what you actually built: no `/api/public`, no `/api/admin` wrapper for resource routes. Auth is only checked on POST/PUT/DELETE. 

Want me to generate the updated `app.js` with the correct route mounts to match this spec?