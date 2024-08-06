// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardImgTop from 'src/views/cards/CardImgTop'

const course = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>课堂</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="语文" 
                    body="床前明月光，疑是地上霜。举头望明月，低头思故乡" 
                    color="lightblue"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="数学" 
                    body="我们规定两人轮流做一个工程是指，第一个人先做一个小时，第二个人做一个小时，然后再由第一个人做一个小时，然后又由第二个人做一个小时，如此反复，做完为止。如果甲、乙轮流做一个工程需要9.8小时，而乙、甲轮流做同样的工程只需要9.6小时，那乙单独做这个工程需要多少小时?" 
                    color="lightgreen"
                />
            </Grid>
        </Grid>
    );
}

export default course;