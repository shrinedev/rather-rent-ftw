import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.module.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About RatherRent',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Experience the unique Finnish home sauna.</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Did you know that Finland has 3.2 million spaces - almost one space per person!</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                Most of the Finnish spaces are located at the homes of individuals - indeed, most
                people in Finland live in an apartment with space in it. In addition, lots of people
                have lakeside summer cottages, which also typically come with a separate sauna
                building near the waterfront.
              </h2>

              <p>
                To truly experience a Finnish sauna, you need to look beyond the public spaces, and
                instead visit a real home or cottage sauna. RatherRent makes this possible for
                everyone. All our spaces are owned by individuals willing to let tourists and other
                curious visitors to enter their sacred spaces.
              </p>

              <h3 className={css.subtitle}>Are you a space owner?</h3>

              <p>
                RatherRent offers you a good way to earn some extra cash! If you're not using your
                space every evening, why not rent it to other people while it's free. And even if
                you are using your space every evening (we understand, it's so good), why not invite
                other people to join you when the space is already warm! A shared space experience
                is often a more fulfilling one.
              </p>

              <h3 id="contact" className={css.subtitle}>
                Create your own marketplace like RatherRent
              </h3>
              <p>
                RatherRent is brought to you by the good folks at{' '}
                <ExternalLink href="http://sharetribe.com">Sharetribe</ExternalLink>. Would you like
                to create your own marketplace platform a bit like RatherRent? Or perhaps a mobile
                app? With Sharetribe it's really easy. If you have a marketplace idea in mind, do
                get in touch!
              </p>
              <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
