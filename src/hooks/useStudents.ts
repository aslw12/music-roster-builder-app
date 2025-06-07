
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student } from '@/types/Student';
import { useToast } from '@/hooks/use-toast';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) {
        console.error('Error fetching students:', error);
        toast({
          title: "Error",
          description: "Failed to fetch students.",
          variant: "destructive",
        });
        return;
      }

      // Type assertion to ensure skill_level matches our Student interface
      setStudents((data || []) as Student[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'registered_at'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

      if (error) {
        console.error('Error adding student:', error);
        toast({
          title: "Error",
          description: "Failed to add student.",
          variant: "destructive",
        });
        return null;
      }

      // Type assertion for the returned data
      const newStudent = data as Student;
      setStudents(prev => [newStudent, ...prev]);
      toast({
        title: "Success!",
        description: `${studentData.name} has been registered.`,
      });
      return newStudent;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        toast({
          title: "Error",
          description: "Failed to update student.",
          variant: "destructive",
        });
        return null;
      }

      // Type assertion for the returned data
      const updatedStudent = data as Student;
      setStudents(prev => prev.map(student => 
        student.id === id ? updatedStudent : student
      ));
      toast({
        title: "Success!",
        description: "Student updated successfully.",
      });
      return updatedStudent;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting student:', error);
        toast({
          title: "Error",
          description: "Failed to delete student.",
          variant: "destructive",
        });
        return false;
      }

      setStudents(prev => prev.filter(student => student.id !== id));
      toast({
        title: "Success!",
        description: "Student deleted successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents
  };
};
