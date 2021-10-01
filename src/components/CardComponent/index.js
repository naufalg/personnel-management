import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import { convertDateDDMMYY } from 'utils/date.utils';
import { AppContext } from 'context/AppContext';
import { useTheme } from '@mui/material/styles';
import { cyan } from '@mui/material/colors';

export default function CardComponent({ data, isLoading }) {
  const theme = useTheme();
  const { isMobile } = useContext(AppContext);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  if (!isLoading && data) {
    return (
      <Card sx={{ minWidth: 275, width: '100%' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Personnel Id:{' '}
            <span style={{ color: cyan[300], fontWeight: 'bold' }}>
              {data.login.uuid.slice(0, 7)}
            </span>
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: matches ? 'column' : 'row',
              justifyContent: isMobile ? 'flex-start' : 'center',
            }}
          >
            <Skeleton
              variant='circular'
              width={isMobile ? 120 : 150}
              height={isMobile ? 120 : 150}
              animation={false}
              sx={{
                marginTop: '10px',
                marginX: isMobile ? 'inherit' : 'auto',
              }}
            />
            <Box
              sx={{
                marginY: isMobile ? 'auto' : '20px',
                marginLeft: '10px',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
              <Typography>
                {data.name.first} {data.name.last}
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Telephone</Typography>
              <Typography>{data.phone}</Typography>
              {!isMobile && (
                <>
                  <Typography sx={{ fontWeight: 'bold' }}>Birthday</Typography>
                  <Typography>{convertDateDDMMYY(data.dob.date)}</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
                  <Typography>{data.email}</Typography>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isMobile ? (
          <Skeleton variant='rectangular' width={400} height={250} />
        ) : (
          <Skeleton variant='rectangular' width={350} height={400} />
        )}
      </Box>
    );
  }
}
