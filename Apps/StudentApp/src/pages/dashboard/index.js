import { useEffect, useState } from 'react';
import axios from 'axios';
import { useProfile } from 'src/@core/context/settingsContext';
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Trophy from 'src/views/dashboard/Trophy'
import ToDoList from 'src/views/dashboard/ToDoList'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import RadarChart from 'src/views/dashboard/RadarChart' 

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
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ToDoList />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarChart /> 
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard