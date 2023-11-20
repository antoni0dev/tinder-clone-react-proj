import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
    }

    html, body {
        height: 100%;
    }

    body {
        line-height: 1.5;
        font-family: 'Readex Pro', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    img, picture, video, canvas {
        display: block;
        max-width: 100%;
    }

    input, button, textarea, select {
        font: inherit
    }

    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }

    #root {
        isolation: isolate;
    }
`;

export default GlobalStyle;
