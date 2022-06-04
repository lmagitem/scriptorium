import { ColorStop, GradientFactory } from '@pixi-essentials/gradients';
import { Shader, Geometry, RenderTexture, Renderer } from '@pixi/core';
import { Point } from '@pixi/math';
import { Mesh } from '@pixi/mesh';
import { Graphics, Ticker } from 'pixi.js';

export const ALEA_PALETTE = [
  0x110e09, 0x2c2112, 0x3b2c1a, 0x4b3a24, 0x604b34, 0x786149, 0x988066,
  0xbca58e, 0xe0cebb,
];
export const RUST_ALEA_PALETTE = [
  0x08141e, 0x202020, 0x3b2c1a, 0x4b3a24, 0x604b34, 0x786149, 0x988066,
  0xbca58e, 0x4e495f,
];
export const TEAR_PALETTE = [
  0x000000, 0x171711, 0x202215, 0x3a2802, 0x963c3c, 0xca5a2e, 0xff7831,
  0xf39949, 0xebc275,
];
export const NYX8_PALETTE = [
  0x01090f, 0x08141e, 0x0f2a3f, 0x20394f, 0x4e495f, 0x816271, 0x997577,
  0xc3a38a, 0xf6d6bd,
];
export const AMMO8_PALETTE = [
  0x000a03, 0x040c06, 0x112318, 0x1e3a29, 0x305d42, 0x4d8061, 0x89a257,
  0xbedc7f, 0xeeffcc,
];
export const WINTER_PALETTE = [
  0x111837, 0x20284e, 0x2c4a78, 0x3875a1, 0x8bcadd, 0x738d9d, 0xa7bcc9,
  0xd6e1e9, 0xffffff,
];
export const BORKFEST_PALETTE = [
  0x171711, 0x202215, 0x3a2802, 0x963c3c, 0xca5a2e, 0xff7831, 0xf39949,
  0xebc275, 0xdfd785,
];
export const SUBMERGED_PALETTE = [
  0x050219, 0x120f28, 0x2e1e5c, 0x6d4299, 0x8623ae, 0xde39e9, 0xf792e4,
  0xffd2de, 0xf7faea,
];
export const DREAMSCAPE_PALETTE = [
  0x211921, 0x543344, 0x8b4049, 0xae6a47, 0xcaa05a, 0x515262, 0x63787d,
  0x8ea091, 0xc9cca1,
];
export const COFFEE_PALETTE = [
  0x000000, 0x000000, 0x0a0a0a, 0x191919, 0x533e2d, 0xa27035, 0xb88b4a,
  0xddca7d, 0xfbf9ef,
];
export const FUNKY_PALETTE = [
  0x120826, 0x2b0f54, 0xab1f65, 0xff4f69, 0xff8142, 0xffda45, 0x3368dc,
  0x49e7ec, 0xfff7f8,
];
export const POLLEN_PALETTE = [
  0x2e242a, 0x73464c, 0xab5675, 0xee6a7c, 0xffa7a5, 0x34acba, 0x72dcbb,
  0xffe07e, 0xffe7d6,
];
export const RUST_PALETTE = [
  0x08141e, 0x202020, 0x393939, 0x725956, 0xbb7f57, 0x331c17, 0x563226,
  0xac6b26, 0xf6cd26,
];
export const SLSO_PALETTE = [
  0x00172b, 0x0d2b45, 0x203c56, 0x544e68, 0x8d697a, 0xd08159, 0xffaa5e,
  0xffd4a3, 0xffecd6,
];
export const GOOSEBUMPS_PALETTE = [
  0x000204, 0x21191c, 0x372365, 0x404b77, 0x5a85a4, 0x941434, 0xc82108,
  0xe35d08, 0xd19f22,
];
export const OILS_PALETTE = [
  0x06060a, 0x11111f, 0x1d1d33, 0x272744, 0x494d7e, 0x8b6d9c, 0xc69fa5,
  0xf2d3ab, 0xfbf5ef,
];

