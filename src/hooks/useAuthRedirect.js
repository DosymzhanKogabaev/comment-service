import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const userToken = localStorage.getItem('user');
    const companyToken = localStorage.getItem('company');
    useEffect(() => {
        if (userToken) {
            navigate('/user-profile-page');
        }
        else if(companyToken) {
            navigate('/company-profile-page');
        }
    }, [navigate, token]);
};

export default useAuthRedirect;
