import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core'
import {ModalComponent} from './modal/modal.component';
import {RefDirective} from './ref.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(RefDirective, {static:false}) public refDir: RefDirective

  constructor(
    private resolver: ComponentFactoryResolver
  ){}

  showModals(){
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent)
    this.refDir.containerRef.clear()

    const component = this.refDir.containerRef.createComponent(modalFactory)

    component.instance.title = 'Title'
    component.instance.close.subscribe(() =>{
      this.refDir.containerRef.clear()
    })
  }
}