export class BackgroundGenerator {
  /** Draws a grid to display on top of the background. */
  public static generateGrid(
    cellSize: number,
    horizontalCells: number,
    verticalCells: number,
    smallestGridColor: number = 0x333333,
    smallGridColor: number = 0x444444,
    mediumGridColor: number = 0x444444,
    borderColor: number = 0x555555,
    doDrawBiggerSmallGrid: boolean = true,
    doDrawBiggerFives: boolean = true,
    doDrawBiggerTens: boolean = true,
    doDrawBiggerBorders: boolean = true
  ) {
    const grid = new Graphics();
    grid.beginFill(smallGridColor);
    if (doDrawBiggerSmallGrid) {
      // Thin verticals
      for (let i = 0; i <= horizontalCells; i++) {
        if (
          (doDrawBiggerTens && i % 10 === 0) ||
          (doDrawBiggerBorders && (i === 0 || i === horizontalCells))
        ) {
        } else {
          if (doDrawBiggerFives && i % 5 === 0) {
            grid.beginFill(smallGridColor);
            grid.drawRect(
              -1 + i * cellSize,
              -1,
              2,
              verticalCells * cellSize + 2
            );
          } else {
            grid.beginFill(smallestGridColor);
            grid.drawRect(+i * cellSize, 0, 1, verticalCells * cellSize);
          }
        }
      }
      // Thin horizontals
      for (let i = 0; i <= verticalCells; i++) {
        if (
          (doDrawBiggerTens && i % 10 === 0) ||
          (doDrawBiggerBorders && (i === 0 || i === verticalCells))
        ) {
        } else {
          if (doDrawBiggerFives && i % 5 === 0) {
            grid.beginFill(smallGridColor);
            grid.drawRect(
              -1,
              -1 + i * cellSize,
              horizontalCells * cellSize + 2,
              2
            );
          } else {
            grid.beginFill(smallestGridColor);
            grid.drawRect(0, 0 + i * cellSize, horizontalCells * cellSize, 1);
          }
        }
      }
    }
    if (doDrawBiggerTens) {
      // Medium verticals
      for (let i = 0; i <= horizontalCells; i++) {
        if (doDrawBiggerBorders && (i === 0 || i === horizontalCells)) {
        } else if (i % 10 === 0) {
          grid.beginFill(mediumGridColor);
          grid.drawRect(-1 + i * cellSize, -1, 3, verticalCells * cellSize + 3);
        }
      }
      // Medium horizontals
      for (let i = 0; i <= verticalCells; i++) {
        if (doDrawBiggerBorders && (i === 0 || i === verticalCells)) {
        } else if (i % 10 === 0) {
          grid.beginFill(mediumGridColor);
          grid.drawRect(
            -1,
            -1 + i * cellSize,
            horizontalCells * cellSize + 3,
            3
          );
        }
      }
    }
    if (doDrawBiggerBorders) {
      // Thick verticals
      for (let i = 0; i <= horizontalCells; i++) {
        if (i === 0 || i === horizontalCells) {
          grid.beginFill(borderColor);
          grid.drawRect(
            -5 + i * cellSize,
            -5,
            10,
            verticalCells * cellSize + 10
          );
        }
      }
      // Thick horizontals
      for (let i = 0; i <= verticalCells; i++) {
        if (i === 0 || i === verticalCells) {
          grid.beginFill(borderColor);
          grid.drawRect(
            -5,
            -5 + i * cellSize,
            horizontalCells * cellSize + 10,
            10
          );
        }
      }
    }
    grid.endFill();
    return grid;
  }

