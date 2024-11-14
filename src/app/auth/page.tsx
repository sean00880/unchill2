// src/app/auth/page.tsx
import AuthForm from '../../components/AuthForm';

export default function AuthPage({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`dashboard main-content min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-dark' : 'bg-light'} text-white`}>
      <AuthForm isDarkMode={isDarkMode} />
    </div>
  );
}