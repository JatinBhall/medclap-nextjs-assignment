# Architecture Documentation

## Project Structure

This application is built with Next.js App Router. The architecture follows a component-based approach with clear separation of concerns.

### Directory Layout
```
medical-card-checker/
├── data/
│   └── states.json                             # State configuration data
├── public/
│   └── ...                                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/
|   |   |   └── eligibility/
|   │   │       └── eligibility.ts              # API simulation layer
│   │   ├── components/
│   │   │   ├── ui/                             # Reusable UI primitives
│   │   │   ├── Navbar.tsx                      # Global navigation
│   │   │   ├── Footer.tsx                      # Global footer
│   │   │   ├── StateSelector.tsx               # State selection component
│   │   │   └── FormInput.tsx                   # Reusable form input
|   |   |    and more....
│   │   ├── (root)
│   │   │   ├── page.tsx                        # Landing page with state selector
|   |   |   └── state/
|   |   |       └── [slug]
|   |   |           ├── page.tsx                    #  State details display          
|   |   |           ├── apply/ 
|   |   |           |   └── page.tsx            # Application form          
|   |   |           └── success/       
|   |   |               └── page.tsx            # Post-submission confirmation          
|   |   ├── admin/
|   |   |   └── submission/
│   │   │      └── page.tsx                     # Submissions dashboard
```
## Data Flow

### 1. User Journey Flow

```
┌─────────────┐
│  Home Page  │  User selects state from dropdown
│   (/)       │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   State Page    │  Display state-specific info
│ /state/[slug]   │  (age requirement, fees, description)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   Apply Page    │  User fills eligibility form
│/state/[slug]/   │  (name, email, age, condition)
│     apply       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│Eligibility API  │  POST /api/eligibility
│  (route.ts)     │  Validates and stores submission
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Success Page   │  Shows confirmation with user name
│/state/[slug]/   │  and state applied for
│    success      │
└─────────────────┘
```

### 2. Admin Dashboard Flow

```
┌─────────────────┐
│   Admin Page    │  GET /api/submissions
│    /admin/      │
│  submissions    │ 
└─────────────────┘         