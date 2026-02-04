# GitHub User Lookup

A responsive web application that allows users to search for GitHub profiles and view account details along with top repositories sorted by stars.

🔗 **Live Demo:**  
https://umarshahzad-dev.github.io/github-lookup/

---

## Features

- Search any GitHub username
- View profile information:
  - Avatar
  - Name and username
  - Bio
  - Followers, Following, Public repositories
- Display top 5 repositories by stars
- Fully clickable repository cards
- Error handling for invalid users
- Responsive design (desktop & mobile)

---

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6 Modules, Async/Await)
- GitHub REST API
- GitHub Pages (Deployment)

---

## Project Structure

```
github-lookup/
├── index.html
├── style.css
├── app.js
├── api.js
└── config.js
```

- `index.html` – UI structure  
- `style.css` – Styling and responsive layout  
- `app.js` – Controller logic and DOM handling  
- `api.js` – API requests  
- `config.js` – API configuration  

---

## Architecture

The project follows a simplified MVC-inspired structure:

- **Model** → API layer  
- **View** → HTML & CSS  
- **Controller** → JavaScript logic  

This separation improves maintainability and scalability.

---

## Author

Umar Shahzad  
GitHub: https://github.com/umarshahzad-dev
