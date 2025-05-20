import { useEffect } from 'react';

const AnimatedBackground = ({ children }) => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10 bg-black">
            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500 to-red-500 opacity-50 blur-[100px]"
                style={{
                    animation: 'float1 5s ease-in-out infinite',
                    top: '-10%',
                    left: '-10%',
                }}
            />

            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-50 blur-[100px]"
                style={{
                    animation: 'float2 10s ease-in-out infinite',
                    top: '75%',
                    left: '85%',
                }}
            />

            <div
                className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-800 to-purple-900 opacity-80 blur-[70px]"
                style={{
                    animation: 'float3 6s ease-in-out infinite',
                    top: '45%',
                    left: '20%',
                }}
            />
            <style>
                {`
          @keyframes float1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, 50px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-50px, -50px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(80px, -20px); }
          }
          @keyframes particleFloat {
            0% { 
              transform: translateY(0) translateX(0); 
              opacity: 1; 
            }
            100% { 
              transform: translateY(-100vh) translateX(0); 
              opacity: 0; 
            }
          }
        `}
            </style>
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default AnimatedBackground;
