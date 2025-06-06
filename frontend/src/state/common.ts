type SuccessfulLoadingStatus = 'successful';
type EmptyLoadingStatus = 'idle' | 'pending';
type FailedLoadingStatus = 'failed';

type LoadingDataError = { message: string };

export type LoadingStatus =
  | SuccessfulLoadingStatus
  | EmptyLoadingStatus
  | FailedLoadingStatus;

export type DataSelector<DataType> =
  | {
      data: null;
      loading: EmptyLoadingStatus;
      error: null;
    }
  | {
      data: DataType;
      loading: SuccessfulLoadingStatus;
      error: null;
    }
  | {
      data: null;
      loading: FailedLoadingStatus;
      error: LoadingDataError;
    };

export type DetailDataSelector<DataType> =
  | {
      data: null;
      loading: EmptyLoadingStatus;
      error: null;
    }
  | {
      data: DataType | null;
      loading: SuccessfulLoadingStatus;
      error: null;
    }
  | {
      data: null;
      loading: FailedLoadingStatus;
      error: LoadingDataError;
    };
