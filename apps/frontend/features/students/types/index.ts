export type Student = {
  id: number;
  name: string;
  startYear: number;
  nue: string;
  status: 'active' | 'graduated';
  graduationAverage: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ImportStudentsResponse = {
  message: string;
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    errors: string[];
  }>;
};
