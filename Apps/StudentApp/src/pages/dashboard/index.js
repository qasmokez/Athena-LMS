import { useEffect, useState } from 'react';
import axios from 'axios';
import { useProfile } from 'src/@core/context/settingsContext';
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Welcome from 'src/views/dashboard/Welcome'
import ToDoList from 'src/views/dashboard/ToDoList'
import HonorsCard from 'src/views/dashboard/HonorsCard'
import RadarChart from 'src/views/dashboard/RadarChart' 
import RecentFeedback from 'src/views/dashboard/RecentFeedback'

const Dashboard = () => {
  const { profile, setProfile } = useProfile();
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3011/v0/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [setProfile]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Welcome />
        </Grid>
        <Grid item xs={12} md={8}>
          <HonorsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ToDoList />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RecentFeedback />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard