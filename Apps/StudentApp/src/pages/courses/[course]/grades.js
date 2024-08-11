import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import CourseLayout from 'src/layouts/CourseLayout';

const CourseGrades = () => {
  const router = useRouter();
  const courseName = decodeURIComponent(router.query.course || '');

  return (
    <CourseLayout>
      <Typography variant="h4">{courseName} - Grades</Typography>
    </CourseLayout>
  );
};

export default CourseGrades;