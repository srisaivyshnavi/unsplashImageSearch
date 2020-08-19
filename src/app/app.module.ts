import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ImageListComponent } from './image-list/image-list.component';
import { FavoritelistComponent } from './favorite-list/favorite-list.component'
import { Routes, RouterModule } from '@angular/router';
import { ImageService } from './shared/service/data.service';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './shared/material/material.module';
import { storeEffects } from './store/effects';
import { StoreModule } from "@ngrx/store";
import { reducer } from './store/reducer';
import { UpdateFavListDialogComponent } from './update-fav-list-dialog/update-fav-list-dialog.component'
import { FavouriteDialogComponent } from './favourite-dialog/favourite-dialog.component'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: ImageListComponent
  },
  {
    path: 'favorites',
    component: FavoritelistComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    FavoritelistComponent,
    FavouriteDialogComponent,
    UpdateFavListDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ cart: reducer }),
    EffectsModule.forRoot([storeEffects]),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [FavouriteDialogComponent, UpdateFavListDialogComponent],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
