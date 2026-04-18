# API Integration Guide - AI Recruitment Platform

## 🎯 Project Overview

Your React recruitment platform is now fully connected to the backend API with real API integration, removing all mock data from the submission flows.

---

## 📦 What Was Created

### 1. **API Layer** (`/src/api/recruitment.ts`)

- ✅ `submitWorkerProfile()` - Submit candidate profiles
- ✅ `submitEmployerJob()` - Post jobs and get candidate matches
- Axios-based HTTP client with proper error handling
- Configured to hit: `https://videoedit.app.n8n.cloud/webhook/recruitment`

### 2. **TypeScript Types** (`/src/types/api.ts`)

Complete type definitions for:

- `WorkerPayload` - Candidate submission data
- `EmployerPayload` - Job posting data
- `WorkerResponse` - AI-analyzed candidate profile
- `EmployerResponse` - Matched candidates with scores
- `CandidateMatch` - Individual candidate ranking

### 3. **Custom Hooks** (`/src/hooks/useRecruitmentApi.ts`)

- ✅ `useSubmitWorkerProfile()` - Manages worker submission state
- ✅ `useSubmitEmployerJob()` - Manages employer submission state
- Auto-handles: loading, errors, and response data

### 4. **UI Components**

- **`WorkerResult.tsx`** - Displays AI analysis results (summary, skills, recommended roles)
- **`EmployerResult.tsx`** - Shows candidate matches with scores (1-100%)
- **`Toast.tsx`** - Error/success notifications with auto-dismiss
- **`LoadingSpinner.tsx`** - Professional loading state indicator

### 5. **Updated Pages**

- **`/src/app/jobs/page.tsx`** - Worker flow (Find Jobs)
  - Form inputs for candidate profile
  - Real API call on "Generate AI Profile" button
  - Displays API response results
  - Shows recommended jobs from AI

- **`/src/app/upload/page.tsx`** - Employer flow (Post a Job)
  - Form inputs for job details
  - Real API call on "Generate Job Profile" button
  - Shows matched candidates with match scores
  - Displays reasoning for each match

---

## 🚀 How to Use

### **Worker Flow (Job Finder)**

1. Navigate to `/jobs` page
2. Fill in your profile:
   - Full Name
   - Skills (add multiple)
   - Location
   - Experience level, education, projects
   - Contact information (email required)
3. Click **"Generate AI Profile"**
4. The system will:
   - Send your data to the API
   - Show loading state
   - Display AI analysis results:
     - Profile summary
     - Key skills extracted by AI
     - Recommended job roles
   - Show matching jobs below

### **Employer Flow (Post a Job)**

1. Navigate to `/upload` page
2. Fill in job details:
   - Job Title
   - Company Name
   - Required Skills (add multiple)
   - Location
   - Work Type (Remote/Onsite/Hybrid)
   - Job Description
3. Click **"Generate Job Profile"**
4. The system will:
   - Send job posting to the API
   - Show loading state
   - Display matched candidates:
     - Candidate name & rank
     - Match score (percentage)
     - Reasoning for the match
     - Match recommendation level

---

## 📊 API Response Format

### Worker Response Example

```json
{
  "success": true,
  "message": "Worker profile parsed and stored successfully",
  "summary": "John Doe is an experienced mid-level developer...",
  "skills_highlight": ["Python", "React", "Node.js"],
  "recommended_roles": ["Senior Frontend Engineer", "Full Stack Developer"]
}
```

### Employer Response Example

```json
{
  "success": true,
  "type": "employer",
  "total_matches": 15,
  "matches": [
    {
      "rank": 1,
      "candidate_name": "Alice Smith",
      "match_score": 95,
      "recommendation": "strong_match",
      "reasoning": "Excellent skill alignment and 8 years experience..."
    },
    {
      "rank": 2,
      "candidate_name": "Bob Johnson",
      "match_score": 82,
      "recommendation": "good_match",
      "reasoning": "Strong technical background with 5 years experience..."
    }
  ]
}
```

---

## 🔌 API Endpoints Used

### Base URL

```
https://videoedit.app.n8n.cloud
```

### Endpoints

```
POST /webhook/recruitment
  → For worker profile submission

POST /webhook/recruitment?employer=true
  → For employer job posting
```

---

## 🎨 UI/UX Features Implemented

✅ **Loading States**

- Spinner animation while processing
- Disabled buttons during requests
- Custom loading messages

✅ **Error Handling**

- Form validation before submission
- Error toast notifications
- Red error box for display
- Graceful error messages

✅ **State Management**

