import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {}, // পুরো user info আনবে
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data; // e.g. { role: 'user', badge: 'Gold' }
    },
  });

  return {
    role: userInfo.role || 'user',
    badge: userInfo.badge || 'Bronze',
    roleLoading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;
