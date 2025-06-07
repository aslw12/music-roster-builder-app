
import React, { useState } from 'react';
import { Student } from '@/types/Student';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditStudentDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Student>) => Promise<Student | null>;
}

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
  student,
  open,
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    instrument: student?.instrument || '',
    skill_level: student?.skill_level || 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced'
  });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        instrument: student.instrument,
        skill_level: student.skill_level
      });
    }
  }, [student]);

  const handleSave = async () => {
    if (!student) return;

    setSaving(true);
    const result = await onSave(student.id, formData);
    setSaving(false);

    if (result) {
      onOpenChange(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillLevelChange = (value: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setFormData(prev => ({
      ...prev,
      skill_level: value
    }));
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email Address</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-instrument">Instrument</Label>
            <Input
              id="edit-instrument"
              value={formData.instrument}
              onChange={(e) => handleInputChange('instrument', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-skill-level">Skill Level</Label>
            <Select value={formData.skill_level} onValueChange={handleSkillLevelChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
