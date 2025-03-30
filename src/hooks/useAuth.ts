import {confirmResponse} from '@type/types';
import {fetchDataFromAPI} from '@util/fetchDataFromAPI';
import {useState} from 'react';

export const useAuth = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [email, setEmail] = useState('');

  const confirmUser = async ({token}: {token: string}) => {
    if (retryCount >= 3) return;
    try {
      setStatus('loading')
      const res = await fetchDataFromAPI({
                    url: '/auth/confirm',
                    method: 'POST',
                    data: {token},
                  }) as confirmResponse;


      if (res.error) {
        setMessage(
            res.error.msg || 'Se produjo un error durante la confirmación.');
        setStatus('error');
      } else {
        setMessage('¡Tu cuenta ha sido confirmada exitosamente! 🎉');
        setStatus('success');
      }
    } catch (error) {
      setMessage('Se produjo un error de red. Inténtalo de nuevo.');
      setStatus('error');
    }
  };
  const handleRetry = ({token}: {token: string}) => {
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      confirmUser({token});
    }
  };

  const verifyTokenResetPassword = async ({token}: {token: string}) => {
    try {
      setStatus('loading')
      const res = await fetchDataFromAPI({
                    url: '/auth/verify-token',
                    method: 'POST',
                    data: {token}
                  }) as confirmResponse;

      if (res.error) {
        setMessage(res.error.msg);
        setStatus('error');
      } else{
        setEmail(res.email)
        setStatus('success');
      }
        
    } catch (error) {
      setMessage('Se produjo un error de red. Inténtalo de nuevo.');
      setStatus('error');
    }
  };

  const recoveryPass =
      async ({password, email}: {password: string, email: string}) => {
    try {
      setStatus('loading')
      setMessage('')
      const res = await fetchDataFromAPI({
                    url: '/auth/password-reset',
                    method: 'POST',
                    data: {email, password},
                  }) as confirmResponse;

      if (res.error) {
        setMessage(res.error.msg);
        setStatus('error');
      }else{
        setStatus('success');
        setMessage('¡Tu contraseña ha sido restablecida exitosamente! 🎉');
      }
    } catch (error) {
      setMessage('Se produjo un error de red. Inténtalo de nuevo.');
      setStatus('error');
    }
  };

  const getAllPermission = async () => {};

  return {
    handleRetry, retryCount, status, message, email, confirmUser,
        verifyTokenResetPassword, recoveryPass
  }
}