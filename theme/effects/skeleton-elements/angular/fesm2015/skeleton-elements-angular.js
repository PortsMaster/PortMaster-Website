import * as i0 from '@angular/core';
import { Component, Input, Directive, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class SkeletonBlockComponent {
}
SkeletonBlockComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonBlockComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SkeletonBlockComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonBlockComponent, selector: "skeleton-block", inputs: { width: "width", height: "height", effect: "effect", borderRadius: "borderRadius" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"", "style.width": "width", "style.height": "height", "style.border-radius": "borderRadius" }, classAttribute: "skeleton-block" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonBlockComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'skeleton-block',
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'skeleton-block',
                        '[class.skeleton-effect-fade]': 'effect === "fade"',
                        '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                        '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                        '[style.width]': 'width',
                        '[style.height]': 'height',
                        '[style.border-radius]': 'borderRadius',
                    },
                }]
        }], propDecorators: { width: [{
                type: Input
            }], height: [{
                type: Input
            }], effect: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }] } });

function multiplySvgPointsService(points, iconSize, width, height) {
    const iconMaxSize = Math.min(width, height) * 0.5;
    const scale = iconMaxSize / iconSize;
    return points.replace(/([0-9,\.]{1,})/g, (coords) => {
        const [_x, _y] = coords.split(',').map((p) => parseFloat(p));
        const x = _x * scale + width / 2 - (iconSize * scale) / 2;
        const y = _y * scale + height / 2 - (iconSize * scale) / 2;
        if (iconMaxSize >= 100) {
            return `${Math.round(x)},${Math.round(y)}`;
        }
        return `${x},${y}`;
    });
}

