let black = { rgb: 0xffffff };
let white = { rgb: 0x000000 };

swap(black, white);

console.log(black.rgb, white.rgb);

function swap(p, q) {
    p = q;
    q = p;
}