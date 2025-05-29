# 🧠 Project Preferences

## 🔧 Tech Stack
- **Frontend**: React 18 + Create React App  
- **Styling**: Tailwind CSS v3.4.0
- **Component Library**: Custom components with Tailwind
- **State Management**: Custom hooks with Local Storage
- **Language**: TypeScript
- **Icons**: Custom SVG components with Lucide React

## 🎨 UI & Code Style
- Use **functional components**
- Use **arrow functions** consistently
- Prefer **single quotes** for strings
- Always write **responsive** UI with Tailwind
- Avoid inline styles; use Tailwind utilities or custom CSS classes
- Dark/Light mode support with 'class' strategy

## 📁 Folder Structure Conventions
- `/components`: UI components organized by feature
  - `/Dashboard`: Main dashboard and summary components
  - `/Forms`: Transaction forms and modals
  - `/Layout`: Header and layout components
  - `/Transactions`: Transaction list and related components
- `/hooks`: Custom React hooks (useFinanceTracker)
- `/utils`: Utility functions (constants, helpers, storage)
- `/types`: TypeScript type definitions

## 🏦 Finance Tracker Specifics
- **Data Persistence**: Local Storage API
- **Categories**: Predefined income/expense categories
- **Features**: Transaction CRUD, monthly navigation, filtering, dark mode
- **Primary Colors**: Blue theme (primary-500 to primary-700)
- **Responsive**: Mobile-first design approach

## 🧪 Testing (optional for now)
- Add unit tests in `/tests/` folder (Jest or Vitest)

## ⚙️ Dev Preferences
- Use `npm` (not yarn)
- Create React App scripts: start, build, test, eject
- ESLint with React App configuration

## 🔧 Build Status
- ✅ All dependencies installed
- ✅ Builds successfully with minor warning (fixed)
- ✅ TypeScript compilation working
- ✅ Tailwind CSS properly configured
- ✅ Development server starts on alternative port

## 📚 Current Implementation
- Complete transaction management system
- Working dark/light mode toggle
- Monthly data filtering and navigation
- Local storage persistence
- Responsive UI components
- Form validation and error handling

## 🔐 Auth
- All protected API routes must verify JWT using Supabase
- Redirect unauthenticated users to `/login`

## 📚 Docs Maintenance
- Update `backend-flow.md` for every new API
- Update `frontend-flow.md` for every new UI interaction or client call
