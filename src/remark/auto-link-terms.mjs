// Links MingToon terms to the page that explains them.
//
// Cross-links written by hand rot: a term gets renamed in the tool, or a page
// moves, and the prose keeps pointing at the old thing. This plugin owns one
// glossary instead, so a term is defined in exactly one place and every page
// that mentions it links there.
//
// Rules that keep the result readable rather than a wall of blue:
//   - only the FIRST mention of a term on a page becomes a link
//   - never inside headings, code, or an existing link
//   - never a self-link: a page does not link to itself
//   - longest term wins, so "내부 2D 경계" never degrades into "2D 경계"

import path from 'node:path';

// term -> route. Keep terms distinctive; a bare word like "그림자" would match
// everywhere and link nothing useful.
const GLOSSARY = {
  '깊이 투과광': '/guides/depth-effects#깊이-투과광',
  '껍데기 최소 두께': '/guides/depth-effects#1-얇음을-어떻게-잴지',
  '준비 상태 검사': '/workflow/character-manager#업로드-준비-점검',
  '밍툰 매니저': '/workflow/character-manager',
  'WARUDO Runtime Root': '/platforms/warudo#내보내기-전-필수--warudo-runtime-root',
  '변환 제외': '/workflow/character-manager#변환되지-않는-슬롯',
  '얼굴 모듈 동기화': '/workflow/character-manager#상태-패널',
  // 인스펙터
  '전체 효과': '/guides/inspector#전체-효과--가장-위의-마스터-스위치',
  '빠른 설정': '/guides/inspector#빠른-설정',
  '일괄 설정': '/guides/bulk-editing#일괄-설정-패널',
  '전체 설정': '/guides/inspector#보기-모드',
  '혼합 값': '/guides/bulk-editing#여러-재질을-그냥-선택했을-때',
  '워크플로 그룹': '/guides/inspector#전체-설정의-워크플로-그룹',

  // 기본 설정
  '표면 모드': '/guides/basics#1-표면-모드부터-정합니다',
  '알파 마스크': '/guides/basics#3-투명도를-텍스처로-따로-지정하기',
  '알파 컷오프': '/guides/basics#1-표면-모드부터-정합니다',
  '투명 깊이 선기록': '/guides/basics#머리카락이-볼을-뚫고-보일-때',
  '틴트 불투명도': '/guides/basics#2-베이스-색',
  '베이스맵 HSVG': '/guides/basics#2-베이스-색',
  '표시할 면': '/guides/basics#표시할-면',

  // 조명과 그림자
  '형태 그림자': '/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저',
  '그림자 투영': '/guides/light-and-shadow#4-그림자-투영-캐스트-섀도우',
  '그림자 색상': '/guides/light-and-shadow#2-그림자-색상',
  '통합 그림자': '/guides/light-and-shadow#통합-그림자--겹칠-때-새까매지는-문제',
  '캐스트 섀도우 수신': '/guides/light-and-shadow#4-그림자-투영-캐스트-섀도우',
  '1차 그림자 번짐': '/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저',
  '2차 그림자': '/guides/light-and-shadow#3-2차-그림자--3단-셀-음영',
  '얼굴 캐스트 안정화': '/guides/light-and-shadow#얼굴의-스치는-그림자',
  '셀프 캐스트 섀도우 억제': '/guides/light-and-shadow#얼룩덜룩한-그림자',
  '투영 경계 페더': '/guides/light-and-shadow#그림자-경계가-계단처럼-각질-때',
  '역광 실루엣 억제': '/guides/light-and-shadow#역광에서-몸에-캐릭터-모양-그림자가-겹칠-때',
  '최종 최소 밝기': '/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때',
  '베이스 색 유지': '/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때',
  '베이스 색상 보존': '/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때',
  '그림자 경계': '/guides/light-and-shadow#6-경계-장식--마지막에',
  '추가 광원': '/guides/light-and-shadow#추가-광원',

  // 그림자 패턴
  '그림자 패턴': '/guides/shadow-pattern',
  스크린톤: '/guides/shadow-pattern',
  '패턴 모양 타일': '/guides/shadow-pattern#패턴-모양-타일',
  '패턴 밀도': '/guides/shadow-pattern#런타임-값',

  // 림
  '림 라이트': '/guides/rim#림-라이트',
  '림 셰이드': '/guides/rim#림-셰이드',
  백라이트: '/guides/rim#백라이트--프런트-라이트--글리터',
  '프런트 라이트': '/guides/rim#백라이트--프런트-라이트--글리터',
  '그림자 내부 반사': '/guides/rim#그림자-내부-반사',

  // 깊이 기반 효과
  '깊이 기반 효과': '/guides/depth-effects',
  '깊이 림': '/guides/depth-effects#깊이-림-2d-림',
  '2D 그림자': '/guides/depth-effects#2d-그림자',
  '내부 2D 경계': '/guides/depth-effects#내부-2d-경계',
  '마스터 폭': '/guides/depth-effects#깊이--공통-값',
  '마스터 바이어스': '/guides/depth-effects#깊이--공통-값',
  '몸체 표면 가드': '/guides/depth-effects#눌어붙음과-감쇠',
  '카메라 깊이': '/guides/depth-effects#플랫폼별-깊이-확보',
  'Depth Texture Provider': '/guides/depth-effects#일반-unity-brp',

  // 디테일 맵
  '디테일 맵': '/guides/detail-maps',
  '텍스처 레이어': '/guides/detail-maps#텍스처-레이어',
  '노멀 레이어': '/guides/detail-maps#노멀-레이어',
  '맷캡 레이어': '/guides/detail-maps#맷캡-레이어',
  'PBR 표면': '/guides/detail-maps#pbr-표면',
  '패킹 마스크': '/guides/detail-maps#패킹-마스크',
  이미션: '/guides/detail-maps#이미션',
  오클루전: '/guides/detail-maps#오클루전',
  글리터: '/guides/detail-maps#글리터',

  // 캐릭터 표현
  '페이스 셰이딩': '/guides/character#페이스-셰이딩',
  '얼굴 영역 마스크': '/guides/character#방법-a--얼굴-영역-마스크-권장',
  '프록시 구': '/guides/character#방법-b--프록시-구',
  '노멀 누름 정도': '/guides/character#2단계-코-그림자-없애기',
  '얼굴 경계': '/guides/character#3단계-얼굴-전용-음영-경계',
  '캐릭터 높이 그라데이션': '/guides/character#캐릭터-높이-그라데이션',

  // 아웃라인
  '노멀 아웃라인': '/guides/outline#노멀-아웃라인',
  '클래식 헐': '/guides/outline#기본-설정',
  '압력 소스': '/guides/outline#압력-소스-고르기',
  '노멀 소스': '/guides/outline#각진-부분에서-선이-끊길-때',
  '헐 압력 대비': '/guides/outline#압력-소스-고르기',
  '버텍스 페인팅': '/guides/outline#씬-뷰에서-직접-칠하기',
  '셰이딩 포함': '/guides/outline#아웃라인-색이-조명을-따라가게',

  // 메시 베이크
  '메시 UV 베이크': '/guides/mesh-bakes',
  '아웃라인 스무스 노멀': '/guides/mesh-bakes#아웃라인-스무스-노멀-uv8',
  UV8: '/guides/mesh-bakes#아웃라인-스무스-노멀-uv8',
  UV7: '/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7',
  UV4: '/guides/mesh-bakes#캐릭터-높이-uv4',

  // 텍스처 슬롯
  '텍스처 슬롯 공통 UI': '/guides/texture-modules',
  '채널 소스': '/guides/texture-modules#채널-소스',
  '마스크 채널': '/guides/texture-modules#마스크-세부-설정',
  '리맵 시작': '/guides/texture-modules#리맵을-쓰는-법',
  '레이어 수': '/guides/texture-modules#레이어-수',
  HSVG: '/guides/texture-modules#hsvg',

  // 일괄 편집
  '머티리얼 프리셋': '/guides/bulk-editing#머티리얼-프리셋',
  '팩토리 프리셋': '/guides/bulk-editing#적용',
  '사용자 프리셋': '/guides/bulk-editing#저장',

  // 얼굴 SDF · 타일드
  '얼굴 SDF': '/guides/face-sdf',
  '타이밍 강도': '/guides/face-sdf#레이어별-조정-항목',
  '타일드 머티리얼 컴포저': '/guides/tiled-materials',

  // 워크플로
  'MingToon Manager': '/workflow/character-manager',
  '얼굴 슬롯 판정': '/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계',
  'lilToon 변환': '/workflow/liltoon-conversion',
  '빌드 시 자동 최적화': '/workflow/build-optimization',
  'Optimize Shaders On Build': '/workflow/build-optimization#optimize-shaders-on-build',
  '수동 Bake': '/workflow/bake-and-restore',
  '동적 패스 보존': '/workflow/bake-and-restore#절차',
  LosslessOnly: '/workflow/bake-and-restore#losslessonly-기본값',
  ReviewedHighQuality: '/workflow/bake-and-restore#reviewedhighquality',
  'Keep Editable': '/workflow/bake-and-restore#keep-editable',

  // 플랫폼
  'VRChat 호환성 규칙': '/internals/vrc-rules',
  '지원 환경': '/platforms/compatibility',
  '셰이더 모델 4.5': '/platforms/compatibility#하드웨어-요구-사항-필수',
  'Photo Camera': '/platforms/vrchat#깊이-효과가-어디까지-보장되나',
  'Depth Availability': '/platforms/vrchat#빌드-시-자동으로-처리되는-것',

  // 레퍼런스
  'Validate Project': '/reference/validator',

  // 내부 동작
  'VRCFallback': '/internals/vrc-rules#fallback-셰이더',
  '렌더 큐': '/internals/shader-structure#표면-모드가-실제로-바꾸는-값',
  ShadowCaster: '/internals/shader-structure#5-shadow_caster',
  FORWARD_BASE: '/internals/shader-structure#2-forward_base',
  '셰이더 키워드': '/internals/shader-structure#셰이더-키워드',
  '레이어 티어': '/internals/shader-structure#레이어-티어-키워드',
  '머티리얼 부하 예상': '/internals/module-cost#부하-예상-패널-읽기',
  '애니메이션 의존성': '/internals/bake-internals#1단계--애니메이션-의존성-분석',
  '구조 프로파일': '/internals/bake-internals#3단계--구조-프로파일과-상수-교집합',
  '변환 보고서': '/internals/conversion-internals',
  '판정 근거': '/internals/conversion-internals#판정-근거-표시',
};

