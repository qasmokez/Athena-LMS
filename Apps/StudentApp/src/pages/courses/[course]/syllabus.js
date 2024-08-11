import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import CourseLayout from 'src/layouts/CourseLayout';

const CourseSyllabus = () => {
  const router = useRouter();
  const courseName = decodeURIComponent(router.query.course || '');

  return (
    <CourseLayout>
      <Typography variant="h4">{courseName} - Syllabus</Typography>
    </CourseLayout>
  );
};

export default CourseSyllabus;