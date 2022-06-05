import AnchorLink from './anchorLink';
import PageContent from './pageContent';
import Section from './section';
import NextLink from './nextLink';
import { ExternalUrl, Route } from '../lib/types';
import { DISCLAIMER_EMAIL } from '../lib/constants';

function DisclaimerSection() {
  return (
    <Section>
      <PageContent>
        <h2>Copyright and trademarks</h2>
        <p>
          All rights reserved. All content (texts, trademarks, illustrations,
          photos, graphics, files, designs, files, designs, arrangements etc.)
          on this Website are protected by copyright and other protective laws.
          The contents of this Website are to be used only in accordance with
          Internet regulations.
        </p>
        <h2>Internet regulations</h2>
        <p>
          Without the explicit written permission of the Operator of this
          Website, it is prohibited to integrate in whole, or in part, any of
          the protected contents published on this Website into other programs
          or other websites or to use them by any other means. This Website can
          contain elements that are protected by copyright and by other laws
          that are subject to the copyright or other rights of third parties and
          that are correspondingly protected for these third parties.
        </p>
        <h2>Featured Projects</h2>
        <p>
          <NextLink href={Route.PROJECTS}>
            <a>Projects</a>
          </NextLink>{' '}
          hosted on this Website are solely for portfolio or demo purposes only.
          The Operator of this Website contributed to the software development
          of these projects during the time of employment with previous and
          current employers. All rights goes to the respective owners of these
          projects. If any company that owns these projects would like to
          request for removal of their projects on this Website, please contact
          us.
        </p>
        <h2>Font Awesome</h2>
        <p>
          We give credit to{' '}
          <AnchorLink href={ExternalUrl.FONT_AWESOME} isExternal>
            Font Awesome
          </AnchorLink>{' '}
          for the free icons we use on this Website. You can read their free
          license{' '}
          <AnchorLink href={ExternalUrl.FONT_AWESOME_LICENSE} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Links to other resources</h2>
        <p>
          This Website contain links to other resources that are not owned or
          controlled by us. Please be aware that we are not responsible for the
          content of such other resources or third parties.
        </p>
        <h2>Contacting us</h2>
        <p>
          If you would like to contact us to understand more about this
          Disclaimer or wish to contact us concerning any matter relating to
          copyrights and trademarks, you may send an email to{' '}
          <AnchorLink href={`mailto:${DISCLAIMER_EMAIL}`}>
            {DISCLAIMER_EMAIL}
          </AnchorLink>
          .
        </p>
      </PageContent>
    </Section>
  );
}

export default DisclaimerSection;
