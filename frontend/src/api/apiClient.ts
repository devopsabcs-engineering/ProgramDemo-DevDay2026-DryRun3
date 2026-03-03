import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Types for API responses
export interface ProgramType {
  id: number;
  typeName: string;
  typeNameFr: string;
}

export interface ProgramResponse {
  id: number;
  programName: string;
  programDescription: string;
  programType: ProgramType;
  status: string;
  reviewerComments: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramCreateRequest {
  programName: string;
  programDescription: string;
  programTypeId: number;
  submitterEmail: string;
}

// API functions
export const fetchProgramTypes = async (): Promise<ProgramType[]> => {
  const response = await apiClient.get<ProgramType[]>('/program-types');
  return response.data;
};

export const submitProgram = async (
  data: ProgramCreateRequest
): Promise<ProgramResponse> => {
  const response = await apiClient.post<ProgramResponse>('/programs', data);
  return response.data;
};

export const fetchPrograms = async (): Promise<ProgramResponse[]> => {
  const response = await apiClient.get<ProgramResponse[]>('/programs');
  return response.data;
};

export const fetchProgram = async (id: number): Promise<ProgramResponse> => {
  const response = await apiClient.get<ProgramResponse>(`/programs/${id}`);
  return response.data;
};
