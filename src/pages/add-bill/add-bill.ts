import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service'; 
import { QueryBook } from '../../domain/QueryBook';
import { SaveBillPage} from '../../pages/save-bill/save-bill'
@Component({
  selector: 'page-add-bill',
  templateUrl: 'add-bill.html',
	providers:[BookService,HttpService,]
})
/**首页面 */
export class AddBillPage {
		icons: string[];
		books_today:QueryBook[];
		amount:number;
  	constructor(public bookService : BookService,
	  			public loadingCtrl: LoadingController,
				public navCtrl: NavController				) {
			
	    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
	    'american-football', 'boat', 'bluetooth', 'build'];
 		}
		
		ngOnInit(){
			this.init();
		}
		init(){
			let loader = this.loadingCtrl.create({
				spinner:"dots",
				content:"loading...",
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
			loader.present();

			Promise.all([this.bookService.findToday(),this.bookService.getCurMonthAmount()])
			.then(results =>{
				this.books_today = results[0].object.results;
				this.amount = results[1].object;
				loader.dismiss();
			})
			.catch(
				error =>console.log(error)
			);	
		}
		addBill() {
			this.navCtrl.push(SaveBillPage);
		}
		doRefresh(event){
			this.init();
			event.complete();
		}
}
