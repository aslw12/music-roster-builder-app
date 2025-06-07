
export interface Student {
  id: string;
  name: string;
  email: string;
  instrument: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced';
  registered_at: string;
}
