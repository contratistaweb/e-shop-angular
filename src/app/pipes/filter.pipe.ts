import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '') return value;
    const resultSearch = [];
    for(const product of value){
      if(product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultSearch.push(product);
      }
    };
    return resultSearch; 
  }

}
