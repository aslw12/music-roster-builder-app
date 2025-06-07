
import React from 'react';
import StudentForm from '@/components/StudentForm';
import StudentList from '@/components/StudentList';
import { Separator } from '@/components/ui/separator';
import { useStudents } from '@/hooks/useStudents';

const Index = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Music School Registration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to our music program! Register today and embark on your musical journey with our expert instructors.
          </p>
        </div>

        {/* Registration Form */}
        <div className="mb-12">
          <StudentForm onAddStudent={addStudent} />
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mb-12">
          <Separator className="flex-1 max-w-xs" />
          <span className="px-4 text-muted-foreground font-medium">Our Students</span>
          <Separator className="flex-1 max-w-xs" />
        </div>

        {/* Student List */}
        <div className="mb-8">
          <StudentList 
            students={students} 
            loading={loading}
            onUpdateStudent={updateStudent}
            onDeleteStudent={deleteStudent}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-12">
          <p>All student data is now stored securely in Supabase with real-time updates!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
