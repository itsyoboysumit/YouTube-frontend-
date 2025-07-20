import { api } from "./api";

export const toggleSubscription = async (channelId) => {
  const res = await api.post(`/v1/subscriptions/c/${channelId}`);
  return res.data;
};

export const getSubscribers = async (subscriberId) => {
  const response = await api.get(`/v1/subscriptions/u/${subscriberId}`);
  return response.data.data; // returns array of subscriber objects
};

export const getSubscribedChannels = async (channelId) => {
  const response = await api.get(`/v1/subscriptions/c/${channelId}`);
  return response.data.data; // returns array of subscribed channel objects
};


