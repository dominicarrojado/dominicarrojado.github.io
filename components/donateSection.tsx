import cn from 'classnames';
import Section from './section';
import AnchorLink from './anchorLink';
import PageContent from './pageContent';
import { ExternalUrl, InternalUrl } from '../lib/types';

export default function DonateSection() {
  return (
    <Section>
      <PageContent>
        <p>
          I am passionate about sharing my knowledge and experiences in web
          development with the world. I have also created helpful tools such as{' '}
          <AnchorLink href={InternalUrl.SG_ALERTS} target="_blank">
            SG Alerts
          </AnchorLink>{' '}
          and{' '}
          <AnchorLink href={InternalUrl.PH_ALERTS} target="_blank">
            PH Alerts
          </AnchorLink>{' '}
          to help people save time and effort. While the content is free to
          consume and the tools are free to use, they take time and effort to
          maintain and incur costs to run. Your donation will help me cover the
          costs and keep the services running. It will also be a great
          motivation for me to continue creating and sharing more content and
          improving the tools with new features.
        </p>
        <p>
          If you'd like to support my work with a donation, I would be very
          grateful. Every donation will be sincerely appreciated and will go a
          long way. Thank you very much for your support ~
        </p>
        <div
          className={cn(
            'flex flex-col gap-10 mt-10',
            'md:mt-20 md:flex-row md:justify-center md:gap-20'
          )}
        >
          <figure className="!m-0">
            <img
              className="w-72 h-auto mx-auto shadow-3xl aspect-square"
              src="/images/donate/paylah.jpg"
              alt="DBS PayLah! QR code"
              width="540"
              height="540"
              draggable="false"
            />
            <figcaption className="text-gray-400 text-center">
              Scan the QR Code with{' '}
              <AnchorLink href={ExternalUrl.DBS_PAYLAH} isExternal>
                DBS PayLah!
              </AnchorLink>{' '}
              <br />
              (for Singapore Residents)
            </figcaption>
          </figure>
          <AnchorLink
            href={ExternalUrl.PERSONAL_PAYPAL}
            title="Personal PayPal"
            isExternal
          >
            <figure className="!m-0">
              <img
                className={cn(
                  'w-72 h-auto mx-auto shadow-3xl aspect-square bg-white p-10'
                )}
                src="/images/donate/paypal.svg"
                alt="PayPal"
                width="246"
                height="60"
                draggable="false"
              />
              <figcaption className="text-gray-400 text-center">
                Click to donate via PayPal <br />
                (For International Supporters)
              </figcaption>
            </figure>
          </AnchorLink>
        </div>
      </PageContent>
    </Section>
  );
}
