import AnimatedBackground from "../shared/Login/AnimatedBackground";
import LoginForm from "../shared/Login/LoginForm";


const Login = () => {
    return (
        <AnimatedBackground>
            <div className="flex items-center justify-center min-h-screen p-4">
                <LoginForm />
            </div>
        </AnimatedBackground>
    );
};
export default Login;