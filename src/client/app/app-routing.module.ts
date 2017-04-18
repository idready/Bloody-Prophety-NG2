import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
        /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
        */
        [],
        {
          enableTracing: true
        }
      )
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
