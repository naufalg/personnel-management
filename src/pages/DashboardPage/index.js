import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { cyan } from '@mui/material/colors';
import { Box } from '@mui/system';
import { CardComponent, Navbar } from 'components';
import { AppContext } from 'context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  nextPageAction,
  prevPageAction,
  searchUser,
  searchUserClear,
} from 'redux/actions/user.action';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';

export default function DashboardPage() {
  const { isMobile, isMedium } = useContext(AppContext);

  const dispatch = useDispatch();
  const { users, isLoading, shownData, activePage } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!users) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  // search
  const [findInput, setFindInput] = useState('');

  const onChangeFind = (e) => {
    setFindInput(e.target.value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (findInput.length === 0) {
      dispatch(searchUserClear());
    }
  }, [findInput]);

  const submitFind = () => {
    dispatch(searchUser(findInput));
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Paper
            sx={{
              marginY: 4,
              padding: 3,
              display: 'flex',
              flexDirection: isMedium ? 'column' : 'row',
              justifyContent: isMedium ? 'center' : 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: isMedium ? '100%' : 'inherit' }}>
              <Typography
                variant='h5'
                sx={{ color: cyan[300], fontWeight: 700 }}
              >
                PERSONNEL LISTS
              </Typography>
              <Typography>List of All Personnel</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMedium ? 'column' : 'row',
                alignItems: 'center',
                width: isMedium ? '100%' : 'inherit',
              }}
            >
              <FormControl
                sx={{ m: 1, width: isMedium ? '100%' : 'inherit' }}
                variant='outlined'
                onSubmit={submitFind}
              >
                <InputLabel>Find Personnel</InputLabel>
                <OutlinedInput
                  onChange={onChangeFind}
                  startAdornment={
                    <InputAdornment position='start'>
                      <IconButton
                        aria-label='toggle password visibility'
                        edge='start'
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Find Personnel'
                />
              </FormControl>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: cyan[300],
                  alignSelf: 'center',
                  height: '100%',
                  width: isMedium ? '100%' : 'inherit',
                }}
                onClick={submitFind}
              >
                ADD PERSONNEL +
              </Button>
            </Box>
          </Paper>
          <Grid container spacing={4}>
            {shownData && !isLoading
              ? shownData.map((item, index) => (
                  <Grid
                    sx={{ width: '100%' }}
                    key={index}
                    item
                    lg={3}
                    md={6}
                    sm={12}
                  >
                    <CardComponent data={item} isLoading={isLoading} />
                  </Grid>
                ))
              : [...Array(4)].map((e, i) => (
                  <Grid
                    sx={{ borderRadius: '10px' }}
                    key={i}
                    item
                    lg={3}
                    md={6}
                    sm={12}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {isMobile ? (
                        <Skeleton
                          variant='rectangular'
                          width={350}
                          height={250}
                        />
                      ) : (
                        <Skeleton
                          variant='rectangular'
                          width={350}
                          height={400}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              fontSize: '14px',
            }}
          >
            <Button
              onClick={() => {
                dispatch(prevPageAction());
              }}
              disabled={activePage === 1 ? true : false}
              sx={{ width: '150px', textAlign: 'left' }}
            >
              <KeyboardArrowLeft />
              Previous Page
            </Button>
            <Button
              onClick={() => {
                dispatch(nextPageAction());
              }}
              sx={{ marginLeft: '10px', width: '150px', textAlign: 'left' }}
              disabled={activePage * 4 === users?.length ? true : false}
            >
              Next Page <KeyboardArrowRight />
            </Button>
          </Box>
        </Container>
      </Navbar>
    </div>
  );
}
