// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MingToon Docs',
  tagline: 'Character toon shader and authoring toolset for Unity',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://studioraming.github.io',
  baseUrl: '/mingtoon-docs/',

  organizationName: 'StudioRaming',
  projectName: 'mingtoon-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
    localeConfigs: {
      ko: {label: '한국어', htmlLang: 'ko-KR'},
      en: {label: 'English', htmlLang: 'en-US'},
      ja: {label: '日本語', htmlLang: 'ja-JP'},
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/StudioRaming/mingtoon-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'closed-beta',
        content:
          'MingToon 0.1.2-preview — Closed Beta. studioraming@gmail.com',
        backgroundColor: '#5b3fd6',
        textColor: '#ffffff',
        isCloseable: true,
      },
      navbar: {
        title: 'MingToon',
        logo: {
          alt: 'MingToon',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Introduction', to: '/'},
              {label: 'Installation', to: '/getting-started/installation'},
              {label: 'Compatibility', to: '/platforms/compatibility'},
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'studioraming@gmail.com',
                href: 'mailto:studioraming@gmail.com',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} StudioRaming. MingToon 0.1.2-preview.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['hlsl', 'csharp'],
      },
    }),
};

export default config;
