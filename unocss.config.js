import presetWeapp from 'unocss-preset-weapp'
import {defaultAttributes, extractorAttributify, transformerClass} from 'unocss-preset-weapp/transformer'

// 增加自定义属性b 书写border属性
const {presetWeappAttributify, transformerAttributify} = extractorAttributify({
    attributes: [...defaultAttributes, 'b'],
})
export default {
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp({
            // whRpx: false,
        }),
        // attributify autocomplete
        presetWeappAttributify(),
    ],
    rules: [
        [/^m-(\d*)$/, ([, d]) => ({margin: `${d}rpx`})],
        // 设置margin-top不会自动 10rpx -> 80rpx
        [/^m(t|b|l|r*)-(\d*)$/, ([, t, d]) => {
            const map = {
                t: 'top',
                b: 'bottom',
                l: 'left',
                r: 'right',
            }
            return ({[t ? `margin-${map[t]}` : 'margin']: `${d}rpx`})
        }],
    ],
    shortcuts: [
        // position
        ['pr', 'relative'],
        ['pa', 'absolute'],
        ['pf', 'fixed'],
        ['ps', 'sticky'],
        // display:flex;align-items:center
        [
            'f-c',
            'flex items-center'
        ],
        // flex-direction: column;
        [
            'f-col',
            'flex-col'
        ],
        // flex-wrap: wrap
        [
            'f-w',
            'flex-wrap'
        ],
        // flex动态样式布局
        [
            /^f-((c|s|e)(-(c|s|e|b|a))*)$/,
            ([, , g1, , g2]) => {
                let style = ``;
                const temps = [
                    {k: "c", v: "center"},
                    {k: "s", v: "start"},
                    {k: "e", v: "end"},
                    {k: "b", v: "between"},
                    {k: "a", v: "around"}
                ];

                const r1 = temps.find(i => i.k == g1);
                style = `flex items-${r1?.v || "center"} content-${r1?.v || "center"}`;

                if (g2) {
                    const r2 = temps.find(i => i.k == g2);
                    style += ` justify-${r2?.v || "center"}`;
                }

                return style;
            }
        ]
    ],
    transformers: [
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify(),

        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
    ]
}
