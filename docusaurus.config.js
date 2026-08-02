// @ts-check
import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import autoLinkTerms from './src/remark/auto-link-terms.mjs';

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
  // Auto-linked glossary terms point at section anchors, so a renamed heading
  // has to fail the build rather than quietly produce dead jumps.
  onBrokenAnchors: 'throw',
  markdown: {
    // CommonMark for .md so explicit heading ids ({#id}) survive; MDX would
    // parse those braces as a JS expression.
    format: 'detect',
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
          remarkPlugins: [
            [autoLinkTerms, {docsDir: path.resolve('docs')}],
          ],
          // No editUrl on purpose: readers get no "edit this page" affordance.
          // Content changes go through this repository only.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Offline search. The index is built into the site, so nothing is sent to a
  // third party and no crawler needs access - which matters while the docs are
  // a closed beta. Korean and Japanese get their own lunr tokenizers; without
  // them a search for "그림자" would only match a whole-string hit.
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        language: ['ko', 'en', 'ja'],
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 60,
        explicitSearchResultPath: true,
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
          'MingToon 0.1.3-preview — Closed Beta. studioraming@gmail.com',
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
          {to: '/changelog', label: '패치노트', position: 'left'},
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
        copyright: `© ${new Date().getFullYear()} StudioRaming. MingToon 0.1.3-preview.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['hlsl', 'csharp'],
      },
    }),
};

export default config;
