import axios from 'axios';
import { type Athlete } from '../types/Athlete';
import { type Metric } from '../types/Metric';

const API_URL = 'http://localhost:3000/api/v1/athletes';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

export const athleteService = {
  getAthletes: async (): Promise<Athlete[]> => {
    const { data } = await apiClient.get('');
    return data;
  },
  
  getAthlete: async (id: string): Promise<Athlete> => {
    const { data } = await apiClient.get(`/${id}`);
    return data;
  },
  
  saveAthlete: async (athlete: Athlete): Promise<Athlete> => {
    const method = athlete.id ? 'put' : 'post';
    const athleteUrl = athlete.id ? `/${athlete.id}` : '';
    const { data } = await apiClient[method](athleteUrl, athlete);
    return data;
  },
  
  deleteAthlete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
  
  getMetrics: async (athleteId: string): Promise<Metric[]> => {
    const { data } = await apiClient.get(`/${athleteId}/metrics`);
    return data;
  },
  
  addMetric: async (metric: Metric): Promise<Metric> => {
    const { data } = await apiClient.post(`/${metric.athleteId}/metrics`, metric);
    return data;
  },
};
