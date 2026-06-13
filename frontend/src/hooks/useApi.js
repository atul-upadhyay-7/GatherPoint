// useApi hook - Generic API calls
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/apiService';

export default function useApi(initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(async (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}${queryString ? '?' + queryString : ''}`;
    await execute(ApiService.get, url);
  }, []);

  const post = useCallback(async (endpoint, data) => {
    await execute(ApiService.post, endpoint, data);
  }, []);

  const put = useCallback(async (endpoint, id, data) => {
    await execute(ApiService.put, endpoint, id, data);
  }, []);

  const patch = useCallback(async (endpoint, id, data) => {
    await execute(ApiService.patch, endpoint, id, data);
  }, []);

  const remove = useCallback(async (endpoint, id) => {
    await execute(ApiService.delete, endpoint, id);
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    remove,
    execute,
    reset,
  };
}