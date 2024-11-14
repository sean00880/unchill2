// src/app/auth/page.tsx
import AuthForm from '../../components/AuthForm';

export default function AuthPage() {
  return (
    <div className="dashboard main-content min-h-screen flex items-center justify-center bg-dark text-white">
      <AuthForm isDarkMode={true} /> {/* Pass a boolean or modify this as needed */}
    </div>
  );
}