// views/student-document/filterOptions.js

import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, useTheme} from '@mui/material'

const FilterOptions = ({ selectedClass, handleClassChange, selectedGrade, handleGradeChange }) => {
    const theme = useTheme()  // Get the current theme
    return (
        <Box mb={4} display="flex" flexDirection="column" >
           <Typography
            variant="h6"
            gutterBottom
            sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,  // Adjust color based on the theme
            }}
            >
                筛选
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>班级</InputLabel>
                <Select value={selectedClass} onChange={handleClassChange} label="班级">
                    <MenuItem value="">
                    <em>全部</em>
                    </MenuItem>
                    <MenuItem value="A1">A1</MenuItem>
                    <MenuItem value="B2">B2</MenuItem>
                    <MenuItem value="C3">C3</MenuItem>
                    {/* Add more class options here */}
                </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>年级</InputLabel>
                <Select value={selectedGrade} onChange={handleGradeChange} label="年级">
                    <MenuItem value="">
                    <em>全部</em>
                    </MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    {/* Add more grade options here */}
                </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default FilterOptions
