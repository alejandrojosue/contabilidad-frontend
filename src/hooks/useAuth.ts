import {useState} from 'react';

import {confirmResponse} from '../../types/types';
import {fetchDataFromAPI} from '../util/fetchDataFromAPI';
import {returnIP} from '../util/returnIP';

export const useAuth = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const confirmUser = async ({token}: {token: string}) => {
    if (retryCount >= 3) return;
    try {
      setStatus('loading')
      const ip = await returnIP();
      const res = await fetchDataFromAPI({
                    url: '/auth/confirm',
                    method: 'POST',
                    data: {token, ipAddress: ip, channel: 'W'},
                  }) as confirmResponse;


      if (res.error) {
        setMessage(res.error.msg || 'An error occurred during confirmation.');
        setStatus('error');
      }
      else {
        setMessage('Your account has been successfully confirmed! 🎉');
        setStatus('success');
      }
    } catch (error) {
      setMessage('A network error occurred. Please try again.');
      setStatus('error');
    }
  };
  const handleRetry = ({token}: {token: string}) => {
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      confirmUser({token});
    }
  };
  return {handleRetry, retryCount, status, message, confirmUser}
}