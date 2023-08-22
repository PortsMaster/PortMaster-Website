import { Component, Input } from '@angular/core';
import { multiplySvgPointsService } from './multiply-svg-points';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SkeletonAvatarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24tYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIvbGliL3NrZWxldG9uLWF2YXRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBbUNqRSxNQUFNLE9BQU8sdUJBQXVCO0lBbENwQztRQW1DVyxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRWxCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsaUJBQVksR0FBVyxLQUFLLENBQUM7S0FNdkM7SUFIQyxjQUFjLENBQUMsWUFBWTtRQUN6QixPQUFPLHdCQUF3QixDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7b0hBVlUsdUJBQXVCO3dHQUF2Qix1QkFBdUIscWJBMUJ4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQXdCa0I7MkZBRWpCLHVCQUF1QjtrQkFsQ25DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxpQkFBaUI7d0JBQ3hCLDhCQUE4QixFQUFFLG1CQUFtQjt3QkFDbkQsK0JBQStCLEVBQUUsb0JBQW9CO3dCQUNyRCw4QkFBOEIsRUFBRSx5Q0FBeUM7cUJBQzFFO29CQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQXdCa0I7aUJBQzdCOzhCQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2tlbGV0b25FZmZlY3RzIH0gZnJvbSAnLi9za2VsZXRvbkVmZmVjdCc7XG5pbXBvcnQgeyBtdWx0aXBseVN2Z1BvaW50c1NlcnZpY2UgfSBmcm9tICcuL211bHRpcGx5LXN2Zy1wb2ludHMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2tlbGV0b24tYXZhdGFyJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnc2tlbGV0b24tYXZhdGFyJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC1mYWRlXSc6ICdlZmZlY3QgPT09IFwiZmFkZVwiJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC1wdWxzZV0nOiAnZWZmZWN0ID09PSBcInB1bHNlXCInLFxuICAgICdbY2xhc3Muc2tlbGV0b24tZWZmZWN0LXdhdmVdJzogJ2VmZmVjdCA9PT0gXCJibGlua1wiIHx8IGVmZmVjdCA9PT0gXCJ3YXZlXCInLFxuICB9LFxuICB0ZW1wbGF0ZTogYDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgW2F0dHIud2lkdGhdPVwic2l6ZVwiXG4gICAgICBbYXR0ci5oZWlnaHRdPVwic2l6ZVwiXG4gICAgICBbYXR0ci52aWV3Qm94XT1cIicwIDAgJyArIHNpemUgKyAnICcgKyBzaXplXCJcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCJcbiAgICA+XG4gICAgICA8cmVjdFxuICAgICAgICBbYXR0ci53aWR0aF09XCJzaXplXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cInNpemVcIlxuICAgICAgICBmaWxsUnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICBbc3R5bGUuZmlsbF09XCJjb2xvclwiXG4gICAgICAgIFthdHRyLnJ4XT1cImJvcmRlclJhZGl1c1wiXG4gICAgICAvPlxuICAgICAgPHBhdGhcbiAgICAgICAgKm5nSWY9XCJzaG93SWNvblwiXG4gICAgICAgIFtzdHlsZS5maWxsXT1cImljb25Db2xvclwiXG4gICAgICAgIFthdHRyLmRdPVwiXG4gICAgICAgICAgbXVsdGlwbHlQb2ludHMoXG4gICAgICAgICAgICAnTTI4LjIyNDYxLDI3LjE1OTA4MTcgQzM0LjkyMDk5MzEsMjcuMTU5MDgxNyA0MC42ODI5MDQ0LDIxLjE3OTEwMDQgNDAuNjgyOTA0NCwxMy4zOTI2MzMyIEM0MC42ODI5MDQ0LDUuNjk5NTg2NjIgMzQuODg5ODk3MiwwIDI4LjIyNDYxLDAgQzIxLjU1OTQ1NTcsMCAxNS43NjYzMTU2LDUuODI0MjM2MDEgMTUuNzY2MzE1NiwxMy40NTQ5NTc5IEMxNS43NjYzMTU2LDIxLjE3OTEwMDQgMjEuNTU5NDU1NywyNy4xNTkwODE3IDI4LjIyNDYxLDI3LjE1OTA4MTcgWiBNOC42NjUxNTQyNyw1NiBMNDcuNzg0MTk4Niw1NiBDNTIuNjczOTYyOSw1NiA1NC40MTgxMjQxLDU0LjU5ODQyNTMgNTQuNDE4MTI0MSw1MS44NTc2MDA1IEM1NC40MTgxMjQxLDQzLjgyMTk2NzQgNDQuMzU4MDY4LDMyLjczNDE1MTkgMjguMjI0NjEsMzIuNzM0MTUxOSBDMTIuMDYwMDU2MSwzMi43MzQxNTE5IDIsNDMuODIxOTY3NCAyLDUxLjg1NzYwMDUgQzIsNTQuNTk4NDI1MyAzLjc0NDAyODMyLDU2IDguNjY1MTU0MjcsNTYgWidcbiAgICAgICAgICApXG4gICAgICAgIFwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBTa2VsZXRvbkF2YXRhckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNpemU6IG51bWJlciA9IDQ4O1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBzaG93SWNvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGljb25Db2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBib3JkZXJSYWRpdXM6IHN0cmluZyA9ICc1MCUnO1xuICBASW5wdXQoKSBlZmZlY3Q6IFNrZWxldG9uRWZmZWN0cztcblxuICBtdWx0aXBseVBvaW50cyhwb2ludHNTdHJpbmcpIHtcbiAgICByZXR1cm4gbXVsdGlwbHlTdmdQb2ludHNTZXJ2aWNlKHBvaW50c1N0cmluZywgNTYsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgfVxufVxuIl19