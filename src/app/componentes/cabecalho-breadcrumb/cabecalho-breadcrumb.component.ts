import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CabecalhoBreadcrumbService, iBreadcrumb } from './cabecalho-breadcrumb.service'
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-cabecalho-breadcrumb',
  templateUrl: './cabecalho-breadcrumb.component.html',
  styleUrls: ['./cabecalho-breadcrumb.component.scss']
})
export class CabecalhoBreadcrumbComponent implements OnDestroy {

  public breadcrumbs: iBreadcrumb[];
  private subscription: Subscription;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService) {
      this.breadcrumbs = [];
      // this.breadcrumbs = [{
      //   texto: 'teste',
      //   url: null
      // }];
      this.subscription = this.cabecalhoBreadcrumbService.breadcrumbs$.subscribe(newBreadCrumbs => {
        //FOi necessário o timeout pois estava dando o seguinte erro:
        //setTimeout(()=>{
          if(this.breadcrumbs){
            if(this.breadcrumbs.length > 0){
              this.breadcrumbs.splice(0, this.breadcrumbs.length);
            }
          }else{
            this.breadcrumbs = [];
          }
          newBreadCrumbs.forEach((item)=>{
            this.breadcrumbs.push(item);
          });
        //}, 50);
        //this.breadcrumbs_tmp = newBreadCrumbs;
        //CabecalhoBreadcrumbComponent.html:3 
        //ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'ngForOf: [object Object]'. Current value: 'ngForOf: [object Object],[object Object],[object Object]'.
      })
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
