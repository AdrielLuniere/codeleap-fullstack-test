# CodeLeap Network

A clean and professional social networking interface built for the CodeLeap coding test.

## Tech Stack

- **Frontend**: React (Vite)
- **State Management**: React Query (TanStack Query)
- **API Client**: Axios
- **Styling**: Vanilla CSS (Modern & Responsive)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Features

- [x] **User Login**: Simple username-based entry (stored in LocalStorage).
- [x] **Post Creation**: Form to share thoughts with title and content.
- [x] **Infinite Scroll**: Automated pagination for seamless browsing.
- [x] **CRUD Operations**: Fully functional Create, Read, Update, and Delete actions.
- [x] **Responsive Design**: Optimized for mobile and desktop views.
- [x] **Smooth Animations**: Glassmorphism effects and micro-interactions.

## API Integration

The application integrates with the CodeLeap Careers API:
`https://dev.codeleap.co.uk/careers/`

**Important**: All requests are automatically configured to include a trailing slash `/` via Axios interceptors.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd codeleap-fullstack-test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment

The project is ready to be deployed on **Vercel**. Simply connect the repository to Vercel, and it will automatically detect the Vite configuration.

---

Developed as part of the CodeLeap Fullstack Test.
