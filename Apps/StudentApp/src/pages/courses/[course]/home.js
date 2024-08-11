import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import CourseLayout from 'src/layouts/CourseLayout';

const CourseHome = () => {
  const router = useRouter();
  const courseName = decodeURIComponent(router.query.course || '');

  return (
    <CourseLayout>
      <Typography variant="h4">{courseName} - Home</Typography>
      我恨你
    </CourseLayout>
  );
};

export default CourseHome;
