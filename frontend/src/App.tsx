import { CssBaseline } from '@mui/material';
import { HomeLayout } from 'layouts/home';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { BandView } from 'views/band';
import { DashboardView } from 'views/dashboard';
import { FestivalView } from 'views/festival';
import { LoginView } from 'views/login';
import { UserView } from 'views/user';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomeLayout />}>
            <Route index element={<DashboardView />} />
            <Route path='festival/:id' element={<FestivalView />} />
            <Route path='user/:id' element={<UserView />} />
            <Route path='band/:id' element={<BandView />} />
          </Route>
          <Route path='/login' element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
