import axios from 'axios';
import { type IAthlete } from '../../domain/types/IAthlete';
import { type IMetric } from '../../domain/types/IMetric';

const API_URL = 'http://localhost:3000/api/v1/athletes';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

export const athleteService = {
  getAthletes: async (): Promise<IAthlete[]> => {
    const { data } = await apiClient.get('');
    return data;
  },

  getAthlete: async (id: string): Promise<IAthlete> => {
    const { data } = await apiClient.get(`/${id}`);
    return data;
  },

  saveAthlete: async (athlete: IAthlete): Promise<IAthlete> => {
    const method = athlete.id ? 'put' : 'post';
    const athleteUrl = athlete.id ? `/${athlete.id}` : '';
    const { data } = await apiClient[method](athleteUrl, athlete);
    return data;
  },

  deleteAthlete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },

  getMetrics: async (athleteId: string): Promise<IMetric[]> => {
    const { data } = await apiClient.get(`/${athleteId}/metrics`);
    return data;
  },

  addMetric: async (metric: IMetric): Promise<IMetric> => {
    const { data } = await apiClient.post(
      `/${metric.athleteId}/metrics`,
      metric
    );
    return data;
  },
};
