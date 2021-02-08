import {
    Component,
    OnInit,
    OnDestroy,
    ViewContainerRef,
    Input,
    EmbeddedViewRef,
    TemplateRef,
    AfterViewInit
} from '@angular/core';

export interface ITemplateProvider {
    getTemplateReference: () => TemplateRef<any>;
}

@Component({
    selector: 'tpl-render',
    template: ''
})
export class TemplateRendererComponent implements OnInit, OnDestroy {

    @Input()
    data: any;

    @Input()
    templateProvider: ITemplateProvider;

    view: EmbeddedViewRef<any>;

    constructor(
        public viewContainer: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
        this.view = this.viewContainer.createEmbeddedView(
            this.templateProvider.getTemplateReference(),
            {
                $implicit: this.data
            }
        );
    }

    ngOnDestroy(): void {
        this.view.destroy();
    }
}
