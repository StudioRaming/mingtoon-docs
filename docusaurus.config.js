// @ts-check
import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import autoLinkTerms from './src/remark/auto-link-terms.mjs';

// The one place the shipped version is written. The announcement bar, the
// navbar badge, and the footer all read it, so a release bumps this line and
// nothing else. It drifted to 0.1.3-preview across two releases because each
// of those three carried its own literal.
//
// A changelog page must exist at docs/changelog/<VERSION>.md before this is
// bumped: the navbar badge links straight to it and onBrokenLinks is throw,
// so a version with no patch note fails the build instead of shipping a dead
// link.
//
// After a bump run `npm run write-translations` once. The badge's label is a
// navbar item, so its i18n key carries the version (item.label.v0.1.6) and a
// new one has to be written; the previous key is then reported as unknown and
// can be deleted from the three navbar.json files.
const MINGTOON_VERSION = '0.1.7';
const LATEST_CHANGELOG = `/changelog/${MINGTOON_VERSION}`;

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
        // Deliberately carries no link. Docusaurus 3 does not extract the
        // announcement bar into the i18n theme files, so this one string is
        // served to ko, en, and ja alike - an href here would send two of the
        // three locales to the Korean page. The clickable version is the
        // navbar badge below, which resolves the locale prefix itself.
        id: 'open-beta-brp',
        content:
          `MingToon ${MINGTOON_VERSION} Open Beta.`,
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
          {href: 'https://studioraming.github.io/mingtoon-site/', label: 'Official website', position: 'left'},
          {to: '/changelog', label: '패치노트', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
          },
          // The current version, and the shortest way to what changed in it.
          // `to` rather than `href` so the baseUrl and the locale prefix are
          // applied - /mingtoon-docs/en/changelog/0.1.6 for an English reader.
          {
            to: LATEST_CHANGELOG,
            label: `v${MINGTOON_VERSION}`,
            position: 'right',
            className: 'navbar__version',
            'aria-label': `MingToon ${MINGTOON_VERSION} patch notes`,
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
                label: 'Third-party credits',
                to: '/legal/third-party-credits',
              },
              {
                label: 'Business enquiries',
                href: 'mailto:studioraming@gmail.com',
              },
              {label: 'Bug reports (Discord)', href: 'https://discord.gg/Zsj6pkWKKs'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} StudioRaming. MingToon ${MINGTOON_VERSION}.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['hlsl', 'csharp'],
      },
    }),
};

export default config;
