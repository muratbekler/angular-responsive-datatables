import { Component, Input, ContentChildren, QueryList, ContentChild, TemplateRef, ViewChild, AfterContentInit } from '@angular/core';
import { ITemplateProvider } from '../shared/template-renderer.component';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import { Observable } from 'rxjs';
import { baseEnvironment } from '../../../../../environments/base-environment';
class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}
class DataTablesColumnModel {
    public title: string;
    public data: string;
    public width: string;
    public type: string;
    public template: any;
    public render: any;
    public order: string;
    public name: string;
}

@Component({
    selector: 'app-rtable-cell',
    template: ''
})
export class ResponsiveTableCellComponent implements ITemplateProvider {

    @Input() title: string;

    @Input() data: string;

    @Input() type = 'string';

    @Input() width = 'string';

    @Input() order = 'string';

    @Input() operator = 'null';


    @ContentChild('template', { static: true, read: TemplateRef }) template: TemplateRef<any>;

    getTemplateReference() {
        return this.template;
    }

}

@Component({
    selector: 'app-rtable',
    templateUrl: 'responsive-table.component.html',
    styleUrls: ['responsive-table.component.css']

})
export class ResponsiveTableComponent implements AfterContentInit {
    @ViewChild('dataTable', { static: true }) table;
    @Input() dataSource: string;
    @Input() autoLoad = true;
    @Input() serveSide: boolean;
    @Input() processing: boolean;
    @Input() pageLength: number;
    @Input() filter: boolean;
    @Input() autoWidth: boolean;
    @Input() lengthChange: boolean;
    @Input() rows: Array<any>;
    columns: DataTablesColumnModel[] = [];
    orderColumns: Array<any> = [];
    dataTable: any;
    dataRows: any;
    dataParameters: Observable<any> = null;

    @ContentChildren(ResponsiveTableCellComponent) columnsComponent: QueryList<ResponsiveTableCellComponent>;
    constructor(private readonly _httpClient: HttpClient) { }

    ngAfterContentInit(): void {
        let colindex = 0;
        this.columnsComponent.forEach(div => {
            const ee = new DataTablesColumnModel;
            ee.title = div.title;
            ee.data = div.data !== undefined ? div.data : null;
            ee.width = div.width !== undefined ? div.width : null;
            ee.name = div.operator !== undefined ? div.operator : null;

            if (div.order.length > 0) {
                this.orderColumns.push(colindex);
                this.orderColumns.push(div.order);
            }
            this.columns.push(ee);
            colindex++;
        });
        this.dataTable = $(this.table.nativeElement);

        if (this.autoLoad) {
            this.load();
        }
    }
    public load(where: any = null) {
        let source: any = null;
        this.dataTable.DataTable({
            language: {
                lengthMenu: '_MENU_ Kayıt göster ',
                info: 'Toplam _TOTAL_ kayıttan <b>_START_ ile _END_</b> arasındakiler',
                search: 'Ara:',
                paginate: {
                    next: '>',
                    last: '>>',
                    previous: '<',
                    first: '<<'
                }
            },
            destroy: true,
            paginate: true,
            pagingType: 'full_numbers',
            pageLength: this.pageLength != null ? this.pageLength : 10,
            serverSide: this.serveSide,
            processing: this.processing,
            lengthChange: this.lengthChange,
            filter: this.filter,
            autoWidth: this.autoWidth,
            ajax: (dataTablesParameters: any, callback) => {
                source = this._httpClient.post(baseEnvironment.apiUrl + '/' + this.dataSource, dataTablesParameters);
                if (where != null) {
                    dataTablesParameters.additional_values = [];
                    dataTablesParameters.additional_values[0] = where;
                }
                source.subscribe((resp: any) => {
                    const result = resp.datum;
                    this.dataRows = result.data;
                    callback({
                        recordsTotal: result.recordsTotal,
                        recordsFiltered: result.recordsFiltered,
                        data: []
                    });
                });
            },
            order: [this.orderColumns],
            columns: this.columns
        });
    }

    parseDotNotation(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') === -1) {
                return data[field];
            } else {
                const fields: string[] = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }
}
