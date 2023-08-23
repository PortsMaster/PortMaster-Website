import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class SkeletonTextDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL2xpYi9za2VsZXRvbi10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVdqRCxNQUFNLE9BQU8scUJBQXFCO0lBR2hDLGdCQUFlLENBQUM7O2tIQUhMLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBVGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxlQUFlO3dCQUN0Qiw4QkFBOEIsRUFBRSxtQkFBbUI7d0JBQ25ELCtCQUErQixFQUFFLG9CQUFvQjt3QkFDckQsOEJBQThCLEVBQUUseUNBQXlDO3FCQUMxRTtpQkFDRjswRUFFVSxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTa2VsZXRvbkVmZmVjdHMgfSBmcm9tICcuL3NrZWxldG9uRWZmZWN0JztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tza2VsZXRvbi10ZXh0XScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3NrZWxldG9uLXRleHQnLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LWZhZGVdJzogJ2VmZmVjdCA9PT0gXCJmYWRlXCInLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LXB1bHNlXSc6ICdlZmZlY3QgPT09IFwicHVsc2VcIicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3Qtd2F2ZV0nOiAnZWZmZWN0ID09PSBcImJsaW5rXCIgfHwgZWZmZWN0ID09PSBcIndhdmVcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNrZWxldG9uVGV4dERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGVmZmVjdDogU2tlbGV0b25FZmZlY3RzO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==