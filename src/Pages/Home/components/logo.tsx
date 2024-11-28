import React from 'react';

interface LogoProps {
  text: string; 
  fontSize?: string; 
  color?: string; 
}

const Logo: React.FC<LogoProps> = ({ text, fontSize = '2rem', color = 'white' }) => {
  return (
    <div className="logo" >
      {text}
    </div>
  );
};

export default Logo;
