import { useParams } from 'react-router';

type UserViewURLProps = {
  id: string;
};

export const UserView = () => {
  const { id } = useParams<UserViewURLProps>();

  return <div>User view {id}</div>;
};
