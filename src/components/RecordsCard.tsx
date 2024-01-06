import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardHeader, Chip, Link} from '@mui/material';
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EastIcon from '@mui/icons-material/East';

import { Link as RRDLink } from "react-router-dom"



const RecordsCard: React.FC<{ title: string, count: number, adornment: string, isProgress: boolean, prDate: string, actionLink: string }>
  = ({ title, count, adornment, isProgress, prDate, actionLink }) => {
  return (
    <Card variant="outlined">
      <CardContent>
      <Typography sx={ {typography: {xs: "h6", sm: "h6",}} } color="text.secondary" gutterBottom>
        {title}
        </Typography>
      <Box display="flex" alignItems="center" ><Typography sx={ {typography: {xs: "h5", sm: "h5",}} } component="div">
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
        label={`Achieved on ${prDate}`}
        sx={{ ml: 1.25, pl: 1 }}
        size="small"
          />
        </Box>
        
      </CardContent>
      <CardActions>
        <RRDLink to={actionLink}><Button size='small' variant="text">Details of this exercise</Button></RRDLink>
      </CardActions>
    </Card>
  )
}

export default RecordsCard