import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { StockService} from '../stock.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stocks: Stock[] = [];
  
  view: [number,number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  legendTitle: string = "Stocks";
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = "right";

  //functions 

  labelFormatting (l:any)
  {
    return `${l}`;
  }

  formattingTooltipText (v:any)
  {
    return `<strong>$${v.value}`;
  } 

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#448AFF', '#FFEB3B', '#E040FB', '#FF5722', '#009688']
  };

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks.slice(0,10));
  }

onSelect(data: any): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data: any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data: any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}
}
