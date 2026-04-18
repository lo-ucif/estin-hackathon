# API Testing Examples

## 🧪 Test the APIs Directly

You can test the API endpoints directly using curl, Postman, or the browser console.

---

## Worker Profile Submission

### Endpoint

```
POST https://videoedit.app.n8n.cloud/webhook/recruitment
```

### Request Example

```json
{
  "type": "worker",
  "name": "John Doe",
  "skills": ["Python", "Machine Learning", "TensorFlow", "React"],
  "location": "San Francisco",
  "experience_years": 3,
  "seniority": "mid",
  "cv": "ML engineer with 3 years experience building production models. Skilled in Python, data engineering, and cloud deployment.",
  "email": "john@example.com"
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Worker profile parsed and stored successfully",
  "summary": "John Doe is a mid-level engineer with strong ML background and 3 years of production experience...",
  "skills_highlight": ["Python", "Machine Learning", "TensorFlow", "React"],
  "recommended_roles": [
    "Machine Learning Engineer",
    "Senior Data Engineer",
    "Full Stack Engineer"
  ]
}
```

### cURL Test

```bash
curl -X POST https://videoedit.app.n8n.cloud/webhook/recruitment \
  -H "Content-Type: application/json" \
  -d '{
    "type": "worker",
    "name": "John Doe",
    "skills": ["Python", "Machine Learning"],
    "location": "Remote",
    "experience_years": 3,
    "seniority": "mid",
    "cv": "ML engineer with 3 years experience",
    "email": "john@example.com"
  }'
```

### JavaScript/Fetch Test

```javascript
// Open browser console and run:
fetch("https://videoedit.app.n8n.cloud/webhook/recruitment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "worker",
    name: "Jane Smith",
    skills: ["React", "Node.js", "TypeScript"],
    location: "New York",
    experience_years: 5,
    seniority: "senior",
    cv: "Full stack engineer with 5 years experience",
    email: "jane@example.com",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data));
```

---

## Employer Job Posting

### Endpoint

```
POST https://videoedit.app.n8n.cloud/webhook/recruitment?employer=true
```

### Request Example

```json
{
  "type": "employer",
  "title": "Senior Python Developer",
  "company": "TechStartup Inc",
  "skills_required": ["Python", "Django", "PostgreSQL", "Docker"],
  "location": "San Francisco",
  "description": "We are seeking a senior Python developer to build scalable backend APIs and microservices. Must have experience with Django and PostgreSQL."
}
```

### Expected Response

```json
{
  "success": true,
  "type": "employer",
  "total_matches": 15,
  "matches": [
    {
      "rank": 1,
      "candidate_name": "Michael Chen",
      "match_score": 95,
      "recommendation": "strong_match",
      "reasoning": "Excellent match with 8 years Python/Django experience and all required skills. Strong PostgreSQL background."
    },
    {
      "rank": 2,
      "candidate_name": "Sarah Johnson",
      "match_score": 88,
      "recommendation": "strong_match",
      "reasoning": "Very strong candidate with 6 years backend development experience. Expert in Django and Docker."
    },
    {
      "rank": 3,
      "candidate_name": "David Lee",
      "match_score": 75,
      "recommendation": "good_match",
      "reasoning": "Solid experience with Python and Django. PostgreSQL skills are developing. Good potential fit."
    },
    {
      "rank": 4,
      "candidate_name": "Emily Rodriguez",
      "match_score": 62,
      "recommendation": "moderate_match",
      "reasoning": "Has Python and PostgreSQL experience but limited Django background. Would require some ramp-up."
    }
  ]
}
```

### cURL Test

```bash
curl -X POST "https://videoedit.app.n8n.cloud/webhook/recruitment?employer=true" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "employer",
    "title": "Senior React Developer",
    "company": "WebCorp",
    "skills_required": ["React", "TypeScript", "Node.js"],
    "location": "Remote",
    "description": "Looking for experienced React developer with TypeScript expertise"
  }'
```

### JavaScript/Fetch Test

```javascript
// Open browser console and run:
fetch("https://videoedit.app.n8n.cloud/webhook/recruitment?employer=true", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "employer",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    skills_required: ["React", "Node.js", "MongoDB"],
    location: "Austin",
    description: "Seeking full stack engineer for startup",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data));
```

---

## Testing in React App

### Using the Hooks Directly in DevTools Console

```javascript
// In the app, you can test the hooks:

// Import the functions directly (if window scope allows)
// Or just test the endpoints via fetch as shown above
```

### Testing in the UI

1. **Worker Flow (`/jobs` page)**

   ```
   - Enter name: "Jane Developer"
   - Add skills: React, TypeScript, Node.js
   - Enter email: jane@dev.com
   - Click "Generate AI Profile"
   - Watch Network tab for API call
   - View results displayed on page
   ```