- `useState` for reactive UI
- Custom hooks for API logic
- Toast state management

✅ **Smooth Transitions**

- Disabled state styling
- Loading indicator animations
- Toast auto-dismiss (5 seconds)

---

## 🧪 Testing the Integration

### Test Worker Flow

1. Go to `http://localhost:5173/jobs`
2. Fill form with test data:
   ```
   Name: John Doe
   Skills: React, TypeScript, Node.js
   Email: john@example.com
   Location: Remote
   Seniority: Mid
   ```
3. Click "Generate AI Profile"
4. Check console/Network tab to see API call
5. View results displayed in the response section

### Test Employer Flow

1. Go to `http://localhost:5173/upload`
2. Fill form with test data:
   ```
   Title: Senior React Developer
   Company: TechCorp
   Skills: React, TypeScript, CSS
   Location: New York
   Description: Looking for experienced React developer
   ```
3. Click "Generate Job Profile"
4. Check API response with matched candidates

---

## 📝 Code Examples

### Using the Worker Hook

```tsx
import { useSubmitWorkerProfile } from "../hooks/useRecruitmentApi";

const { submit, loading, error, data } = useSubmitWorkerProfile();

const handleSubmit = async () => {
  try {
    const response = await submit({
      type: "worker",
      name: "John Doe",
      skills: ["React", "Node.js"],
      location: "Remote",
      experience_years: 3,
      seniority: "mid",
      cv: "CV text",
      email: "john@example.com",
    });
    // Handle response
  } catch (err) {
    // Error already handled by hook
  }
};
```

### Using the Employer Hook

```tsx
import { useSubmitEmployerJob } from "../hooks/useRecruitmentApi";

const { submit, loading, error, data } = useSubmitEmployerJob();

const handlePostJob = async () => {
  try {
    const response = await submit({
      type: "employer",
      title: "Senior Developer",
      company: "TechCorp",
      skills_required: ["React", "Node.js"],
      location: "Remote",
      description: "Looking for...",
    });
    // Handle response
  } catch (err) {
    // Error already handled by hook
  }
};
```

---

## 🔒 Error Handling

The system handles errors at multiple levels:

1. **Form Validation** - Before API call

   ```
   "Please enter your full name"
   "Please add at least one skill"
   "Please enter your email address"
   ```

2. **Network Errors** - From API responses
   - Caught and displayed in toast
   - Red error box shown on page

3. **No Data** - When API returns failure
   - Error message displayed
   - User can retry

---

## 🚀 Next Steps (Optional Enhancements)

- [ ] Add rate limiting (prevent spam submissions)
- [ ] Add file upload for PDFs (CV)
- [ ] Add localStorage caching of responses
- [ ] Add export/download of results
- [ ] Add analytics tracking
- [ ] Add pagination for candidate lists

---

## 📚 File Structure

```
src/
├── api/
│   └── recruitment.ts          ← API layer
├── hooks/
│   └── useRecruitmentApi.ts     ← Custom hooks
├── components/
│   ├── WorkerResult.tsx         ← Worker results display
│   ├── EmployerResult.tsx       ← Employer results display
│   ├── Toast.tsx                ← Notifications
│   └── LoadingSpinner.tsx       ← Loading state
├── types/
│   └── api.ts                   ← TypeScript types
└── app/
    ├── jobs/page.tsx            ← Worker flow
    └── upload/page.tsx          ← Employer flow
```

---

## ✅ Checklist - Integration Complete

- ✅ API layer created with axios
- ✅ TypeScript types defined
- ✅ Custom hooks implemented
- ✅ Result components created
- ✅ UI components for UX (Toast, Spinner)
- ✅ Worker flow page updated
- ✅ Employer flow page updated
- ✅ Error handling implemented
- ✅ Loading states added
- ✅ Form validation added
- ✅ TypeScript compilation passes
- ✅ Build successful

**Status: 🎉 READY FOR PRODUCTION TESTING**

---

## 🆘 Troubleshooting

### API calls not going through?

- Check network tab in browser DevTools
- Verify API URL: `https://videoedit.app.n8n.cloud`
- Check CORS headers (API should accept cross-origin requests)

### Types error after changes?

- Run `npm run build` to type-check
- Ensure type-only imports use `import type`

### Toast not showing?

- Check if component is rendered in parent layout
- Toast auto-dismisses after 5 seconds

### Loading spinner spinning forever?

- Check API response in Network tab
- Ensure API endpoint is returning valid JSON

---

**Created:** April 18, 2026  
**Last Updated:** Production Ready
