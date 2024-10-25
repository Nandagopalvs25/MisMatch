import React from 'react';

// Number of floating objects
const NUM_OBJECTS = 20;

// Function to generate random positions and animation durations
const getRandomStyle = () => {
    const randomTop = Math.random() * 100; // Random position from 0% to 100%
    const randomLeft = Math.random() * 100; // Random position from 0% to 100%
    const randomDuration = 2 + Math.random() * 4; // Random duration between 2s and 6s
    return {
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        animationDuration: `${randomDuration}s`,
    };
};

const FloatingObjects = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-200 via-yellow-200 to-purple-200 h-screen">
            <div className="absolute inset-0">
                {Array.from({ length: NUM_OBJECTS }).map((_, index) => {
                    const { top, left, animationDuration } = getRandomStyle();
                    return (
                        <div
                            key={index}
                            className="absolute animate-float opacity-70"
                            style={{ top, left, animationDuration }}
                        >
                            <img
                                src="https://img.icons8.com/ios-filled/50/000000/flower.png"
                                alt="Floating Object"
                                className="w-12"
                            />
                        </div>
                    );
                })}
            </div>

            <div className="z-10 text-center">
                <h1 className="text-5xl font-bold text-white">Love is in the Air!</h1>
                <p className="mt-4 text-lg text-white">Enjoy the floating objects in the background.</p>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                .animate-float {
                    animation: float ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default FloatingObjects;
