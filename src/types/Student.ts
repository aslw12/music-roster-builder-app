
export interface Student {
  id: string;
  name: string;
  email: string;
  instrument: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  registeredAt: Date;
}