2. **Employer Flow (`/upload` page)**
   ```
   - Enter title: "Senior Full Stack Engineer"
   - Enter company: "Tech Company"
   - Add skills: React, Node.js, PostgreSQL
   - Enter location: Remote
   - Enter description: "Looking for experienced full stack developer"
   - Click "Generate Job Profile"
   - View matched candidates with scores
   ```

---

## Response Payload Fields Reference

### WorkerPayload (Request)

| Field            | Type     | Required | Description                  |
| ---------------- | -------- | -------- | ---------------------------- |
| type             | string   | ✓        | Must be "worker"             |
| name             | string   | ✓        | Candidate's full name        |
| skills           | string[] | ✓        | Array of skill names         |
| location         | string   | ✓        | Location or "Not specified"  |
| experience_years | number   | ✓        | Years of experience          |
| seniority        | enum     | ✓        | "junior", "mid", or "senior" |
| cv               | string   | ✓        | CV text or summary           |
| email            | string   | ✓        | Contact email                |

### WorkerResponse (Response)

| Field             | Type     | Description                    |
| ----------------- | -------- | ------------------------------ |
| success           | boolean  | Whether request was successful |
| message           | string   | Confirmation message           |
| summary           | string   | AI-generated profile summary   |
| skills_highlight  | string[] | Key skills extracted by AI     |
| recommended_roles | string[] | Job roles recommended by AI    |

### EmployerPayload (Request)

| Field           | Type     | Required | Description        |
| --------------- | -------- | -------- | ------------------ |
| type            | string   | ✓        | Must be "employer" |
| title           | string   | ✓        | Job title          |
| company         | string   | ✓        | Company name       |
| skills_required | string[] | ✓        | Required skills    |
| location        | string   | ✓        | Job location       |
| description     | string   | ✓        | Job description    |

### EmployerResponse (Response)

| Field         | Type             | Description                    |
| ------------- | ---------------- | ------------------------------ |
| success       | boolean          | Whether request was successful |
| type          | string           | "employer"                     |
| total_matches | number           | Total candidates found         |
| matches       | CandidateMatch[] | List of matched candidates     |

### CandidateMatch (in matches array)

| Field          | Type   | Description                                    |
| -------------- | ------ | ---------------------------------------------- |
| rank           | number | 1-indexed ranking                              |
| candidate_name | string | Candidate's name                               |
| match_score    | number | 0-100 match percentage                         |
| recommendation | string | "strong_match", "good_match", "moderate_match" |
| reasoning      | string | Why candidate matches this job                 |

---

## Error Response Format

If the API returns an error:

```json
{
  "success": false,
  "error": "Missing required field: email",
  "message": "Validation failed"
}
```

Or HTTP error codes:

- `400` - Bad request (missing/invalid fields)
- `500` - Server error
- `429` - Rate limit exceeded

---

## Postman Collection

### Import to Postman

Save this as `recruitment-api.postman_collection.json`:

```json
{
  "info": {
    "name": "AI Recruitment API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Submit Worker Profile",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"type\": \"worker\", \"name\": \"John Doe\", \"skills\": [\"Python\", \"React\"], \"location\": \"Remote\", \"experience_years\": 3, \"seniority\": \"mid\", \"cv\": \"Experienced developer\", \"email\": \"john@example.com\"}"
        },
        "url": {
          "raw": "https://videoedit.app.n8n.cloud/webhook/recruitment",
          "protocol": "https",
          "host": ["videoedit", "app", "n8n", "cloud"],
          "path": ["webhook", "recruitment"]
        }
      }
    },
    {
      "name": "Post Employer Job",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"type\": \"employer\", \"title\": \"Senior Developer\", \"company\": \"TechCorp\", \"skills_required\": [\"Python\", \"React\"], \"location\": \"Remote\", \"description\": \"Looking for experienced developer\"}"
        },
        "url": {
          "raw": "https://videoedit.app.n8n.cloud/webhook/recruitment?employer=true",
          "protocol": "https",
          "host": ["videoedit", "app", "n8n", "cloud"],
          "path": ["webhook", "recruitment"],
          "query": [
            {
              "key": "employer",
              "value": "true"
            }
          ]
        }
      }
    }
  ]
}
```

---

## Performance Notes

- **Typical Response Time**: 2-10 seconds (includes AI processing)
- **Max Request Size**: ~10KB for JSON body
- **Rate Limit**: Not specified (test for limits)
- **CORS**: ✓ Enabled (can be called from frontend)

---

## Debugging Tips

1. **Check Network Tab**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for `recruitment` request
   - Check Request/Response bodies

2. **Check Console**
   - Look for any error messages
   - Check error in Toast component

3. **Check Browser Security**
   - CORS errors appear in console as red messages
   - Check if API endpoint is accessible

4. **Test with Simpler Data**
   - Use minimal required fields first
   - Add complexity gradually

---

**Last Updated**: April 18, 2026