  /** Uses the awesome space background shader by Deep-Fold {@link https://github.com/Deep-Fold/PixelSpace} to generate dust clouds. */
  public static generateDustClouds(
    seed: number,
    size: number,
    width: number,
    height: number,
    pixels: number,
    palette: number[],
    renderer: Renderer,
    circles = true
  ): Mesh<Shader> {
    const widthRatio = BackgroundGenerator.getWidthRatio(width, height);
    const heightRatio = BackgroundGenerator.getHeightRatio(height, width);
    const geometry = BackgroundGenerator.getGeometry(
      width,
      height,
      widthRatio,
      heightRatio
    );
    const colorscheme = BackgroundGenerator.getColorScheme(palette, renderer);
    const dustShader = Shader.from(
      `
            precision mediump float;
            attribute vec2 aVertexPosition;
            attribute vec2 aUvs;
            uniform mat3 translationMatrix;
            uniform mat3 projectionMatrix;
            varying vec2 vUvs;

            void main() {
                vUvs = aUvs;
                gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            }
        `,
      `
            varying vec2 vUvs;

            uniform float seed;
            uniform float size;
            uniform float pixels;
            uniform float ratio;
            uniform bool reduce_background;
            uniform sampler2D colorscheme;
            uniform bool should_tile;
            uniform bool circles;
            uniform vec2 uv_correct;

            float rand(vec2 coord, float tilesize) {
                if (should_tile) {
                    coord = mod(coord / uv_correct, tilesize );
                }

                return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * (15.5453 + seed));
            }

            bool dither(vec2 uv1, vec2 uv2) {
                return mod(uv1.y+uv2.x,2./pixels)<=1./pixels;
            }

            float noise(vec2 coord, float tilesize){
                vec2 i = floor(coord);
                vec2 f = fract(coord);
                    
                float a = rand(i, tilesize);
                float b = rand(i + vec2(1.0, 0.0), tilesize);
                float c = rand(i + vec2(0.0, 1.0), tilesize);
                float d = rand(i + vec2(1.0, 1.0), tilesize);

                vec2 cubic = f * f * (3.-2.0 * f);

                return mix(a, b, cubic.x) + (c - a) * cubic.y * (1.-cubic.x) + (d - b) * cubic.x * cubic.y;
            }

            float circleNoise(vec2 uv, float tilesize) {
                if (should_tile) {
                    uv = mod(uv, tilesize);
                }
                
                float uv_y = floor(uv.y);
                uv.x += uv_y*.31;
                vec2 f = fract(uv);
                float h = rand(vec2(floor(uv.x),floor(uv_y)), tilesize);
                float m = (length(f-0.25-(h*0.5)));
                float r = h*0.25;
                return smoothstep(0.0, r, m*0.75);
            }

            float fbm(vec2 coord, float tilesize){
                float value = 0.0;
                float scale = 0.5;

                for(int i = 0; i < ${20 /** OCTAVES */} ; i++){
                    value += noise(coord, tilesize) * scale;
                    coord *= 2.0;
                    scale *= 0.5;
                }
                return value;
            }

            float cloud_alpha(vec2 uv, float tilesize) {
                float c_noise = 0.0;
                
                // more iterations for more turbulence
                if (circles) {
                  for (int i = 0; i < ${2 /** iterations */}; i++) {
                      c_noise += circleNoise(uv * 0.5 + (float(i+1)) + vec2(-0.3, 0.0), ceil(tilesize * 0.5));
                  }
                }
                float fbm = fbm(uv+c_noise, tilesize);
                
                return fbm;
            }

            void main() {
                // pixelizing and dithering
                vec2 uv = floor((vec2(vUvs.x*ratio,1.-vUvs.y)) * pixels) / pixels * uv_correct;
                bool dith = dither(uv, vec2(vUvs.x,1.-vUvs.y));
                
                // noise for the dust
                // the + vec2(x,y) is to create an offset in noise values
                float n_alpha = fbm(uv * ceil(size * 0.5) +vec2(2,2), ceil(size * 0.5));
                float n_dust = cloud_alpha(uv * size, size);
                float n_dust2 = fbm(uv * ceil(size * 0.2)  -vec2(2,2),ceil(size * 0.2));
                float n_dust_lerp = n_dust2 * n_dust;

                // apply dithering
                if (dith) {
                    n_dust_lerp *= 0.95;
                }

                // choose alpha value
                float a_dust = step(n_alpha , n_dust_lerp * 1.8);
                n_dust_lerp = pow(n_dust_lerp, 3.2) * 56.0;
                if (dith) {
                    n_dust_lerp *= 1.1;
                }
                
                // choose & apply colors
                if (reduce_background) {
                    n_dust_lerp = pow(n_dust_lerp, 0.8) * 0.7;
                }
                
                float col_value = floor(n_dust_lerp) / 7.0;
                vec3 col = texture2D(colorscheme, vec2(col_value, 0.0)).rgb;
                
                gl_FragColor = vec4(col, a_dust);
            }
        `,
      {
        size,
        seed,
        circles,
        pixels,
        should_tile: false,
        reduce_background: false,
        uv_correct:
          width > height
            ? new Point(width / height, 1.0)
            : new Point(1.0, height / width),
        ratio: height / width,
        colorscheme,
      }
    );
    return new Mesh(geometry, dustShader);
  }

  /** Uses the awesome space background shader by Deep-Fold {@link https://github.com/Deep-Fold/PixelSpace} to generate nebulae clouds. */
  public static generateNebulae(
    seed: number,
    size: number,
    width: number,
    height: number,
    pixels: number,
    palette: number[],
    renderer: Renderer
  ): Mesh<Shader> {
    const widthRatio = BackgroundGenerator.getWidthRatio(width, height);
    const heightRatio = BackgroundGenerator.getHeightRatio(height, width);
    const geometry = BackgroundGenerator.getGeometry(
      width,
      height,
      widthRatio,
      heightRatio
    );
    const colorscheme = BackgroundGenerator.getColorScheme(palette, renderer);
    const nebulaeShader = Shader.from(
      `
        precision mediump float;
        attribute vec2 aVertexPosition;
        attribute vec2 aUvs;
        uniform mat3 translationMatrix;
        uniform mat3 projectionMatrix;
        varying vec2 vUvs;

        void main() {
            vUvs = aUvs;
            gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        }
    `,
      `

    `,
      {
        size,
        seed,
        pixels,
        should_tile: false,
        reduce_background: false,
        uv_correct:
          width > height
            ? new Point(width / height, 1.0)
            : new Point(1.0, height / width),
        colorscheme,
      }
    );
    return new Mesh(geometry, nebulaeShader);
  }

