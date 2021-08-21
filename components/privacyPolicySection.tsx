import cn from 'classnames';
import Link from 'next/link';
import AnchorLink from './anchorLink';
import Section from './section';
import { ExternalUrl, Route } from '../lib/types';
import { PRIVACY_EMAIL } from '../lib/constants';
import PageContent from './pageContent';

function PrivacyPolicySection() {
  return (
    <Section>
      <PageContent>
        <p>
          This privacy policy ("Policy") describes how the personally
          identifiable information ("Personal Information") you may provide on
          the{' '}
          <Link href={Route.HOME}>
            <a>dominicarrojado.com</a>
          </Link>{' '}
          website ("Website" or "Service") and any of its related products and
          services (collectively, "Services") is collected, protected and used.
          It also describes the choices available to you regarding our use of
          your Personal Information and how you can access and update this
          information. This Policy is a legally binding agreement between you
          ("User", "you" or "your") and this Website operator ("Operator", "we",
          "us" or "our"). By accessing and using the Website and Services, you
          acknowledge that you have read, understood, and agree to be bound by
          the terms of this Policy. This Policy does not apply to the practices
          of companies that we do not own or control, or to individuals that we
          do not employ or manage.
        </p>
        <h2>GitHub Pages</h2>
        <p>
          This Website is currently hosted on{' '}
          <AnchorLink href={ExternalUrl.GITHUB_PAGES} isExternal>
            GitHub Pages
          </AnchorLink>
          , a static site hosting service by{' '}
          <AnchorLink href={ExternalUrl.GITHUB} isExternal>
            GitHub
          </AnchorLink>
          . Please note that GitHub may collect information that your browser
          sends, including logs of visitor IP addresses, to comply with legal
          obligations, and to maintain the security and integrity of GitHub's
          website and service. You can read more about their policy{' '}
          <AnchorLink href={ExternalUrl.GITHUB_PAGES_PRIVACY_POLICY} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Meteor Cloud</h2>
        <p>
          <Link href={Route.PROJECTS}>
            <a>Projects</a>
          </Link>{' '}
          that are built with{' '}
          <AnchorLink href={ExternalUrl.METEOR} isExternal>
            Meteor
          </AnchorLink>{' '}
          are hosted on{' '}
          <AnchorLink href={ExternalUrl.METEOR_CLOUD} isExternal>
            Meteor Cloud
          </AnchorLink>{' '}
          under the domain <code>meteorapp.com</code>. You can refer to their
          policy{' '}
          <AnchorLink href={ExternalUrl.METEOR_CLOUD_PRIVACY_POLICY} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Featured Projects</h2>
        <p>
          <Link href={Route.PROJECTS}>
            <a>Projects</a>
          </Link>{' '}
          hosted on this Website are solely for portfolio or demo purposes only.
          If, however, you wish to use some of the features of a project, you
          may be asked to provide certain Personal Information (for example,
          your name and e-mail address). We receive and store any information
          you knowingly provide to us when you fill any online forms on the
          Website. Some of the information we collect is directly from you via
          the Website and Services. You can choose not to provide us with your
          Personal Information, but then you may not be able to take advantage
          of some of the features of a project. Users who are uncertain about
          what information is mandatory are welcome to contact us. Projects that
          are not hosted in this Website are not owned or controlled by us,
          please be aware that we are not responsible for the privacy practices
          of these projects. We encourage you to be aware when you leave the
          Website and Services and to read the privacy statements of each and
          every project that may collect Personal Information.
        </p>
        <h2>Google Analytics</h2>
        <p>
          The Website currently uses{' '}
          <AnchorLink href={ExternalUrl.GOOGLE_ANALYTICS} isExternal>
            Google Analytics
          </AnchorLink>
          , a web analytics service by{' '}
          <AnchorLink href={ExternalUrl.GOOGLE} isExternal>
            Google
          </AnchorLink>
          . We only use the information provided by this service to help us
          improve the Website. For more information about how it collects and
          processes data, please refer{' '}
          <AnchorLink href={ExternalUrl.GOOGLE_ANALYTICS_POLICY} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Google Tag Manager</h2>
        <p>
          The Website currently uses{' '}
          <AnchorLink href={ExternalUrl.GOOGLE_TAG_MANAGER} isExternal>
            Google Tag Manager
          </AnchorLink>
          , a tag management system by{' '}
          <AnchorLink href={ExternalUrl.GOOGLE} isExternal>
            Google
          </AnchorLink>
          . We use it to deploy our Google Analytics and measurement tag
          configurations from a web-based user interface. For more information
          about how it collects and processes data, please refer{' '}
          <AnchorLink href={ExternalUrl.GOOGLE_TAG_MANAGER_POLICY} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Use and processing of collected information</h2>
        <p>
          In order to make the Website and Services available to you, or to meet
          a legal obligation, we may need to collect and use certain Personal
          Information. If you do not provide the information that we request, we
          may not be able to provide you with the requested products or
          services. Any of the information we collect from you may be used for
          the following purposes:
        </p>
        <ul>
          <li>Improve user experience</li>
          <li>Run and operate the Website and Services</li>
        </ul>
        <p>
          Processing your Personal Information depends on how you interact with
          the Website and Services, where you are located in the world and if
          one of the following applies:
        </p>
        <ul>
          <li>
            You have given your consent for one or more specific purposes; this,
            however, does not apply, whenever the processing of Personal
            Information is subject to European data protection law;
          </li>
          <li>
            Provision of information is necessary for the performance of an
            agreement with you and/or for any pre-contractual obligations
            thereof;
          </li>
          <li>
            Processing is necessary for compliance with a legal obligation to
            which you are subject;
          </li>
          <li>
            Processing is related to a task that is carried out in the public
            interest or in the exercise of official authority vested in us;
          </li>
          <li>
            Processing is necessary for the purposes of the legitimate interests
            pursued by us or by a third party.
          </li>
        </ul>
        <p>
          Note that under some legislations we may be allowed to process
          information until you object to such processing (by opting out),
          without having to rely on consent or any other of the following legal
          bases below. In any case, we will be happy to clarify the specific
          legal basis that applies to the processing, and in particular whether
          the provision of Personal Information is a statutory or contractual
          requirement, or a requirement necessary to enter into a contract.
        </p>
        <h2>Disclosure of information</h2>
        <p>
          Depending on the requested Services or as necessary to complete any
          transaction or provide any service you have requested, we may share
          your information with your consent with our trusted third parties that
          work with us, any other affiliates and subsidiaries we rely upon to
          assist in the operation of the Website and Services available to you.
          We do not share Personal Information with unaffiliated third parties.
          These service providers are not authorized to use or disclose your
          information except as necessary to perform services on our behalf or
          comply with legal requirements. We may share your Personal Information
          for these purposes only with third parties whose privacy policies are
          consistent with ours or who agree to abide by our policies with
          respect to Personal Information. These third parties are given
          Personal Information they need only in order to perform their
          designated functions, and we do not authorize them to use or disclose
          Personal Information for their own marketing or other purposes.
        </p>
        <h2>Retention of information</h2>
        <p>
          We will retain and use your Personal Information for the period
          necessary to comply with our legal obligations, resolve disputes, and
          enforce our agreements unless a longer retention period is required or
          permitted by law. We may use any aggregated data derived from or
          incorporating your Personal Information after you update or delete it,
          but not in a manner that would identify you personally. Once the
          retention period expires, Personal Information shall be deleted.
          Therefore, the right to access, the right to erasure, the right to
          rectification and the right to data portability cannot be enforced
          after the expiration of the retention period.
        </p>
        <h2>The rights of users</h2>
        <p>
          You may exercise certain rights regarding your information processed
          by us. In particular, you have the right to do the following:
        </p>
        <ul>
          <li>
            You have the right to withdraw consent where you have previously
            given your consent to the processing of your information;
          </li>
          <li>
            You have the right to object to the processing of your information
            if the processing is carried out on a legal basis other than
            consent;
          </li>
          <li>
            You have the right to learn if information is being processed by us,
            obtain disclosure regarding certain aspects of the processing and
            obtain a copy of the information undergoing processing;
          </li>
          <li>
            You have the right to verify the accuracy of your information and
            ask for it to be updated or corrected;
          </li>
          <li>
            You have the right, under certain circumstances, to restrict the
            processing of your information, in which case, we will not process
            your information for any purpose other than storing it;
          </li>
          <li>
            You have the right, under certain circumstances, to obtain the
            erasure of your Personal Information from us;
          </li>
          <li>
            You have the right to receive your information in a structured,
            commonly used and machine readable format and, if technically
            feasible, to have it transmitted to another controller without any
            hindrance. This provision is applicable provided that your
            information is processed by automated means and that the processing
            is based on your consent, on a contract which you are part of or on
            pre-contractual obligations thereof.
          </li>
        </ul>
        <h2>Privacy of children</h2>
        <p>
          We do not knowingly collect any Personal Information from children
          under the age of 18. If you are under the age of 18, please do not
          submit any Personal Information through the Website and Services. We
          encourage parents and legal guardians to monitor their children's
          Internet usage and to help enforce this Policy by instructing their
          children never to provide Personal Information through the Website and
          Services without their permission. If you have reason to believe that
          a child under the age of 18 has provided Personal Information to us
          through the Website and Services, please contact us. You must also be
          old enough to consent to the processing of your Personal Information
          in your country (in some countries we may allow your parent or
          guardian to do so on your behalf).
        </p>
        <h2>Cookies</h2>
        <p>
          The Website and Services use "cookies" to help personalize your online
          experience. A cookie is a text file that is placed on your hard disk
          by a web page server. Cookies cannot be used to run programs or
          deliver viruses to your computer. Cookies are uniquely assigned to
          you, and can only be read by a web server in the domain that issued
          the cookie to you.
        </p>
        <p>
          We may use cookies to collect, store, and track information for
          statistical purposes to operate the Website and Services. You have the
          ability to accept or decline cookies. Most web browsers automatically
          accept cookies, but you can usually modify your browser setting to
          decline cookies if you prefer. You may learn more about cookies and
          how they work{' '}
          <AnchorLink href={ExternalUrl.COOKIES} isExternal>
            here
          </AnchorLink>
          .
        </p>
        <h2>Do Not Track signals</h2>
        <p>
          Some browsers incorporate a Do Not Track feature that signals to
          websites you visit that you do not want to have your online activity
          tracked. Tracking is not the same as using or collecting information
          in connection with a website. For these purposes, tracking refers to
          collecting personally identifiable information from consumers who use
          or visit a website or online service as they move across different
          websites over time. How browsers communicate the Do Not Track signal
          is not yet uniform. As a result, the Website and Services are not yet
          set up to interpret or respond to Do Not Track signals communicated by
          your browser. Even so, as described in more detail throughout this
          Policy, we limit our use and collection of your personal information.
        </p>
        <h2>Links to other resources</h2>
        <p>
          The Website and Services contain links to other resources that are not
          owned or controlled by us. Please be aware that we are not responsible
          for the privacy practices of such other resources or third parties. We
          encourage you to be aware when you leave the Website and Services and
          to read the privacy statements of each and every resource that may
          collect Personal Information.
        </p>
        <h2>Information security</h2>
        <p>
          We secure information you provide on computer servers in a controlled,
          secure environment, protected from unauthorized access, use, or
          disclosure. We maintain reasonable administrative, technical, and
          physical safeguards in an effort to protect against unauthorized
          access, use, modification, and disclosure of Personal Information in
          its control and custody. However, no data transmission over the
          Internet or wireless network can be guaranteed. Therefore, while we
          strive to protect your Personal Information, you acknowledge that:
        </p>
        <ul>
          <li>
            There are security and privacy limitations of the Internet which are
            beyond our control;
          </li>
          <li>
            The security, integrity, and privacy of any and all information and
            data exchanged between you and the Website and Services cannot be
            guaranteed;
          </li>
          <li>
            Any such information and data may be viewed or tampered with in
            transit by a third party, despite best efforts.
          </li>
        </ul>
        <h2>Data breach</h2>
        <p>
          In the event we become aware that the security of the Website and
          Services has been compromised or users Personal Information has been
          disclosed to unrelated third parties as a result of external activity,
          including, but not limited to, security attacks or fraud, we reserve
          the right to take reasonably appropriate measures, including, but not
          limited to, investigation and reporting, as well as notification to
          and cooperation with law enforcement authorities. In the event of a
          data breach, we will make reasonable efforts to notify affected
          individuals if we believe that there is a reasonable risk of harm to
          the user as a result of the breach or if notice is otherwise required
          by law. When we do, we will post a notice on the Website.
        </p>
        <h2>Changes and amendments</h2>
        <p>
          We reserve the right to modify this Policy or its terms relating to
          the Website and Services from time to time in our discretion and will
          notify you of any material changes to the way in which we treat
          Personal Information. When we do, we will revise the updated date at
          the bottom of this page. We may also provide notice to you in other
          ways in our discretion, such as through contact information you have
          provided. Any updated version of this Policy will be effective
          immediately upon the posting of the revised Policy unless otherwise
          specified. Your continued use of the Website and Services after the
          effective date of the revised Policy (or such other act specified at
          that time) will constitute your consent to those changes. However, we
          will not, without your consent, use your Personal Information in a
          manner materially different than what was stated at the time your
          Personal Information was collected.
        </p>
        <h2>Acceptance of this policy</h2>
        <p>
          You acknowledge that you have read this Policy and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Policy. If you do not agree to abide by
          the terms of this Policy, you are not authorized to access or use the
          Website and Services.
        </p>
        <h2>Contacting us</h2>
        <p>
          If you would like to contact us to understand more about this Policy
          or wish to contact us concerning any matter relating to individual
          rights and your Personal Information, you may send an email to
          <AnchorLink href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </AnchorLink>
          .
        </p>
        <div
          className={cn(
            'mt-14 text-center text-gray-400',
            'md:mt-20',
            'xl:mt-24'
          )}
        >
          This document was last updated on August 21, 2021
        </div>
      </PageContent>
    </Section>
  );
}

export default PrivacyPolicySection;
