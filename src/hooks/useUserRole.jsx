import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading: roleLoading, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      console.log('Fetching user info for:', user.email);
      const res = await axiosSecure.get(`/users/${user.email}`);
      console.log('User info response:', res.data);
      return res.data;
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
