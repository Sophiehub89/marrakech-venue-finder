import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

class Cache {
  private storage = new Map<string, CacheItem<any>>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Clean expired items
    this.cleanup();

    // Remove oldest item if cache is full
    if (this.storage.size >= this.maxSize) {
      const oldestKey = this.storage.keys().next().value;
      this.storage.delete(oldestKey);
    }

    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item is expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.storage.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.storage.delete(key);
      }
    }
  }

  size(): number {
    this.cleanup();
    return this.storage.size;
  }
}

// Global cache instance
const globalCache = new Cache();

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
} {
  const [data, setData] = useState<T | null>(() => globalCache.get<T>(key));
  const [loading, setLoading] = useState(!globalCache.has(key));
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetcher();
      
      globalCache.set(key, result, options.ttl);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, options.ttl]);

  const refetch = useCallback(async () => {
    globalCache.delete(key);
    await fetchData();
  }, [key, fetchData]);

  const clearCache = useCallback(() => {
    globalCache.delete(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    if (!globalCache.has(key)) {
      fetchData();
    }
  }, [key, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache
  };
}

// Hook for simple caching without async operations
export function useSimpleCache<T>(
  key: string,
  data: T,
  ttl: number = 5 * 60 * 1000
): T => {
  const [cachedData, setCachedData] = useState<T>(() => {
    const cached = globalCache.get<T>(key);
    return cached !== null ? cached : data;
  });

  useEffect(() => {
    if (data !== cachedData) {
      globalCache.set(key, data, ttl);
      setCachedData(data);
    }
  }, [key, data, cachedData, ttl]);

  return cachedData;
}

// Utility function to clear all cache
export const clearAllCache = (): void => {
  globalCache.clear();
};

// Utility function to get cache size
export const getCacheSize = (): number => {
  return globalCache.size();
}; 