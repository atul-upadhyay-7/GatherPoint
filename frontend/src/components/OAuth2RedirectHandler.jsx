import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { syncAuthState } from '../hooks/useAuth';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'customer') {
      navigate('/oauth2/error', { replace: true });
      return;
    }

    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const role = searchParams.get('role');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, name, role, token }));
      syncAuthState();
      const homeRoute = role === 'ADMIN' ? '/admin/dashboard' : '/pos';
      navigate(homeRoute, { replace: true });
    } else {
      navigate('/staff-pos', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020403]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]" />
    </div>
  );
}
