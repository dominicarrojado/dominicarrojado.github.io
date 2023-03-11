import React, { useEffect } from 'react';
import cn from 'classnames';
import { useVerifySubscription } from '../lib/api-hooks';
import NextLink from './nextLink';
import TextArrowLink from './textArrowLink';
import HeroMainSection from './heroMainSection';
import ModalDialog from './modalDialog';
import ModalContent from './modalContent';
import ModalTitle from './modalTitle';
import ModalDescription from './modalDescription';
import HeroMainBackground from './heroMainBackground';
import { FetchState, Route } from '../lib/types';

export default function SubscribeSection() {
  const [fetchState, verifySubscription] = useVerifySubscription();

  useEffect(() => {
    verifySubscription();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeroMainSection>
      <HeroMainBackground />
      <div className={cn('p-4', 'sm:p-0')}>
        <ModalDialog>
          <ModalContent>
            {fetchState === FetchState.LOADING && (
              <>
                <ModalTitle>Verifying subscription...</ModalTitle>
                <ModalDescription>
                  Please wait while we verify your subscription. This process
                  may take a few moments. Thank you for your patience and
                  interest in my content.
                </ModalDescription>
              </>
            )}
            {fetchState === FetchState.SUCCESS && (
              <>
                <ModalTitle>Subscription confirmed</ModalTitle>
                <ModalDescription>
                  You're now subscribed to my tech blog. Get ready to receive
                  updates on new posts.
                </ModalDescription>
                <div className="mt-12 text-center">
                  <NextLink href={Route.POSTS} passHref>
                    <TextArrowLink>See Latest Posts</TextArrowLink>
                  </NextLink>
                </div>
              </>
            )}
            {fetchState === FetchState.NOT_FOUND && (
              <>
                <ModalTitle>Token expired or not found</ModalTitle>
                <ModalDescription>
                  Your confirmation token has expired or cannot be found. If you
                  have not confirmed your subscription yet, please resubscribe
                  to receive updates on new posts.
                </ModalDescription>
              </>
            )}
            {fetchState === FetchState.ERROR && (
              <>
                <ModalTitle>Something went wrong</ModalTitle>
                <ModalDescription>
                  Please try again later. If you continue to experience issues,
                  please contact me and we'll do our best to assist you. Thank
                  you for your patience and understanding.
                </ModalDescription>
              </>
            )}
          </ModalContent>
        </ModalDialog>
      </div>
    </HeroMainSection>
  );
}
