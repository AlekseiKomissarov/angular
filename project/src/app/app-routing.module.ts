import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'


const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'about', loadChildren: './about-page/about-page.module#AboutPageModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules // выполняет загрузку остальных модулей после загрузки всех скриптов
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
