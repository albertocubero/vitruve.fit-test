import axios from 'axios';
import { type Athlete } from '../types/Athlete';
import { type Metric } from '../types/Metric';

const API_URL = 'http://localhost:3000/api/v1/athletes';

export const athleteService = {
  getAthletes: async (): Promise<Athlete[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getAthlete: async (id: string): Promise<Athlete> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  saveAthlete: async (athlete: Athlete): Promise<Athlete> => {
    if (athlete.id) {
      const response = await axios.put(`${API_URL}/${athlete.id}`, athlete);
      return response.data;
    }
    const response = await axios.post(API_URL, athlete);
    return response.data;
  },
  deleteAthlete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
  getMetrics: async (athleteId: string): Promise<Metric[]> => {
    const response = await axios.get(`${API_URL}/${athleteId}/metrics`);
    return response.data;
  },
  addMetric: async (metric: Metric): Promise<Metric> => {
    const response = await axios.post(`${API_URL}/${metric.athleteId}/metrics`, metric);
    return response.data;
  },
};
