// ** React Imports
import React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

const SelectionSection = ({ examSession, grade, onExamSessionChange, onGradeChange }) => {
  const [subject, setSubject] = useState('总分') // Default value for '科目'
  const [errors, setErrors] = useState({ examSession: false, grade: false })

  // Handlers for select changes
  const handleExamSessionChange = (event) => {
    const value = event.target.value;
    onExamSessionChange(value);
    setErrors({ ...errors, examSession: !value }); // Update error state
  }

  const handleGradeChange = (event) => {
    const value = event.target.value;
    onGradeChange(value);
    setErrors({ ...errors, grade: !value }); // Update error state
  }

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  return (
    <Box display="flex" gap={2} sx={{ m: 4 }}>
      {/* Exam Session Select */}
      <FormControl variant="outlined" size="small" required error={errors.examSession}>
        <InputLabel>考试场次</InputLabel>
        <Select value={examSession} onChange={handleExamSessionChange} label="考试场次">
            <MenuItem value=""><em>请选择考试场次</em></MenuItem> {/* Placeholder option */}
            <MenuItem value="2024春">2024春</MenuItem>
            <MenuItem value="2025夏">2025夏</MenuItem>
            <MenuItem value="2025秋">2025秋</MenuItem>
            <MenuItem value="2025冬">2025冬</MenuItem>
        </Select>
        {errors.examSession && <FormHelperText>考试场次是必选项</FormHelperText>}
      </FormControl>

      {/* Grade Select */}
      <FormControl variant="outlined" size="small" required error={errors.grade}>
        <InputLabel>年级</InputLabel>
        <Select value={grade} onChange={handleGradeChange} label="年级">
          <MenuItem value=""><em>请选择年级</em></MenuItem> {/* Placeholder option */}
          <MenuItem value="1年级">1年级</MenuItem>
          <MenuItem value="2年级">2年级</MenuItem>
          <MenuItem value="3年级">3年级</MenuItem>
        </Select>
        {errors.grade && <FormHelperText>年级是必选项</FormHelperText>}
      </FormControl>

      {/* Subject Select */}
      <FormControl variant="outlined" size="small">
        <InputLabel>科目</InputLabel>
        <Select value={subject} onChange={handleSubjectChange} label="科目">
            <MenuItem value="总分">总分</MenuItem>
            <MenuItem value="数学">数学</MenuItem>
            <MenuItem value="语文">语文</MenuItem>
            <MenuItem value="英语">英语</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectionSection
