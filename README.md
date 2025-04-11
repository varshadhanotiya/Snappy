# 📸 Image Search and Editor App

A web app built with **React**, **Vite**, and **Fabric.js** that allows users to search for images using the **Pexels API**, and edit them by adding text, shapes, and downloading the final design.

---

## 🚀 Features

- 🔍 Search for high-quality images via Pexels API.
- 🖼 Display results with pagination.
- 🎨 Edit images using Fabric.js canvas.
- ✏️ Add captions, shapes (rectangle, circle, triangle).
- 📥 Download your final image.
- 🔁 Hot Module Replacement (HMR) with Vite.
- ⚡️ Debounced search input for better performance.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Canvas Editor:** Fabric.js
- **API:** Pexels
- **Styling:** CSS + MUI Icons

---

## 📦 Installation

```bash
git clone https://github.com/your-username/image-search-editor.git
cd image-search-editor
npm install
```

Create a .env file in the root and add your Pexels API key:

VITE_PEXELS_API_KEY=your_pexels_api_key_here

Don't forget to restart the dev server after editing .env.

```

---

## 🚧 Available Scripts

Run locally:
npm run dev
Build for production:
npm run build

---

src/
├── api/
│   └── api.js           # Contains functions for making API calls to the Pexels API.
├── components/
│   └── FabricJSCanvas.jsx # Component for Fabric.js canvas.
│   └── PaginationComponent.jsx # Reusable component for handling pagination of search results.
├── pages/
│   └── SearchPage.jsx   # Component for searching images and displaying results with navigation.
│   └── EditorPage.jsx   # Component containing the Fabric.js canvas for image editing.
├── utils/
│   └── debounce.js      # Utility function for implementing debounced search input.
├── App.jsx              # Main application component that sets up routing and global layout.
├── main.jsx             # Entry point of the React application, responsible for rendering the root component.
└── App.css              # Global styles for the application.


💡 Future Improvements
Add undo/redo on canvas.
color option 
text styles
Layer management for canvas objects.
