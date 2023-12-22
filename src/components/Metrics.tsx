import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardHeader, Chip, Link } from '@mui/material';
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EastIcon from '@mui/icons-material/East';



const Metrics: React.FC<{ title: string, count: number, adornment: string ,percentage:number, extra: string, isProgress: boolean  }> = ({ title, count, adornment ,percentage, extra, isProgress }) => {
  return (
    <Card variant="outlined">
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
        </Typography>
      <Box display="flex" alignItems="center" ><Typography variant="h5" component="div">
        {count} {adornment}
      </Typography>
      <Chip
        variant="filled"
        color={isProgress ? "primary" : "warning"}    
        icon={
          <>
            {isProgress ? <MovingIcon style={{ fontSize: '0.75rem', color: 'inherit' }} /> : <TrendingDownIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />}
          </>
        }
        label={`${percentage}%`}
        sx={{ ml: 1.25, pl: 1 }}
        size="small"
          />  </Box>
        
      <Typography color="text.secondary">
        {extra} more since last time!
      </Typography>
      </CardContent>
      <CardActions>
        <Button  variant="text" >Check Detailed Metrics<EastIcon /> </Button>
      </CardActions>
    </Card>
  )
}

export default Metrics