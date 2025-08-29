# Products Listing

Products Listing is a modern product catalog web application built with React, TypeScript, and Tailwind CSS. It provides a beautiful, responsive interface for browsing, searching, filtering, and sorting products. Users can view products in grid or list layouts, apply filters, and see detailed product information. The app fetches product data from a backend API and is easy to customize for different use cases.

## Features

- Product grid and list views
- Search and filter by category, price, rating, and more
- Sort products by name, price, or rating
- Responsive design with Tailwind CSS
- Loading spinner and error handling
- Backend API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd product-listing
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- Start the development server:

  ```bash
  npm run dev:full
  ```

  This will start both the frontend and backend servers.

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
product-listing/
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── server/
│   ├── server.js
│   └── data/
├── index.html
├── package.json
└── ...
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Express (backend)

## License

This project is licensed under the MIT License.

---

Feel free to customize this README and the app name as needed!
