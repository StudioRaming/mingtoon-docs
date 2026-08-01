// @ts-check

// The "룩 만들기" and "항목 레퍼런스" groups mirror the inspector's own workflow
// grouping, so a control found on screen maps to one page here.
//
// Category labels are translated in
// i18n/<locale>/docusaurus-plugin-content-docs/current.json.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '시작하기',
      collapsed: false,
      items: ['getting-started/installation', 'getting-started/first-material'],
    },
    {
      type: 'category',
      label: '룩 만들기',
      collapsed: false,
      items: [
        'guides/inspector',
        'guides/basics',
        'guides/light-and-shadow',
        'guides/shadow-pattern',
        'guides/rim',
        'guides/depth-effects',
        'guides/detail-maps',
        'guides/character',
        'guides/outline',
      ],
    },
    {
      type: 'category',
      label: '내보내기',
      collapsed: false,
      items: [
        'workflow/liltoon-conversion',
        'workflow/build-optimization',
        'workflow/bake-and-restore',
      ],
    },
    {
      type: 'category',
      label: '플랫폼',
      collapsed: false,
      items: [
        'platforms/vrchat',
        'platforms/compatibility',
        'platforms/warudo',
      ],
    },
    {
      type: 'category',
      label: '항목 레퍼런스',
      items: [
        'reference/basics',
        'reference/light-and-shadow',
        'reference/rim',
        'reference/depth-effects',
        'reference/detail-maps',
        'reference/character',
        'reference/outline',
      ],
    },
    'troubleshooting',
    'limitations',
  ],
};

export default sidebars;
