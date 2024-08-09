// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardImgTop from 'src/views/cards/CardImgTop'

const truncateTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '50px'  // Adjust this height as needed
}

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
                    bodyStyle={truncateTextStyle}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="数学" 
                    body="我们规定两人轮流做一个工程是指，第一个人先做一个小时，第二个人做一个小时，然后再由第一个人做一个小时，然后又由第二个人做一个小时，如此反复，做完为止。如果甲、乙轮流做一个工程需要9.8小时，而乙、甲轮流做同样的工程只需要9.6小时，那乙单独做这个工程需要多少小时?" 
                    color="lightgreen"
                    bodyStyle={truncateTextStyle}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="体育" 
                    body="樊振东全满贯！！！小胖牛逼" 
                    color="lightyellow"
                    bodyStyle={truncateTextStyle}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="艺术" 
                    body="艺术是人类精神文明的重要组成部分，是人类文明的重要标志之一。"
                    color="violet"
                    bodyStyle={truncateTextStyle}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardImgTop 
                    title="历史" 
                    body="历史是人类社会发展的过程，是人类社会发展的产物。"
                    color="lightPink "
                    bodyStyle={truncateTextStyle}
                />
            </Grid>
        </Grid>
    );
}

export default course;