import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './create/create.page';
import { DetailPage } from './detail/detail.page';
import { EditPage } from './edit/edit.page';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule'},
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule'},
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
