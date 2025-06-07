
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types/Student';
import { Users, Music2, Award } from 'lucide-react';

interface StudentListProps {
  students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
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
                        className={`${getSkillLevelColor(student.skillLevel)} transition-colors duration-200`}
                      >
                        {student.skillLevel}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  Registered: {student.registeredAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentList;
