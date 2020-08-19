import { Component, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as Cart from "../store/actions";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { UpdateFavListDialogComponent } from '../update-fav-list-dialog/update-fav-list-dialog.component';

@Component({
  selector: 'app-fav',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoritelistComponent implements OnInit {

  cart: Observable<Array<any>>
  lists: any;
  constructor(private store: Store<any>, private dialog: MatDialog) {
    this.retreiveData();
  }
  modifyObj(data) {
    var op = {};
    var uniqNames = [...new Set(data.map(item => item.name))]
    uniqNames.forEach((uName: string) => {
      data.map(item => {
        if (item.name === uName) {
          if (!op[uName]) op[uName] = [];
          op[uName].push({ 'value': item.value, 'desc': item.desc });
        }
      })
      var newOp = Object.keys(op).map(item => {
        console.log(item)
        return {
          name: item,
          desc: [...new Set(op[item].map(opItem => opItem.desc))],
          value: op[item].map(opItem => opItem.value)
        }
      }
      );
      this.lists = newOp;
    });
  }
  downloadFav(obj) {
    this.toDataURL(obj, function (dataUrl) {
      console.log(dataUrl)
      var a = document.createElement("a"); //Create <a>
      a.href = dataUrl; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click();
    })
  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  edit(i, obj) {
    var pname = obj.name;
    console.log(obj)
    const dialogRef = this.dialog.open(UpdateFavListDialogComponent, {
      width: '500px',
      height: '200px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var arr = [];
        this.store.select('cart').subscribe(data => {
          data.cart.filter(item => {
            if (item.name === pname) {
              var anotherNewObject = { ...item, name: result.name, desc: result.desc }
              arr.push(anotherNewObject)
            }
          })
        })
        console.log("arr with values replaced", arr)
        this.store.dispatch(new Cart.Update({ pName: pname, nName: result.name, nDesc: result.desc, arr: arr }))
        this.retreiveData();
      }
    });
  }
  retreiveData() {
    this.store.select('cart').subscribe(data => {
      this.modifyObj(data['cart']);
    })
  }
  ngOnInit() {
  }
}
