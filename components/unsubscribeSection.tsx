import React, { useState } from 'react';
import cn from 'classnames';
import HeroMainBackground from './heroMainBackground';
import HeroMainSection from './heroMainSection';
import UnsubscribeForm from './unsubscribeForm';
import UnsubscribeSuccess from './unsubscribeSuccess';

export default function UnsubscribeSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const onSuccess = () => setIsSuccess(true);

  return (
    <HeroMainSection>
      <HeroMainBackground />
      <div className={cn('p-4', 'sm:p-0')}>
        {!isSuccess ? (
          <UnsubscribeForm onSuccess={onSuccess} />
        ) : (
          <UnsubscribeSuccess />
        )}
      </div>
    </HeroMainSection>
  );
}
