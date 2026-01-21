import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Student } from '../types';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      return http.get<Student[]>('/students');
    },
  });
};
