import { Component, Input } from '@angular/core';
import { multiplySvgPointsService } from './multiply-svg-points';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SkeletonImageComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24taW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhci9saWIvc2tlbGV0b24taW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQW9DakUsTUFBTSxPQUFPLHNCQUFzQjtJQW5DbkM7UUFvQ1csVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQixXQUFNLEdBQVcsR0FBRyxDQUFDO1FBRXJCLGFBQVEsR0FBWSxJQUFJLENBQUM7S0FRbkM7SUFIQyxjQUFjLENBQUMsWUFBWTtRQUN6QixPQUFPLHdCQUF3QixDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7bUhBWFUsc0JBQXNCO3VHQUF0QixzQkFBc0IsdWNBM0J2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkF5QmtCOzJGQUVqQixzQkFBc0I7a0JBbkNsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsZ0JBQWdCO3dCQUN2Qiw4QkFBOEIsRUFBRSxtQkFBbUI7d0JBQ25ELCtCQUErQixFQUFFLG9CQUFvQjt3QkFDckQsOEJBQThCLEVBQUUseUNBQXlDO3FCQUMxRTtvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBeUJrQjtpQkFDN0I7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2tlbGV0b25FZmZlY3RzIH0gZnJvbSAnLi9za2VsZXRvbkVmZmVjdCc7XG5pbXBvcnQgeyBtdWx0aXBseVN2Z1BvaW50c1NlcnZpY2UgfSBmcm9tICcuL211bHRpcGx5LXN2Zy1wb2ludHMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2tlbGV0b24taW1hZ2UnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdza2VsZXRvbi1pbWFnZScsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtZmFkZV0nOiAnZWZmZWN0ID09PSBcImZhZGVcIicsXG4gICAgJ1tjbGFzcy5za2VsZXRvbi1lZmZlY3QtcHVsc2VdJzogJ2VmZmVjdCA9PT0gXCJwdWxzZVwiJyxcbiAgICAnW2NsYXNzLnNrZWxldG9uLWVmZmVjdC13YXZlXSc6ICdlZmZlY3QgPT09IFwiYmxpbmtcIiB8fCBlZmZlY3QgPT09IFwid2F2ZVwiJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGA8c3ZnXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgW2F0dHIudmlld0JveF09XCInMCAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodFwiXG4gICAgICBbc3R5bGUuYm9yZGVyLXJhZGl1c109XCJib3JkZXJSYWRpdXNcIlxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIlxuICAgID5cbiAgICAgIDxwb2x5Z29uXG4gICAgICAgIFtzdHlsZS5maWxsXT1cImNvbG9yXCJcbiAgICAgICAgZmlsbFJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgW2F0dHIucG9pbnRzXT1cIlxuICAgICAgICAgICcwIDAgJyArIHdpZHRoICsgJyAwICcgKyB3aWR0aCArICcgJyArIGhlaWdodCArICcgMCAnICsgaGVpZ2h0XG4gICAgICAgIFwiXG4gICAgICAvPlxuICAgICAgPHBhdGhcbiAgICAgICAgKm5nSWY9XCJzaG93SWNvblwiXG4gICAgICAgIFtzdHlsZS5maWxsXT1cImljb25Db2xvclwiXG4gICAgICAgIFthdHRyLmRdPVwiXG4gICAgICAgICAgbXVsdGlwbHlQb2ludHMoXG4gICAgICAgICAgICAnTTcuNzE0OCw0OS41NzQyIEw0OC4yODUyLDQ5LjU3NDIgQzUzLjE4MzYsNDkuNTc0MiA1NS42NDQ2LDQ3LjEzNjcgNTUuNjQ0Niw0Mi4zMDg2IEw1NS42NDQ2LDEzLjY5MTQgQzU1LjY0NDYsOC44NjMzIDUzLjE4MzYsNi40MjU4IDQ4LjI4NTIsNi40MjU4IEw3LjcxNDgsNi40MjU4IEMyLjgzOTgsNi40MjU4IDAuMzU1NCw4LjgzOTggMC4zNTU0LDEzLjY5MTQgTDAuMzU1NCw0Mi4zMDg2IEMwLjM1NTQsNDcuMTYwMiAyLjgzOTgsNDkuNTc0MiA3LjcxNDgsNDkuNTc0MiBaIE0zOS4yODUxLDI3Ljk0MTQgQzM4LjIzMDQsMjcuMDAzOSAzNy4wMzUxLDI2LjUxMTggMzUuNzY5NSwyNi41MTE4IEMzNC40NTcsMjYuNTExOCAzMy4zMDg1LDI2Ljk1NzEgMzIuMjMwNCwyNy45MTggTDIxLjYzNjYsMzcuMzg2NyBMMTcuMzAwNywzMy40NDkyIEMxNi4zMTYzLDMyLjU4MiAxNS4yNjE3LDMyLjExMzMgMTQuMTM2NiwzMi4xMTMzIEMxMy4xMDU0LDMyLjExMzMgMTIuMDk3NiwzMi41NTg2IDExLjEzNjYsMzMuNDI1OCBMNC4xMjg4LDM5LjczMDUgTDQuMTI4OCwxMy44Nzg5IEM0LjEyODgsMTEuNDQxNCA1LjQ0MTMsMTAuMTk5MiA3Ljc4NTEsMTAuMTk5MiBMNDguMjE0NywxMC4xOTkyIEM1MC41MzUsMTAuMTk5MiA1MS44NzA4LDExLjQ0MTQgNTEuODcwOCwxMy44Nzg5IEw1MS44NzA4LDM5Ljc1MzkgTDM5LjI4NTEsMjcuOTQxNCBaIE0xNy44MTYzLDI4LjE5OTIgQzIwLjgzOTgsMjguMTk5MiAyMy4zMjQxLDI1LjcxNDkgMjMuMzI0MSwyMi42NjggQzIzLjMyNDEsMTkuNjQ0NSAyMC44Mzk4LDE3LjEzNjcgMTcuODE2MywxNy4xMzY3IEMxNC43Njk1LDE3LjEzNjcgMTIuMjg1MSwxOS42NDQ1IDEyLjI4NTEsMjIuNjY4IEMxMi4yODUxLDI1LjcxNDkgMTQuNzY5NSwyOC4xOTkyIDE3LjgxNjMsMjguMTk5MiBaJ1xuICAgICAgICAgIClcbiAgICAgICAgXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIFNrZWxldG9uSW1hZ2VDb21wb25lbnQge1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyID0gMTIwMDtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXIgPSA2MDA7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgaWNvbkNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVmZmVjdDogU2tlbGV0b25FZmZlY3RzO1xuICBASW5wdXQoKSBib3JkZXJSYWRpdXM6IHN0cmluZztcblxuICBtdWx0aXBseVBvaW50cyhwb2ludHNTdHJpbmcpIHtcbiAgICByZXR1cm4gbXVsdGlwbHlTdmdQb2ludHNTZXJ2aWNlKHBvaW50c1N0cmluZywgNTYsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxufVxuIl19