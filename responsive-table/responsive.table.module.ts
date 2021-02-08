import { NgModule } from '@angular/core';
import { ResponsiveTableComponent, ResponsiveTableCellComponent } from './responsive-table/responsive-table.component';
import { TemplateRendererComponent } from './shared/template-renderer.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ResponsiveTableComponent,
        ResponsiveTableCellComponent,
        TemplateRendererComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ResponsiveTableComponent,
        ResponsiveTableCellComponent,
        TemplateRendererComponent
      ],
    providers: [],
    bootstrap: []
})
export class ResponsiveTableModule { }
