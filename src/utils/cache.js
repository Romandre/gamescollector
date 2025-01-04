import NodeCache from "node-cache";

// Create a cache instance with a default TTL of 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const setCache = (key, value, ttl = null) => {
  cache.set(key, value, ttl); // Optionally pass a specific TTL for this key
};

export const getCache = (key) => {
  return cache.get(key);
};

export const deleteCache = (key) => {
  cache.del(key);
};

export default cache;
