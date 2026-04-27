import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    body {
        font-family: ${({theme}) => theme.fonts.sans};
        color: ${({theme}) => theme.colors.text};
        background: ${({theme}) => theme.colors.bg};
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: ${({theme}) => theme.colors.accent};
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    h1, h2, h3 {
        margin: 0 0 0.5rem;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    h1 {
        font-size: 1.6rem;
    }

    h2 {
        font-size: 1.15rem;
    }

    button {
        font-family: inherit;
    }
`