const TERMS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

// Docs live at the site root (routeBasePath '/'), so the route is the path
// under docs/ with the extension dropped; intro.md owns '/'.
function routeOf(filePath, docsDir) {
  const rel = path
    .relative(docsDir, filePath)
    .split(path.sep)
    .join('/')
    .replace(/\.mdx?$/, '');
  return rel === 'intro' ? '/' : '/' + rel;
}

// An ASCII term must not match inside a longer word: "UV4" should not light up
// inside "UV40". Korean has no such boundary, and needs none.
function boundaryOk(text, start, term) {
  if (!/^[\x20-\x7E]+$/.test(term)) return true;
  const before = text[start - 1];
  const after = text[start + term.length];
  const wordish = /[A-Za-z0-9_]/;
  if (before && wordish.test(before) && /^[A-Za-z0-9_]/.test(term)) return false;
  if (after && wordish.test(after) && /[A-Za-z0-9_]$/.test(term)) return false;
  return true;
}

export default function autoLinkTerms(options = {}) {
  const docsDir = options.docsDir;

  return (tree, file) => {
    const selfRoute = docsDir && file.path ? routeOf(file.path, docsDir) : null;
    const linked = new Set();

    const walk = (node, inSkip) => {
      if (!node || !Array.isArray(node.children)) return;

      // Admonition titles arrive as a paragraph flagged directiveLabel.
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const skip =
          inSkip ||
          child.type === 'heading' ||
          child.type === 'link' ||
          child.type === 'linkReference' ||
          child.type === 'inlineCode' ||
          child.type === 'code' ||
          child.type === 'mdxJsxTextElement' ||
          child.type === 'mdxFlowExpression' ||
          child.type === 'mdxTextExpression' ||
          (child.data && child.data.directiveLabel === true);

        if (child.type === 'text' && !skip) {
          const replacement = linkify(child.value);
          if (replacement) {
            children.splice(i, 1, ...replacement);
            i += replacement.length - 1;
          }
          continue;
        }
        walk(child, skip);
      }
    };

    function linkify(text) {
      const out = [];
      let cursor = 0;

      while (cursor < text.length) {
        let bestIndex = -1;
        let bestTerm = null;

        for (const term of TERMS) {
          if (linked.has(term)) continue;
          // Compare the page, not the anchor: a glossary entry pointing at a
          // section of the current page is still a self-link.
          if (GLOSSARY[term].split('#')[0] === selfRoute) continue;
          const at = text.indexOf(term, cursor);
          if (at < 0) continue;
          if (!boundaryOk(text, at, term)) continue;
          // TERMS is longest-first, so the first hit at the earliest index wins.
          if (bestIndex < 0 || at < bestIndex) {
            bestIndex = at;
            bestTerm = term;
          }
        }

        if (bestIndex < 0) break;

        if (bestIndex > cursor) {
          out.push({type: 'text', value: text.slice(cursor, bestIndex)});
        }
        out.push({
          type: 'link',
          url: GLOSSARY[bestTerm],
          children: [{type: 'text', value: bestTerm}],
          data: {hProperties: {className: 'ming-term'}},
        });
        linked.add(bestTerm);
        cursor = bestIndex + bestTerm.length;
      }

      if (!out.length) return null;
      if (cursor < text.length) {
        out.push({type: 'text', value: text.slice(cursor)});
      }
      return out;
    }

    walk(tree, false);
  };
}
