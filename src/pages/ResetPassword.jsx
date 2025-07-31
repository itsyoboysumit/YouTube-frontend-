import { useSearchParams, useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../components/LogIn/ReseetPasswordForm'

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <ResetPasswordForm token={token} navigate={navigate} />
    </div>
  );
}
