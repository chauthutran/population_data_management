This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Key Features:
1️⃣ User Authentication & Role Management
Users: Submit datasets for approval.
Approvers: Review and approve/reject datasets.
Admins: Manage users, settings, and approvals.
2️⃣ Dataset Management
Users can submit datasets with orgUnit, periodType, and data elements.
Admins & approvers can view, approve, or reject datasets.
Store datasets in MongoDB with an approval status (pending, approved, rejected).
3️⃣ Organizational Unit (orgUnit) Hierarchy
OrgUnits stored in MongoDB as a tree structure (e.g., Country > Region > District).
Users can filter data by orgUnit levels.
4️⃣ Period Type Handling
Support Monthly, Quarterly, Yearly, or Custom periods.
Users select a date range, and the system auto-assigns the period type.
5️⃣ Approval Process
Users submit a dataset → Approvers review → Approve/Reject.
Send email or notification on status change.
6️⃣ Charts & Analytics (Using Chart.js)
Approval Trends: Monthly/Yearly approval trends.
Data Summary: Number of approved/rejected datasets.
OrgUnit Comparison: Compare approvals per organization unit.
7️⃣ UI & UX (Next.js & Tailwind CSS)
Dashboard: Overview of approvals, pending requests, trends.
Forms: Submit datasets with file uploads & validation.
Tables: List of approvals with filters and sorting.
8️⃣ MongoDB Connection & API Routes
Reusable MongoDB connection class (for handling connections efficiently).
REST APIs or GraphQL for CRUD operations on datasets.
Next.js API routes to handle user authentication & approvals.

## Tech Stack
Frontend
✅ Next.js (React-based Framework)
✅ Tailwind CSS (for styling)
✅ Chart.js / Recharts (for analytics)

Backend
✅ Next.js API Routes
✅ MongoDB & Mongoose (for data storage)
✅ JWT Authentication (for secure logins)
✅ Zod / Yup Validation (for form validation)

