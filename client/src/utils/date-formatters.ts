// src/utils/date-formatters.ts
import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(new Date(date), 'MMMM d, yyyy');
};

export const formatDateTime = (date: Date): string => {
  return format(new Date(date), 'MMMM d, yyyy h:mm a');
};