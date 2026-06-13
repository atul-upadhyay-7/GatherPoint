# GatherPoint POS - Requirements & Gap Analysis

## Role-Based Access Control (RBAC)

| Role | Access |
|------|--------|
| ADMIN | Full access: Backend admin, Reports, POS, KDS |
| EMPLOYEE | POS Terminal, Orders, Customer Management, Table View |
| KITCHEN_STAFF | Kitchen Display only (separate URL) |

### Current Status
- Three roles defined: `ADMIN`, `EMPLOYEE`, `KITCHEN_STAFF`
- Frontend enforces RBAC via `ROLE_PERMISSIONS` config:
  - **ADMIN**: POS, Orders, Customers, Tables, Kitchen, Admin (all sub-tabs), Reports, hamburger management
  - **EMPLOYEE**: POS, Orders, Customers, Tables (no admin, no reports, no kitchen)
  - **KITCHEN_STAFF**: Kitchen tab only (sidebar + standalone KDS page)
- Sidebar items, hamburger menu, admin sub-tabs, and all content tabs are guarded
- Unauthorized tab access shows "Access Restricted" with role info and redirect button
- KDS is accessible via standalone route (`/kds.html`) for KITCHEN_STAFF

---

## Feature Implementation Status

### 1. Authentication & Login/ Signup
- [x] Clerk Google OAuth
- [x] Email/password signup
- [x] Email/password login
- [ ] **Session auto-open on login** — After login, POS session should open directly (requirement)
- [ ] **"On successful login, the POS session opens directly"** — not fully implemented

### 2. Backend Admin Features

#### 2.1 Product Management
- [x] CRUD products
- [x] Category assignment
- [ ] **Inline category creation** — Create new category on-the-fly without leaving product form

#### 2.2 Category Management
- [x] CRUD categories
- [x] Color assignment

#### 2.3 Payment Method Setup
- [ ] **Toggle enable/disable** — Each method has enable/disable toggle
- [ ] **UPI ID storage** — Save UPI ID (e.g. cafe@ybl)
- [ ] **Dynamic QR generation** — QR code generated from stored UPI ID

#### 2.4 Floor & Table Management
- [x] CRUD floors
- [x] CRUD tables

#### 2.5 Coupons & Promotions
- [x] Coupon CRUD (percentage/flat)
- [x] Promotion CRUD (product-level with min qty, order-level with min amount)
- [ ] **Auto-apply promotions in cart** — Not displayed on cart items

#### 2.6 User/Employee Management
- [x] List employees
- [x] Add employee
- [x] Archive (toggle active)
- [x] Delete employee
- [x] Change password (backend endpoint exists)
- [ ] **Change password UI** — Frontend missing password change form

#### 2.7 Booking
- [ ] **Booking model & CRUD** — Not implemented at all
- [ ] **Booking calendar UI** — Not implemented

### 3. POS Terminal

#### 3.1 Navigation
- [x] Sidebar tabs (POS, KDS, Admin, Reports)
- [ ] **Top navigation bar** — Requirement specifies top nav with: POS Order, Orders, Customer, Table View, Product Search, Current Table, Employee Icon, Hamburger Menu
- [ ] **Hamburger menu** — Links to Products, Category, Payment Method, Coupon & Promotion, Booking, User/Employee, KDS, Reports, Logout

#### 3.2 Floor Pop-up
- [x] Floor/table selection grid
- [x] Visual distinction for occupied tables
- [ ] **Auto-open on session start** — Floor popup should appear when session starts

#### 3.3 Order View
- [x] Product cards with category filter
- [x] Cart with qty controls
- [x] Order summary (subtotal, tax, discounts, total)
- [ ] **Product-level promotion display** — Show discount on cart item line
- [ ] **Send to Kitchen action** — Button exists, but should be per-order-before-payment
- [ ] **Customer assignment** — exists but can be improved
- [ ] **Discount popup** — Coupon code entry popup

#### 3.4 Payment
- [x] Cash (with change calculation)
- [x] Card (with transaction ref)
- [ ] **UPI QR from saved UPI ID** — Currently mock QR, not dynamic
- [x] Order status after payment
- [ ] **Print receipt** — Not implemented
- [ ] **Email receipt** — Not implemented

#### 3.5 Orders Screen
- [ ] **Orders list for current session** — Not implemented as separate view
- [ ] **Search by customer/order number/date** — Not implemented
- [ ] **Order detail view** — Not implemented
- [ ] **Edit Draft orders** — Not implemented
- [ ] **Delete Draft orders** — Not implemented

#### 3.6 Customer Management (from POS)
- [x] Customer CRUD (basic)
- [ ] **Customer search** — Not implemented
- [ ] **Customer create inline** — Not implemented

### 4. Kitchen Display (KDS)
- [x] Real-time ticket list
- [x] Stage progression (TO_COOK → PREPARING → COMPLETED)
- [ ] **Item-level completion** — Mark individual items as completed (strikethrough)
- [ ] **Search/filter by product** — Not implemented
- [x] WebSocket real-time updates
- [x] Separate URL/route for kitchen staff
- [ ] **Standalone KDS page** — Not a separate route, embedded in main app

### 5. Reporting & Dashboard
- [x] Dashboard stats (total orders, revenue, avg order value)
- [x] Top products
- [x] Top categories
- [x] Export PDF (mock)
- [x] Export XLS (mock)
- [ ] **Filters** — Period (Today/This Week/This Month/Custom), Employee, Session, Product
- [ ] **Sales trend chart** — With date range filtering
- [ ] **Top orders table** — Highest-value orders
- [ ] **Session filter on reports** — Not implemented

### 6. POS Session Management
- [x] Open session
- [x] Close session
- [ ] **Auto-open on login** — Not implemented
- [ ] **Closing summary** — Not displayed
- [ ] **Session-based filtering** — Reports by session

---

## Summary of Missing Features (Priority Order)

### HIGH PRIORITY (Core functionality gaps)
1. Top navigation bar with hamburger menu
2. Orders screen (list, search, detail, edit, delete)
3. Item-level completion in KDS
4. Standalone KDS route
5. Reporting filters (period, employee, session, product)
6. Dynamic QR code from saved UPI ID
7. Email receipt functionality

### MEDIUM PRIORITY (User experience)
8. Product-level promotion display on cart items
9. Change password UI for employees
10. POS session auto-open on login
11. Customer search & inline creation
12. Discount/coupon popup

### LOW PRIORITY (Nice-to-have)
13. Booking feature
14. Receipt printing
15. Inline category creation in product form