class SkeletonAvatarComponent {
    constructor() {
        this.size = 48;
        this.showIcon = true;
        this.borderRadius = '50%';
    }
    multiplyPoints(pointsString) {
        return multiplySvgPointsService(pointsString, 56, this.size, this.size);
    }
}
SkeletonAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SkeletonAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonAvatarComponent, selector: "skeleton-avatar", inputs: { size: "size", color: "color", showIcon: "showIcon", iconColor: "iconColor", borderRadius: "borderRadius", effect: "effect" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-avatar" }, ngImport: i0, template: `<svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="'0 0 ' + size + ' ' + size"
      preserveAspectRatio="none"
    >
      <rect
        [attr.width]="size"
        [attr.height]="size"
        fillRule="evenodd"
        [style.fill]="color"
        [attr.rx]="borderRadius"
      />
      <path
        *ngIf="showIcon"
        [style.fill]="iconColor"
        [attr.d]="
          multiplyPoints(
            'M28.22461,27.1590817 C34.9209931,27.1590817 40.6829044,21.1791004 40.6829044,13.3926332 C40.6829044,5.69958662 34.8898972,0 28.22461,0 C21.5594557,0 15.7663156,5.82423601 15.7663156,13.4549579 C15.7663156,21.1791004 21.5594557,27.1590817 28.22461,27.1590817 Z M8.66515427,56 L47.7841986,56 C52.6739629,56 54.4181241,54.5984253 54.4181241,51.8576005 C54.4181241,43.8219674 44.358068,32.7341519 28.22461,32.7341519 C12.0600561,32.7341519 2,43.8219674 2,51.8576005 C2,54.5984253 3.74402832,56 8.66515427,56 Z'
          )
        "
      />
    </svg>
    <ng-content></ng-content>`, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'skeleton-avatar',
                    host: {
                        class: 'skeleton-avatar',
                        '[class.skeleton-effect-fade]': 'effect === "fade"',
                        '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                        '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                    },
                    template: `<svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="'0 0 ' + size + ' ' + size"
      preserveAspectRatio="none"
    >
      <rect
        [attr.width]="size"
        [attr.height]="size"
        fillRule="evenodd"
        [style.fill]="color"
        [attr.rx]="borderRadius"
      />
      <path
        *ngIf="showIcon"
        [style.fill]="iconColor"
        [attr.d]="
          multiplyPoints(
            'M28.22461,27.1590817 C34.9209931,27.1590817 40.6829044,21.1791004 40.6829044,13.3926332 C40.6829044,5.69958662 34.8898972,0 28.22461,0 C21.5594557,0 15.7663156,5.82423601 15.7663156,13.4549579 C15.7663156,21.1791004 21.5594557,27.1590817 28.22461,27.1590817 Z M8.66515427,56 L47.7841986,56 C52.6739629,56 54.4181241,54.5984253 54.4181241,51.8576005 C54.4181241,43.8219674 44.358068,32.7341519 28.22461,32.7341519 C12.0600561,32.7341519 2,43.8219674 2,51.8576005 C2,54.5984253 3.74402832,56 8.66515427,56 Z'
          )
        "
      />
    </svg>
    <ng-content></ng-content>`,
                }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], effect: [{
                type: Input
            }] } });

class SkeletonTextDirective {
    constructor() { }
}
SkeletonTextDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonTextDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SkeletonTextDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonTextDirective, selector: "[skeleton-text]", inputs: { effect: "effect" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-text" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonTextDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[skeleton-text]',
                    host: {
                        class: 'skeleton-text',
                        '[class.skeleton-effect-fade]': 'effect === "fade"',
                        '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                        '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                    },
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { effect: [{
                type: Input
            }] } });

class SkeletonImageComponent {
    constructor() {
        this.width = 1200;
        this.height = 600;
        this.showIcon = true;
    }
    multiplyPoints(pointsString) {
        return multiplySvgPointsService(pointsString, 56, this.width, this.height);
    }
}
SkeletonImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SkeletonImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonImageComponent, selector: "skeleton-image", inputs: { width: "width", height: "height", color: "color", showIcon: "showIcon", iconColor: "iconColor", effect: "effect", borderRadius: "borderRadius" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-image" }, ngImport: i0, template: `<svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width"
      [attr.height]="height"
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
      [style.border-radius]="borderRadius"
      preserveAspectRatio="none"
    >
      <polygon
        [style.fill]="color"
        fillRule="evenodd"
        [attr.points]="
          '0 0 ' + width + ' 0 ' + width + ' ' + height + ' 0 ' + height
        "
      />
      <path
        *ngIf="showIcon"
        [style.fill]="iconColor"
        [attr.d]="
          multiplyPoints(
            'M7.7148,49.5742 L48.2852,49.5742 C53.1836,49.5742 55.6446,47.1367 55.6446,42.3086 L55.6446,13.6914 C55.6446,8.8633 53.1836,6.4258 48.2852,6.4258 L7.7148,6.4258 C2.8398,6.4258 0.3554,8.8398 0.3554,13.6914 L0.3554,42.3086 C0.3554,47.1602 2.8398,49.5742 7.7148,49.5742 Z M39.2851,27.9414 C38.2304,27.0039 37.0351,26.5118 35.7695,26.5118 C34.457,26.5118 33.3085,26.9571 32.2304,27.918 L21.6366,37.3867 L17.3007,33.4492 C16.3163,32.582 15.2617,32.1133 14.1366,32.1133 C13.1054,32.1133 12.0976,32.5586 11.1366,33.4258 L4.1288,39.7305 L4.1288,13.8789 C4.1288,11.4414 5.4413,10.1992 7.7851,10.1992 L48.2147,10.1992 C50.535,10.1992 51.8708,11.4414 51.8708,13.8789 L51.8708,39.7539 L39.2851,27.9414 Z M17.8163,28.1992 C20.8398,28.1992 23.3241,25.7149 23.3241,22.668 C23.3241,19.6445 20.8398,17.1367 17.8163,17.1367 C14.7695,17.1367 12.2851,19.6445 12.2851,22.668 C12.2851,25.7149 14.7695,28.1992 17.8163,28.1992 Z'
          )
        "
      />
    </svg>
    <ng-content></ng-content>`, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'skeleton-image',
                    host: {
                        class: 'skeleton-image',
                        '[class.skeleton-effect-fade]': 'effect === "fade"',
                        '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                        '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                    },
                    template: `<svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="width"
      [attr.height]="height"
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
      [style.border-radius]="borderRadius"
      preserveAspectRatio="none"
    >
      <polygon
        [style.fill]="color"
        fillRule="evenodd"
        [attr.points]="
          '0 0 ' + width + ' 0 ' + width + ' ' + height + ' 0 ' + height
        "
      />
      <path
        *ngIf="showIcon"
        [style.fill]="iconColor"
        [attr.d]="
          multiplyPoints(
            'M7.7148,49.5742 L48.2852,49.5742 C53.1836,49.5742 55.6446,47.1367 55.6446,42.3086 L55.6446,13.6914 C55.6446,8.8633 53.1836,6.4258 48.2852,6.4258 L7.7148,6.4258 C2.8398,6.4258 0.3554,8.8398 0.3554,13.6914 L0.3554,42.3086 C0.3554,47.1602 2.8398,49.5742 7.7148,49.5742 Z M39.2851,27.9414 C38.2304,27.0039 37.0351,26.5118 35.7695,26.5118 C34.457,26.5118 33.3085,26.9571 32.2304,27.918 L21.6366,37.3867 L17.3007,33.4492 C16.3163,32.582 15.2617,32.1133 14.1366,32.1133 C13.1054,32.1133 12.0976,32.5586 11.1366,33.4258 L4.1288,39.7305 L4.1288,13.8789 C4.1288,11.4414 5.4413,10.1992 7.7851,10.1992 L48.2147,10.1992 C50.535,10.1992 51.8708,11.4414 51.8708,13.8789 L51.8708,39.7539 L39.2851,27.9414 Z M17.8163,28.1992 C20.8398,28.1992 23.3241,25.7149 23.3241,22.668 C23.3241,19.6445 20.8398,17.1367 17.8163,17.1367 C14.7695,17.1367 12.2851,19.6445 12.2851,22.668 C12.2851,25.7149 14.7695,28.1992 17.8163,28.1992 Z'
          )
        "
      />
    </svg>
    <ng-content></ng-content>`,
                }]
        }], propDecorators: { width: [{
                type: Input
            }], height: [{
                type: Input
            }], color: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], effect: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }] } });

class SkeletonElementsModule {
}
SkeletonElementsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonElementsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonElementsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonElementsModule, declarations: [SkeletonBlockComponent,
        SkeletonAvatarComponent,
        SkeletonTextDirective,
        SkeletonImageComponent], imports: [CommonModule], exports: [SkeletonBlockComponent,
        SkeletonAvatarComponent,
        SkeletonTextDirective,
        SkeletonImageComponent] });
SkeletonElementsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonElementsModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0, type: SkeletonElementsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SkeletonBlockComponent,
                        SkeletonAvatarComponent,
                        SkeletonTextDirective,
                        SkeletonImageComponent,
                    ],
                    exports: [
                        SkeletonBlockComponent,
                        SkeletonAvatarComponent,
                        SkeletonTextDirective,
                        SkeletonImageComponent,
                    ],
                    imports: [CommonModule],
                }]
        }] });

/*
 * Public API Surface of angular
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SkeletonAvatarComponent, SkeletonBlockComponent, SkeletonElementsModule, SkeletonImageComponent, SkeletonTextDirective };
//# sourceMappingURL=skeleton-elements-angular.js.map
