import { defineMermaidSetup } from '@slidev/types'

const DB_RED = '#FF002B';
const COLD_BLACK = '#090F1B';
const LILAC = '#AA99FF';
const S_BAHN_GREEN = '#408335';
const WHITE = "#FFFFFF";


export default defineMermaidSetup(() => {
    return {
        theme: 'base',
        themeVariables: {
            // @TODO darkmode
            primaryColor: COLD_BLACK,
            primaryTextColor: WHITE,
            lineColor: DB_RED,
            edgeLabelBackground: LILAC,
        }
    }
})