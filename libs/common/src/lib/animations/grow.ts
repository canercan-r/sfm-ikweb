import { animate, animation, AnimationMetadata, AnimationReferenceMetadata, style } from "@angular/animations";

interface IAnimationParams {
  delay: string;
  duration: string;
  easing: any;
  startOpacity?: number;
  endOpacity?: number;
  startAngle?: number;
  endAngle?: number;
  startDistance?: string;
  endDistance?: string;
  fromPosition?: string;
  toPosition?: string;
  fromScale?: number;
  midScale?: number;
  toScale?: number;
  xPos?: string;
  yPos?: string;
  direction?: string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  startHeight?: string;
  endHeight?: string;
}

const base: AnimationMetadata[] = [
  style({
    opacity: `{{ startOpacity }}`,
    height: `{{ startHeight }}`,
  }),
  animate(
    `{{duration}} {{delay}} {{easing}}`,
    style({
      opacity: `{{ endOpacity }}`,
      height: `{{ endHeight }}`,
    })
  ),
];

enum EaseIn {
  quad = `cubic-bezier(0.550, 0.085, 0.680, 0.530)` as any,
  cubic = `cubic-bezier(0.550, 0.055, 0.675, 0.190)` as any,
  quart = `cubic-bezier(0.895, 0.030, 0.685, 0.220)` as any,
  quint = `cubic-bezier(0.755, 0.050, 0.855, 0.060)` as any,
  sine = `cubic-bezier(0.470, 0.000, 0.745, 0.715)` as any,
  expo = `cubic-bezier(0.950, 0.050, 0.795, 0.035)` as any,
  circ = `cubic-bezier(0.600, 0.040, 0.980, 0.335)` as any,
  back = `cubic-bezier(0.600, -0.280, 0.735, 0.045)` as any,
}

enum EaseOut {
  quad = `cubic-bezier(0.250, 0.460, 0.450, 0.940)` as any,
  cubic = `cubic-bezier(0.215, 0.610, 0.355, 1.000)` as any,
  quart = `cubic-bezier(0.165, 0.840, 0.440, 1.000)` as any,
  quint = `cubic-bezier(0.230, 1.000, 0.320, 1.000)` as any,
  sine = `cubic-bezier(0.390, 0.575, 0.565, 1.000)` as any,
  expo = `cubic-bezier(0.190, 1.000, 0.220, 1.000)` as any,
  circ = `cubic-bezier(0.075, 0.820, 0.165, 1.000)` as any,
  back = `cubic-bezier(0.175, 0.885, 0.320, 1.275)` as any,
}

const baseParams: IAnimationParams = {
  delay: '0s',
  duration: '350ms',
  easing: EaseIn.quad,
  startOpacity: 0,
  endOpacity: 1,
  startHeight: '',
  endHeight: '',
};

export const growVerIn: AnimationReferenceMetadata = animation(base, {
  params: {
    ...baseParams,
    easing: EaseOut.quad,
    startOpacity: 0,
    endOpacity: 1,
    startHeight: '0px',
    endHeight: '*',
  },
});

export const growVerOut: AnimationReferenceMetadata = animation(base, {
  params: {
    ...baseParams,
    easing: EaseOut.quad,
    startOpacity: 1,
    endOpacity: 0,
    startHeight: '*',
    endHeight: '0px',
  },
});
