declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    smartphone?: {
      smooth?: boolean;
    };
    tablet?: {
      smooth?: boolean;
    };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
  }
}