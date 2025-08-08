/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { Line } from 'recharts';

export function HomePage() {
    const { rive, RiveComponent } = useRive({
    src: '/login_screen_character.riv', // Path to .riv file in public folder
    stateMachines: 'idle', // Replace with your state machine name
    autoplay: true, // Auto-play the animation
  });

  // State machine inputs (replace names with exact ones from Rive Editor)
  const idleInput = useStateMachineInput(rive, 'LoginStateMachine', 'Idle'); // Boolean or trigger for Idle
  const handsUpInput = useStateMachineInput(rive, 'LoginStateMachine', 'Hands Up'); // Trigger for Hands Up
  const successInput = useStateMachineInput(rive, 'LoginStateMachine', 'Success'); // Trigger for Success
  const lookUpInput = useStateMachineInput(rive, 'LoginStateMachine', 'LookUp'); // Trigger or number for LookUp
  const lookDownInput = useStateMachineInput(rive, 'LoginStateMachine', 'LookDown'); // Trigger or number
  const lookIdleInput = useStateMachineInput(rive, 'LoginStateMachine', 'LookIdle');

  // State to track login status
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Handle button click with animation
  const handleButtonClick = () => {
    if (handsUpInput) {
      handsUpInput.fire(); // Trigger Hands Up (for trigger inputs)
      setIsLoggingIn(true);

      setTimeout(() => {
        if (successInput) {
          successInput.fire(); // Trigger Success
          setIsLoggingIn(false);
        }
      }, 1000);
    }
  };

  // Handle other interactions (e.g., LookUp, LookDown, LookIdle)
  const handleLookUp = () => {
    if (lookUpInput) {
      lookUpInput.fire(); // For trigger inputs
    }
  };

  const handleLookDown = () => {
    if (lookDownInput) {
      lookDownInput.fire(); // For trigger inputs
    }
  };

  const handleLookIdle = () => {
    if (lookIdleInput) {
      lookIdleInput.fire(); // For trigger inputs
    }
  };

  // Ensure Idle is set on load (if it's a boolean input)
  useEffect(() => {
    if (idleInput) {
      idleInput.value = true; // Set Idle to true if it's a boolean
    }
  }, [idleInput]);

    return (
        <>
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 gap-5">
      <RiveComponent className="w-[min(600px,100vw)] h-[min(600px,100vh)]" />
      
      {/* Two separate buttons */}
      <div className="flex gap-4">
        <Link
          to="/login" // Navigate to login page
          onClick={handleButtonClick} // Keep your animation
          className={`px-6 py-3 text-lg font-bold text-[hsla(286,14%,31%,1)] bg-[hsla(340,46%,46%,1)] rounded-lg 
                     ${isLoggingIn ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[hsl(332,56%,40%,1)] active:scale-95'} 
                     transition duration-300 inline-block text-center no-underline`}
        >
          Login
        </Link>

        <Link
          to="/signup" // Navigate to signup page
          onClick={handleButtonClick} // Keep your animation
          className={`px-6 py-3 text-lg font-bold text-[hsla(286,14%,31%,1)] bg-[hsla(180,46%,46%,1)] rounded-lg 
                     ${isLoggingIn ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[hsl(172,56%,40%,1)] active:scale-95'} 
                     transition duration-300 inline-block text-center no-underline`}
        >
          Sign Up
        </Link>
      </div>
    </div>
        </>
    )
}