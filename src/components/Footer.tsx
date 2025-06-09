import { useEffect, useState } from 'react';

const footers = [
  `Made with <3 and JavaScript`,
  `Inspired by <a href='https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile'>GitHub</a>`,
  `Inspired by <a href='https://npmtrends.com'>npm trends</a>`,
  `Inspired by <a href='https://star-history.com'>Star History</a>`,
  `Inspired by <a href='https://bundlephobia.com'>Bundlephobia</a>`,
];

function Footer() {
  let [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * footers.length));
  }, []);

  return (
    <footer
      className='text-center py-4'
      dangerouslySetInnerHTML={{
        __html: footers[index],
      }}
    ></footer>
  );
}

export default Footer;
