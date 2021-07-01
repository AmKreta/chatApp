import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  /* width */
  ::-webkit-scrollbar {
        width: 5px;
        height:5px;
        cursor: pointer;
    }

     /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background:${props => props.theme.primary.light};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
         background: ${props => props.theme.primary.light};
    }
`;

export default globalStyle;