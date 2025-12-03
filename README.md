# Product Management Dashboard (React + TypeScript)

This is a Product Management application built using **React**, **TypeScript**, and **Pure CSS** as part of a technical assessment.  
It allows users to view, search, add, edit and active/inactive products efficiently with a clean UI.

---

## 🚀 Live Demo  
🔗 **Vercel Deployment:** https://product-management-react-assessment.vercel.app/

---

## 📂 GitHub Repository  
🔗 https://github.com/anushayaragogu0309/product-management-react-assessment

---

## 📌 Features

### ✅ Product List & Grid Views
- Table view (list)
- Card view (grid)
- Toggle between views

### 🔍 Search with Debounce
- Search by product name  
- Debounce of **500ms** to optimize performance

### 📝 Add & Edit Product
- Popup modal form
- Form fields:
  - Name (required)
  - Price (required, number)
  - Category (required)
  - Stock (number)
  - Description (optional)
  - Tags (multi-select)
  - Active status (boolean)
- Inline form validation
- Editing pre-fills the form with product details
- Updates stored in local React state (no backend)

### 🧭 Pagination
- 10 products per page  
- Next / Previous navigation

---

## 🛠️ Tech Stack
- **React 18**
- **TypeScript**
- **Vite**
- **Pure CSS**
- **Vercel** for deployment

---

## 📁 Folder Structure

src/
│── components/
│ ├── ProductTable.tsx
│ ├── ProductCardGrid.tsx
│ ├── ProductFormModal.tsx
│── pages/
│ ├── ProductPage.tsx
│── interfaces/
│ ├── Product.interface.ts
│── App.tsx
│── main.tsx
│── style.css



---

## ▶️ How to Run Locally

1. Clone the repository:
git clone https://github.com/anushayaragogu0309/product-management-react-assessment.git

2. Navigate to the folder:
cd your-repo-name

3. Install dependencies:
npm install

4. Start the development server:
npm run dev


---

## 📌 Notes
- No external UI libraries used — **100% custom CSS**.
- Entire product list handled using React state.
- Clean TypeScript interfaces for better type safety.

---

## ✨ Author
**Anusha Yaragogu**  
Frontend Developer | React | Angular | TypeScript | JavaScript 

---


