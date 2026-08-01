// @ts-check

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
        'guides/surface',
        'guides/shadow',
        'guides/shadow-pattern',
        'guides/rim-and-outline',
        'guides/face',
        'guides/camera-depth',
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
      items: [
        'platforms/compatibility',
        'platforms/vrchat',
        'platforms/warudo',
      ],
    },
    {
      type: 'category',
      label: '항목 레퍼런스',
      items: [
        'reference/surface',
        'reference/lighting',
        'reference/shadow',
        'reference/rim-and-highlights',
        'reference/depth-effects',
        'reference/face',
        'reference/outline',
      ],
    },
    'troubleshooting',
    'limitations',
  ],
};

export default sidebars;
