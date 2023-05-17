export class Palette {
    constructor(hexColor, goodPractice, highContrast) {
        let hsl = hexToHsl(hexColor);

        let h = hsl[0];
        let s = hsl[1];
        let l = hsl[2];

        if (goodPractice == null) {
            goodPractice = true;
        }
        if (goodPractice == null) {
            goodPractice = false;
        }

        if (goodPractice) {
            l = Math.max(70, l);
            s = Math.min(70, s);
            if (s != 0) {
                s = Math.max(50, s);
            } else {
                l = 100;
            }
        }

        if (highContrast) {
            this.baseColor = hexColor;
            this.raw = {};
            this.raw.v100 = [h, s, 90];
            this.raw.v90 = [h, s, 90];
            this.raw.v80 = [h, s, 90];
            this.raw.v70 = [h, s, 70];
            this.raw.v60 = [h, s, 70];
            this.raw.v50 = [h, s, 70];
            this.raw.v40 = [h, s, 30];
            this.raw.v30 = [h, s, 30];
            this.raw.v20 = [h, s, 30];
            this.raw.v10 = [h, s, 10];
            this.raw.v5 = [h, s, 0];
            this.raw.v1 = [h, s, 0];
            return;
        }

        this.baseColor = hexColor;
        this.raw = {};
        this.raw.v100 = [h, s, (l / 100 * 100)];
        this.raw.v90 = [h, s, (l / 100 * 90)];
        this.raw.v80 = [h, s, (l / 100 * 80)];
        this.raw.v70 = [h, s, (l / 100 * 70)];
        this.raw.v60 = [h, s, (l / 100 * 60)];
        this.raw.v50 = [h, s, (l / 100 * 50)];
        this.raw.v40 = [h, s, (l / 100 * 40)];
        this.raw.v30 = [h, s, (l / 100 * 30)];
        this.raw.v20 = [h, s, (l / 100 * 20)];
        this.raw.v10 = [h, s, (l / 100 * 10)];
        this.raw.v5 = [h, s, (l / 100 * 5)];
        this.raw.v1 = [h, s, (l / 100 * 1)];
    }
}

export function hexToHsl(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return [h, s, l];
}