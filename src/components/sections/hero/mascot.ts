export interface Eye {
  x: number;
  y: number;
  radius: number;
}

export interface MascotArt {
  src: string;
  width: number;
  height: number;
  eyes: readonly Eye[];
}

export const MASCOT: MascotArt = {
  src: "/mascot.png",
  width: 512,
  height: 448,
  eyes: [
    { x: 167, y: 232, radius: 19 },
    { x: 335, y: 237, radius: 19 },
  ],
};
