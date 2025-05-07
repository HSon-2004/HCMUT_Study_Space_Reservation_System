# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Cấu trúc thư mục
```bash
frontend/
├── public/
│   ├── favicon.svg
│   ├── vite.svg
│   └── images
│       ├── background_hcmut.jpg
│       └── logohcmut.png
├── src/
│   ├── assets/
│   │   └── vite.svg
│   ├── components/
│   │   ├── PrivateRoute.tsx        # Component for private route
│   │   ├── RoomCard.tsx       # Component for room card  
│   │   ├── RoomModal.tsx    # Component for room modal
│   │   └── UserMenu.tsx    # Component for user menu
│   ├── pages/
│   │   ├── AdminPage.tsx       # Admin page
│   │   ├── BookingPage.tsx     # Booking page
│   │   ├── CancellingPage.tsx       # Cancelling page         
│   │   ├── CheckinoutPage.tsx      # Checkinout page
│   │   ├── ConfirmPage.tsx     # Confirm page
│   │   ├── HomePage.tsx      # Home page
│   │   ├── Login.tsx      # Login page 
│   │   ├── MyReservations.tsx        # My reservations page
│   │   ├── QRcode.tsx      # QR code page  
│   │   ├── Register.tsx    # Register page 
│   │   └── Welcome.tsx     # Welcome page
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Cấu trúc API
```
GET    /api/rooms                     - Get all rooms
GET    /api/rooms/:id                 - Get room details
POST   /api/rooms/create              - Create a new room
PUT    /api/rooms/:id/update          - Update room details
DELETE /api/rooms/:id                 - Delete a room

GET    /api/users                     - Get all users (admin only)
GET    /api/users/:id                 - Get user details
POST   /api/users/create              - Create a new user (admin only)
PUT    /api/users/:id/update          - Update user details
DELETE /api/users/:id                 - Delete a user

POST   /api/login                     - User login
POST   /api/signup                    - User registration

GET    /api/bookings                  - Get user's bookings
GET    /api/bookings/all              - Get all bookings (admin only)
GET    /api/bookings/:id              - Get booking details
POST   /api/bookings/create           - Create a new booking
PUT    /api/bookings/:id/update       - Update booking
DELETE /api/bookings/:id              - Cancel/delete booking
POST   /api/bookings/:id/checkin      - Check-in for booking
```
