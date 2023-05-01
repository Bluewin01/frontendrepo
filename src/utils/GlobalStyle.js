import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import '@aia-digital/ui-library/lib/static/styles.css';

import AIABoldEOT from '../assets/fonts/AIAEverest-Bold.eot';
import AIABoldWOFF from '../assets/fonts/AIAEverest-Bold.woff';
import AIABoldWOFF2 from '../assets/fonts/AIAEverest-Bold.woff2';
import AIABoldTTF from '../assets/fonts/AIAEverest-Bold.ttf';
import AIABoldSVG from '../assets/fonts/AIAEverest-Bold.svg';

import AIACondensedEOT from '../assets/fonts/AIAEverest-Condensed.eot';
import AIACondensedWOFF from '../assets/fonts/AIAEverest-Condensed.woff';
import AIACondensedWOFF2 from '../assets/fonts/AIAEverest-Condensed.woff2';
import AIACondensedTTF from '../assets/fonts/AIAEverest-Condensed.ttf';
import AIACondensedSVG from '../assets/fonts/AIAEverest-Condensed.svg';

import AIACondensedMediumEOT from '../assets/fonts/AIAEverest-CondensedMedium.eot';
import AIACondensedMediumWOFF from '../assets/fonts/AIAEverest-CondensedMedium.woff';
import AIACondensedMediumWOFF2 from '../assets/fonts/AIAEverest-CondensedMedium.woff2';
import AIACondensedMediumTTF from '../assets/fonts/AIAEverest-CondensedMedium.ttf';
import AIACondensedMediumSVG from '../assets/fonts/AIAEverest-CondensedMedium.svg';

import AIAExtraBoldEOT from '../assets/fonts/AIAEverest-ExtraBold.eot';
import AIAExtraBoldWOFF from '../assets/fonts/AIAEverest-ExtraBold.woff';
import AIAExtraBoldWOFF2 from '../assets/fonts/AIAEverest-ExtraBold.woff2';
import AIAExtraBoldTTF from '../assets/fonts/AIAEverest-ExtraBold.ttf';
import AIAExtraBoldSVG from '../assets/fonts/AIAEverest-ExtraBold.svg';

import AIAMediumEOT from '../assets/fonts/AIAEverest-Medium.eot';
import AIAMediumWOFF from '../assets/fonts/AIAEverest-Medium.woff';
import AIAMediumWOFF2 from '../assets/fonts/AIAEverest-Medium.woff2';
import AIAMediumTTF from '../assets/fonts/AIAEverest-Medium.ttf';
import AIAMediumSVG from '../assets/fonts/AIAEverest-Medium.svg';

import AIARegularEOT from '../assets/fonts/AIAEverest-Regular.eot';
import AIARegularWOFF from '../assets/fonts/AIAEverest-Regular.woff';
import AIARegularWOFF2 from '../assets/fonts/AIAEverest-Regular.woff2';
import AIARegularTTF from '../assets/fonts/AIAEverest-Regular.ttf';
import AIARegularSVG from '../assets/fonts/AIAEverest-Regular.svg';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'AIABold';
    src: url('${AIABoldEOT}');
    src: url('${AIABoldEOT}?#iefix') format('embedded-opentype'),
        url('${AIABoldWOFF}') format('woff'),
        url('${AIABoldWOFF2}') format('woff2'),
        url('${AIABoldTTF}') format('truetype'),
        url('${AIABoldSVG}#AIAEverestBold') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'AIACondensed';
    src: url('${AIACondensedEOT}');
    src: url('${AIACondensedEOT}?#iefix') format('embedded-opentype'),
        url('${AIACondensedWOFF}') format('woff'),
        url('${AIACondensedWOFF2}') format('woff2'),
        url('${AIACondensedTTF}') format('truetype'),
        url('${AIACondensedSVG}#AIAEverestCondensed') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'AIACondensedMedium';
    src: url('${AIACondensedMediumEOT}');
    src: url('${AIACondensedMediumEOT}?#iefix') format('embedded-opentype'),
        url('${AIACondensedMediumWOFF}') format('woff'),
        url('${AIACondensedMediumWOFF2}') format('woff2'),
        url('${AIACondensedMediumTTF}') format('truetype'),
        url('${AIACondensedMediumSVG}#AIAEverestCondensedMedium') format('svg');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'AIAExtraBold';
    src: url('${AIAExtraBoldEOT}');
    src: url('${AIAExtraBoldEOT}?#iefix') format('embedded-opentype'),
        url('${AIAExtraBoldWOFF}') format('woff'),
        url('${AIAExtraBoldWOFF2}') format('woff2'),
        url('${AIAExtraBoldTTF}') format('truetype'),
        url('${AIAExtraBoldSVG}#AIAEverestExtraBold') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'AIAMedium';
    src: url('${AIAMediumEOT}');
    src: url('${AIAMediumEOT}?#iefix') format('embedded-opentype'),
        url('${AIAMediumWOFF}') format('woff'),
        url('${AIAMediumWOFF2}') format('woff2'),
        url('${AIAMediumTTF}') format('truetype'),
        url('${AIAMediumSVG}#AIAEverestMedium') format('svg');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'AIARegular';
    src: url('${AIARegularEOT}');
    src: url('${AIARegularEOT}?#iefix') format('embedded-opentype'),
        url('${AIARegularWOFF}') format('woff'),
        url('${AIARegularWOFF2}') format('woff2'),
        url('${AIARegularTTF}') format('truetype'),
        url('${AIARegularSVG}#AIAEverestRegular') format('svg');
    font-weight: 400;
    font-style: normal;
  }

  body h1 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 96px;
    line-height: 84px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body h2 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 72px;
    line-height: 64px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body h3 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 48px;
    line-height: 44px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body h4 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 32px;
    line-height: 28px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body h5 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 24px;
    line-height: 22px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body h6 {
    font-family: "AIACondensedMedium", "Calibri", sans-serif;
    font-size: 20px;
    line-height: 20px;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }

  body p, ul, ol {
    font-family: "AIARegular", Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 0px;
    color: ${({ theme }) => theme.color.p3}
  }
`;

export default GlobalStyle;
