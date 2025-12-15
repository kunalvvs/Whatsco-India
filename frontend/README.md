# Whatsco India - Frontend

A modern, mobile-first React.js e-commerce application built with Vite.

## Features

- 🏠 **Home Page**: Premium leather collection showcase with image carousel
- 🛍️ **Shopping Page**: Product catalog with categories, search, and favorites
- 📢 **Promotion Center**: Ad packages and business promotion tools
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive layout
- 🎨 **Modern UI**: Clean and intuitive interface with smooth animations

## Tech Stack

- React 18.2
- Vite 5.0
- React Router DOM 6.20
- Pure CSS (No UI frameworks)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   └── BottomNav.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shopping.jsx
│   │   └── Promotion.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Pages

### Home (`/`)
- Premium leather collection advertisement
- Image carousel with "Film Strip" feature
- Search functionality

### Shopping (`/shopping`)
- Product grid with categories
- Filtering system (All, Wallets, Belts, Bags, Accessories, Shoes)
- Add to cart and favorites functionality
- Product ratings and pricing

### Promotion (`/promotion`)
- Business statistics dashboard
- Ad package options (Banner & Video ads)
- Upload functionality for new ads
- Package filtering and purchase options

## Design Features

- **Mobile-First**: Optimized for mobile devices (320px+)
- **Responsive**: Adapts to tablet and desktop screens
- **Smooth Animations**: CSS transitions for better UX
- **Modern Color Scheme**: Warm tones with strategic use of accent colors
- **Touch-Friendly**: Large tap targets for mobile usability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
