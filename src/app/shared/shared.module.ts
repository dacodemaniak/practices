import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ToggleButtonDirective } from './directives/toggle-button.directive';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToggleButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    UiModule,
    ToggleButtonDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
