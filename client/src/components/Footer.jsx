import PropTypes from 'prop-types';

const footers = [
  `Made with <3 and JavaScript`,
  `Inspired by <a href='https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile'>GitHub</a>`,
  `Inspired by <a href='https://npmtrends.com'>npm Trends</a>`,
  `Inspired by <a href='https://star-history.com'>Star History</a>`,
  `Inspired by <a href='https://bundlephobia.com'>Bundlephobia</a>`,
  `<a href='https://github.com/enyichiaagu/package-commits'>Star repo on GitHub</a>`,
];

function Footer() {
  return (
    <footer
      className='text-center py-4'
      dangerouslySetInnerHTML={{
        __html: footers[Math.floor(Math.random() * footers.length)],
      }}
    ></footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
