# angular-responsive-datatables

Nasıl Kullanılır?

```
<app-rtable 
[rows]="dataRows" 
[autoLoad]="true" [
lengthChange]="false" 
[serveSide]="true" 
[filter]="true"
[autoWidth]="false" 
pageLength="10" 
dataSource="https://restcountries.eu/rest/v2/all">
    <app-rtable-cell title="Name" data="name" type="text" order="desc"></app-rtable-cell>
    <app-rtable-cell title="Population" data="population" type="number" operator="co"></app-rtable-cell>
    <app-rtable-cell title="Alpha Code" data="alpha2Code" operator="co"></app-rtable-cell>
    <app-rtable-cell title="Region" data="region"></app-rtable-cell>
    <app-rtable-cell title="Manage" width="100">
        <ng-template #template let-rows>
           {{rows.subregion}}
        </ng-template>
    </app-rtable-cell>
</app-rtable>
```
[![HitCount](http://hits.dwyl.com/muratbekler/angular-responsive-datatables.svg)](http://hits.dwyl.com/muratbekler/angular-responsive-datatables)
