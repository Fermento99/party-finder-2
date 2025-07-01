import { Alert, LinearProgress } from '@mui/material';
import { ReactElement } from 'react';
import { LoadingStatus } from 'state/common';

interface LoadingHandlerProps {
  loading: LoadingStatus;
  children: ReactElement;
}

export const LoadingHandler = ({ children, loading }: LoadingHandlerProps) => (
  <>
    {loading === 'successful' && children}
    {(loading === 'pending' || loading === 'initial') && <LinearProgress />}
    {loading === 'failed' && <ErrorView />}
  </>
);

const ErrorView = () => <Alert severity='error'>Something went wrong</Alert>;
