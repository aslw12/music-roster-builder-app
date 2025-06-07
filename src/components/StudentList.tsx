
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/Student';
import { Users, Music2, Award, Edit, Trash2 } from 'lucide-react';
import EditStudentDialog from './EditStudentDialog';

interface StudentListProps {
  students: Student[];
  loading?: boolean;
  onUpdateStudent: (id: string, updates: Partial<Student>) => Promise<Student | null>;
  onDeleteStudent: (id: string) => Promise<boolean>;
}

const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  loading, 
  onUpdateStudent, 
  onDeleteStudent 
}) => {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const getSkillLevelColor = (skillLevel: string) => {
    switch (skillLevel) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      await onDeleteStudent(student.id);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading students...</p>
        </CardContent>
      </Card>
    );
  }

  if (students.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl text-muted-foreground">No Students Registered Yet</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Be the first to register for our music program!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <Users className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl">
              Registered Students ({students.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={student.id}
                className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-blue-300 bg-gradient-to-r from-white to-gray-50"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {student.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {student.email}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Music2 className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{student.instrument}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-purple-500" />
                        <Badge 
                          variant="secondary" 
                          className={`${getSkillLevelColor(student.skill_level)} transition-colors duration-200`}
                        >
                          {student.skill_level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground text-right mr-4">
                      Registered: {new Date(student.registered_at).toLocaleDateString()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(student)}
                      className="hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(student)}
                      className="hover:bg-red-50 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditStudentDialog
        student={editingStudent}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={onUpdateStudent}
      />
    </>
  );
};

export default StudentList;
