import { SkeletonEffects } from './skeletonEffect';
import * as i0 from "@angular/core";
export declare class SkeletonImageComponent {
    width: number;
    height: number;
    color: string;
    showIcon: boolean;
    iconColor: string;
    effect: SkeletonEffects;
    borderRadius: string;
    multiplyPoints(pointsString: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkeletonImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SkeletonImageComponent, "skeleton-image", never, { "width": "width"; "height": "height"; "color": "color"; "showIcon": "showIcon"; "iconColor": "iconColor"; "effect": "effect"; "borderRadius": "borderRadius"; }, {}, never, ["*"]>;
}
