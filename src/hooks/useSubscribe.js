import { useEffect, useState, useContext } from 'react';
import { getSubscribers, getSubscribedChannels } from '../services/subscription';
import  AuthContext from '../context/AuthContext';

const useSubscribe = () => {
  const { user } = useContext(AuthContext);
  const [subscribers, setSubscribers] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchAll = async () => {
      try {
        const [subscribersData, subscribedData] = await Promise.all([
          getSubscribers(user._id), 
          getSubscribedChannels(user._id), 
        ]);
        setSubscribers(subscribersData.map(item => item.subscriber) || []);
        setSubscribedChannels(subscribedData.map(item => item.channel) || []);
      } catch (err) {
        console.error('Failed to fetch subscribe data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user?._id]); 
  return { subscribers, subscribedChannels, loading };
};

export default useSubscribe;
