import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  
  @Input() table;
  @Input() headerKey;
  @Input() header;
  
  @Output() actions:EventEmitter<Object> = new EventEmitter();
  
  
  triangle = 'triangle-down';
  toDrop;
  tableEdit;
  filter;
  selectFilter
  
  constructor(private helper: HelperService) {
    
  }
  
  ngOnInit() {
  }  
  
  ngOnChanges(changes: SimpleChanges) {    
    this.tableEdit = this.table.body
    this.selectFilter = new Array(this.table.header.length)
  }

  filterOrder(index) {
    
    if(this.triangle == 'triangle-down')
    this.table.body.sort((a, b) => {
      return (a.elements[index].localeCompare(b.elements[index]))
    })
    else
    this.table.body.sort((a, b) => {
      return (b.elements[index].localeCompare(a.elements[index]))
    })
    
    this.triangle = (this.triangle == 'triangle-down')? 'triangle-up' : 'triangle-down';
  }

  dropFilterTopic(item) {
    this.filterTable(item, 'topics')
  }

  dropFilter(item) {
    this.filterTable(item, 'normal')
  }

  filterTable(item, type) {
    this.tableEdit = this.table.body

    this.selectFilter[item.value] = {
      text: item.text,
      value: item.value
    }
    this.selectFilter.forEach(elementFilter => {
      if(elementFilter && elementFilter.text !== 'All'){
        if(type === 'topics')
          this.tableEdit = this.tableEdit.filter(row=>row[elementFilter.value].text.indexOf(elementFilter.text) > -1)
        else
          this.tableEdit = this.tableEdit.filter(row=>row[elementFilter.value].text === elementFilter.text)
      }
    });
  }

}
