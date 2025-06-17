import { ActionCreator } from '@reduxjs/toolkit';
import { actionUserDidLogout } from './user-slice/actions';

export type LoadingStatus = 'successful' | 'failed' | 'pending' | 'initial';

export class ApiError extends Error {
  error_status: number;
  error_message: string;

  constructor(message: string, status: number) {
    super(message);
    this.error_message = message;
    this.error_status = status;
  }
}

interface ApiHandlerProps<Data> {
  apiHandler: () => Promise<Data>;
  successAction?: (data: Data) => void;
  failAction: (error: ApiError) => void;
  dispatch: (actionCreator: ReturnType<ActionCreator<any, any>>) => {};
}

export const handleApiCall = async <Data>({
  apiHandler,
  successAction,
  failAction,
  dispatch,
}: ApiHandlerProps<Data>) => {
  try {
    const data = await apiHandler();
    if (successAction) {
      successAction(data);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('error:', error.error_status, error.error_message);
      if (error.error_status === 401) {
        dispatch(actionUserDidLogout());
      }
      failAction(error as ApiError);
    }
  }
};
