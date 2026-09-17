# OMAXE LIMITED — ADMIN API REST CONTRACT

This document specifies the exact REST API contract implemented by the Omaxe Admin Data-Access Layer.
All endpoints use standard HTTP verbs, JSON request/response envelopes, and bearer token authentication.

## Global Conventions

- **Base URL**: `/api/v1/admin`
- **Auth Header**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Standard Response Envelope**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2026-09-16T18:45:00Z"
}
```
- **Paginated Response Envelope**:
```json
{
  "success": true,
  "data": [ ... ],
  "total": 142,
  "page": 1,
  "pageSize": 20,
  "totalPages": 8,
  "timestamp": "2026-09-16T18:45:00Z"
}
```

---

## 1. Authentication & Users

### `POST /auth/login`
- **Body**: `{ "email": "user@omaxe.com", "password": "...", "rememberMe": true, "twoFactorCode": "123456" }`
- **Response**: `{ "token": "jwt...", "refreshToken": "...", "user": UserObject }`

### `GET /users`
- **Query**: `page`, `pageSize`, `search`, `role`, `status`
- **Response**: `PaginatedResult<User>`

### `POST /users` / `PUT /users/:id` / `DELETE /users/:id`
- Full user CRUD, invite, role assignment, and suspension.

---

## 2. Projects & Developments (`/projects`)

### `GET /projects`
- **Query**: `page`, `pageSize`, `sortBy`, `sortOrder`, `search`, `status`, `category`, `city`, `publishedState`
- **Response**: `PaginatedResult<AdminProject>`

### `GET /projects/:id` or `GET /projects/slug/:slug`
- **Response**: `AdminProject`

### `POST /projects`
- **Body**: `AdminProjectInput` validated by `ProjectSchema`
- **Response**: `AdminProject` (status 201)

### `PUT /projects/:id`
- **Body**: `Partial<AdminProjectInput>`
- **Response**: `AdminProject`

### `POST /projects/:id/publish` / `POST /projects/:id/unpublish` / `POST /projects/:id/archive`
- State transition endpoints with automated audit log creation.

### `POST /projects/:id/duplicate`
- Duplicates a project record with `(Copy)` suffix and draft status.

### `POST /projects/reorder`
- **Body**: `{ "orderedIds": ["proj-1", "proj-2", "proj-3"] }`
- Reorders display order of featured projects.

---

## 3. Media Assets (`/media`)

### `POST /media/upload`
- **Form Data**: `file` (multipart/form-data), `folderPath`
- Generates responsive widths (400, 800, 1200, 1920, 2560px) and extracts metadata.

### `GET /media`
- **Query**: `folderPath`, `mimeType`, `search`, `page`, `pageSize`, `unusedOnly=true`

### `PUT /media/:id`
- Updates alt text, caption, title, tags, and non-destructive JSON image edit recipe.

---

## 4. CRM & Leads (`/leads`)

### `GET /leads`
- **Query**: `status`, `city`, `projectName`, `search`, `dateFrom`, `dateTo`, `unassigned=true`

### `PUT /leads/:id/status`
- **Body**: `{ "status": "Site Visit Scheduled" }`

### `POST /leads/:id/notes`
- **Body**: `{ "text": "Client requested follow-up call at 4 PM" }`

### `POST /leads/merge`
- **Body**: `{ "primaryId": "lead-1", "secondaryId": "lead-2" }`

---

## 5. Analytics & Real-Time Metrics (`/analytics`)

### `GET /analytics/dashboard-kpis?range=30d`
- Returns sparklines, current period vs previous period for Visitors, Unique, Enquiries, Brochure Downloads, Conversion Rate, and Avg. Session.

### `GET /analytics/traffic-series?range=30d`
### `GET /analytics/top-projects`
### `GET /analytics/enquiries-by-city`
### `GET /analytics/sources`
### `GET /analytics/devices`

---

## 6. Global Settings & Navigation (`/settings`, `/navigation`)

### `GET /settings` / `PUT /settings`
- Brand, contact details, social links, footer disclaimer, form validation rules, GTM & tracking scripts, maintenance mode.

### `GET /navigation/header` / `PUT /navigation/header`
- Header mega-menu structure tree.
