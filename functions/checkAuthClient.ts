import {useRouter} from 'next/router'

const withAuth = Component => {
    const Auth = (props: any) => {
        const accessToken = localStorage.getItem('access_token')
        const router = useRouter()
        if(accessToken !== null) {
            return (
                <Component {...props} />
              );
        } else {
            router.replace("/");
            return null;
        }
    };
    return Auth;
  };
  
  export default withAuth;