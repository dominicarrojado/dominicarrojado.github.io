import React, { useState } from 'react';
import HeroBackground from './heroBackground';
import HeroSection from './heroSection';
import UnsubscribeForm from './unsubscribeForm';
import UnsubscribeSuccess from './unsubscribeSuccess';

export default function UnsubscribeSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const onSuccess = () => setIsSuccess(true);

  return (
    <HeroSection>
      <HeroBackground />
      {!isSuccess ? (
        <UnsubscribeForm onSuccess={onSuccess} />
      ) : (
        <UnsubscribeSuccess />
      )}
    </HeroSection>
  );
}
