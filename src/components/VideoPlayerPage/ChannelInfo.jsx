// src/components/VideoPlayerPage/ChannelInfo.jsx
import {toast} from 'react-hot-toast';
import {useAuth} from '../../hooks/useAuth';
import {getSubscribers} from '../../services/subscription';
import {useState, useEffect} from 'react';


const ChannelInfo = ({ owner }) => {
    const {user} = useAuth();
    const [subscribersCount, setSubscriberscount] = useState(0);

    useEffect(() => {
        const fetchSubscribersCount = async () => {
           try{
            if(!owner?._id) return;
            const subscribers = await getSubscribers(owner?._id);
            setSubscriberscount(subscribers.length);
           }catch(err){
                console.error("Error fetching subscribers count:", err);  
                setSubscriberscount(0);
           }
        };
        fetchSubscribersCount();
    }, [owner?._id]);

    const subscribeHandler = async () =>{
      if(!user){
        toast("Please login to subscribe");
        return;
      }
    }
  return (
    <div className="flex items-center justify-between mt-6 border-b border-gray-700 pb-4">
      <div className="flex items-center gap-4">
        <img
          src={owner?.avatar || 'https://i.pravatar.cc/40'}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-base">{owner?.username || 'Unknown'}</h2>
          <p className="text-sm text-gray-400">{`Subscribers: ${subscribersCount}`}</p>
        </div>
      </div>
      <button className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition"
        onClick ={subscribeHandler}>
        Subscribe
      </button>
    </div>
  );
};

export default ChannelInfo;
