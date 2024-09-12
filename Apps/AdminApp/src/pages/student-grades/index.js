// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icon Imports
import Icon from '@mdi/react'
import { mdiBookEducationOutline, mdiHumanGreeting } from '@mdi/js';

// ** Tabs Imports 
import TabStandardGrades from 'src/views/student-grades/TabStandardGrades'
import TabQualityEducation from 'src/views/student-grades/TabQualityEducation'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

  
const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
}))

const StudentGrades = () => {
    // ** State
    const [value, setValue] = useState('standard-grades')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

      
    return (
        <Card>
            <TabContext value={value}>
                <TabList
                onChange={handleChange}
                aria-label='student-grades tabs'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                <Tab
                    value='standard-grades'
                    label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon path={mdiBookEducationOutline} size={1} />
                        <TabName>标准成绩</TabName>
                    </Box>
                    }
                />
                <Tab
                    value='quality-education'
                    label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon path={mdiHumanGreeting} size={1} />
                        <TabName>素质教育</TabName>
                    </Box>
                    }
                />
                </TabList>

                <TabPanel sx={{ p: 0 }} value='standard-grades'>
                <TabStandardGrades />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='quality-education'>
                <TabQualityEducation />
                </TabPanel>
            </TabContext>
        </Card>
    )
}

export default StudentGrades