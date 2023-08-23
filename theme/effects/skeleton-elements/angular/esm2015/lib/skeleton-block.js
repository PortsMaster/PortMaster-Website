import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class SkeletonBlockComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhci9saWIvc2tlbGV0b24tYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZWpELE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7dUdBQXRCLHNCQUFzQixrZUFYdkIsMkJBQTJCOzJGQVcxQixzQkFBc0I7a0JBYmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxnQkFBZ0I7d0JBQ3ZCLDhCQUE4QixFQUFFLG1CQUFtQjt3QkFDbkQsK0JBQStCLEVBQUUsb0JBQW9CO3dCQUNyRCw4QkFBOEIsRUFBRSx5Q0FBeUM7d0JBQ3pFLGVBQWUsRUFBRSxPQUFPO3dCQUN4QixnQkFBZ0IsRUFBRSxRQUFRO3dCQUMxQix1QkFBdUIsRUFBRSxjQUFjO3FCQUN4QztpQkFDRjs4QkFFVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2tlbGV0b25FZmZlY3RzIH0gZnJvbSAnLi9za2VsZXRvbkVmZmVjdCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdza2VsZXRvbi1ibG9jaycsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3NrZWxldG9uLWJsb2NrJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC1mYWRlXSc6ICdlZmZlY3QgPT09IFwiZmFkZVwiJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC1wdWxzZV0nOiAnZWZmZWN0ID09PSBcInB1bHNlXCInLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LXdhdmVdJzogJ2VmZmVjdCA9PT0gXCJibGlua1wiIHx8IGVmZmVjdCA9PT0gXCJ3YXZlXCInLFxuICAgICdbc3R5bGUud2lkdGhdJzogJ3dpZHRoJyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnaGVpZ2h0JyxcbiAgICAnW3N0eWxlLmJvcmRlci1yYWRpdXNdJzogJ2JvcmRlclJhZGl1cycsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNrZWxldG9uQmxvY2tDb21wb25lbnQge1xuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgZWZmZWN0OiBTa2VsZXRvbkVmZmVjdHM7XG4gIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nO1xufVxuIl19