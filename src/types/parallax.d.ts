/**
 * Declaraciones de tipos para bibliotecas de parallax
 */

// Declaración para rellax.js
declare module 'rellax' {
  interface RellaxOptions {
    speed?: number;
    center?: boolean;
    wrapper?: string | null;
    round?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
    callback?: (positions: { x: number; y: number }[]) => void;
  }

  class Rellax {
    constructor(el: string | HTMLElement, options?: RellaxOptions);
    refresh(): void;
    destroy(): void;
  }

  export default Rellax;
}

// Declaración para simple-parallax-js
declare module 'simple-parallax-js' {
  interface SimpleParallaxOptions {
    orientation?: 'up' | 'down' | 'left' | 'right';
    scale?: number;
    overflow?: boolean;
    delay?: number;
    transition?: string;
    customContainer?: string | HTMLElement;
    customWrapper?: string | HTMLElement;
    maxTransition?: number;
  }

  class SimpleParallax {
    constructor(el: string | HTMLElement | NodeListOf<Element>, options?: SimpleParallaxOptions);
    destroy(): void;
  }

  export default SimpleParallax;
}

// Declaración para scrollreveal
declare module 'scrollreveal' {
  interface ScrollRevealOptions {
    delay?: number;
    distance?: string;
    duration?: number;
    easing?: string;
    interval?: number;
    opacity?: number;
    origin?: 'top' | 'right' | 'bottom' | 'left';
    rotate?: { x: number; y: number; z: number };
    scale?: number;
    cleanup?: boolean;
    container?: HTMLElement;
    desktop?: boolean;
    mobile?: boolean;
    reset?: boolean;
    useDelay?: 'always' | 'once' | 'onload';
    viewFactor?: number;
    viewOffset?: { top: number; right: number; bottom: number; left: number };
    afterReset?: (el: HTMLElement) => void;
    afterReveal?: (el: HTMLElement) => void;
    beforeReset?: (el: HTMLElement) => void;
    beforeReveal?: (el: HTMLElement) => void;
  }

  interface ScrollRevealObject {
    reveal(
      target: string | HTMLElement | NodeListOf<Element>,
      options?: ScrollRevealOptions,
      interval?: number
    ): ScrollRevealObject;
    sync(): void;
  }

  function ScrollReveal(options?: ScrollRevealOptions): ScrollRevealObject;
  
  export default ScrollReveal;
}
