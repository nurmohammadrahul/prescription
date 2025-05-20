import AnimatedBackground from "../shared/Login/AnimatedBackground";
import RegisterForm from "../shared/Register/RegisterForm";


const Register = () => {
    return (
        <AnimatedBackground>
            <div className="flex items-center justify-center min-h-screen p-4">
                <RegisterForm />
            </div>
        </AnimatedBackground>
    );
};
export default Register;