  /** Uses the awesome space background shader by Deep-Fold {@link https://github.com/Deep-Fold/PixelSpace} to generate stars. */
  public static generateStars(
    seed: number,
    size: number,
    width: number,
    height: number,
    pixels: number,
    palette: number[],
    renderer: Renderer
  ): Mesh<Shader> {
    const widthRatio = BackgroundGenerator.getWidthRatio(width, height);
    const heightRatio = BackgroundGenerator.getHeightRatio(height, width);
    const geometry = BackgroundGenerator.getGeometry(
      width,
      height,
      widthRatio,
      heightRatio
    );
    const colorscheme = BackgroundGenerator.getColorScheme(palette, renderer);
    const starsShader = Shader.from(
      `
        precision mediump float;
        attribute vec2 aVertexPosition;
        attribute vec2 aUvs;
        uniform mat3 translationMatrix;
        uniform mat3 projectionMatrix;
        varying vec2 vUvs;

        void main() {
            vUvs = aUvs;
            gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        }
    `,
      `
            varying vec2 vUvs;
            uniform float time;
            uniform float seed;
            uniform float size;
            uniform float pixels;
            uniform sampler2D colorscheme;
            uniform vec2 uv_correct;

            float random(vec2 ab) 
            {
              float f = (cos(dot(ab ,vec2(21.9898,78.233))) * 43758.5453);
              return fract(f);
            }

            float noise(in vec2 xy) 
            {
              vec2 ij = floor(xy);
              // vec2 uv = floor((vec2(vUvs.x*0.5,1.-vUvs.y)) * pixels) / pixels * uv_correct;
              vec2 uv = xy-ij;
              uv = uv*uv*(3.0-2.0*uv);

              float a = random(vec2(ij.x, ij.y ));
              float b = random(vec2(ij.x+1., ij.y));
              float c = random(vec2(ij.x, ij.y+1.));
              float d = random(vec2(ij.x+1., ij.y+1.));
              float k0 = a;
              float k1 = b-a;
              float k2 = c-a;
              float k3 = a-b-c+d;
              return (k0 + k1*uv.x + k2*uv.y + k3*uv.x*uv.y);
            }

            void main() {
              float color = pow(noise(gl_FragCoord.xy), 30.0) * 50.0;

              float r1 = noise(gl_FragCoord.xy*noise(vec2(sin(time*0.01))));
              float r2 =  noise(gl_FragCoord.xy*noise(vec2(cos(time*0.01), sin(time*0.01))));
              float r3 = noise(gl_FragCoord.xy*noise(vec2(sin(time*0.05), cos(time*0.05))));
                
              gl_FragColor  = vec4(vec3(color*r1*0.5, color*r2*0.4, color*r3*0.3), 0.0);
            }
    `,
      {
        time: 0,
        size,
        seed,
        pixels,
        should_tile: false,
        reduce_background: false,
        uv_correct:
          width > height
            ? new Point(width / height, 1.0)
            : new Point(1.0, height / width),
        colorscheme,
      }
    );
    const ticker = new Ticker();
    ticker.add(() => (starsShader.uniforms.time += 1 / 200));
    ticker.start();
    return new Mesh(geometry, starsShader);
  }

  /** Returns a width ratio from given parameters. */
  private static getWidthRatio(width: number, height: number) {
    return width > height ? width / height : 1;
  }

  /** Returns a height ratio from given parameters. */
  private static getHeightRatio(height: number, width: number) {
    return height > width ? height / width : 1;
  }

  /** Returns a Geometry object to build a Mesh. */
  private static getGeometry(
    width: number,
    height: number,
    widthRatio: number,
    heightRatio: number
  ): Geometry {
    return new Geometry()
      .addAttribute(
        'aVertexPosition',
        [0, 0, width, 0, width, height, 0, height],
        2
      ) // the size of the attribute
      .addAttribute(
        'aUvs',
        [0, 0, widthRatio, 0, widthRatio, heightRatio, 0, heightRatio],
        2
      ) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3]);
  }

  /** Returns a texture to be used to render a gradient. */
  private static getColorScheme(
    palette: number[],
    renderer: Renderer
  ): RenderTexture {
    const colorStops: ColorStop[] = [];
    for (let i = 0; i < palette.length; i++) {
      const color = palette[i];
      const offset = (1 / palette.length) * i;
      colorStops.push({ color, offset });
    }
    return GradientFactory.createLinearGradient(
      renderer,
      RenderTexture.create({ width: colorStops.length, height: 1 }),
      {
        x0: 1,
        y0: 0,
        x1: colorStops.length,
        y1: 0,
        colorStops,
      }
    );
  }
}
