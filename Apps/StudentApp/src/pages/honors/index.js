import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Honors Components
import HonorsCard from 'src/views/honors/honorsCard'
import AwardCard from 'src/views/honors/awardsCard'
import LevelingCard from 'src/views/honors/leveingCard'

const HonorsPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <HonorsCard />
        </Grid>

        <Grid item xs={12} md={12}>
          <AwardCard />
        </Grid>

        <Grid item xs={12} md={12}>
          <LevelingCard />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default HonorsPage
