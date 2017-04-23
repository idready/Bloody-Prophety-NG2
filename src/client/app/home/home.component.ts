import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  /**
   * Creates an instance of the HomeComponent with the injected
   * ActivatedRoute.
   *
   * @param {ActivatedRoute} ActivatedRoute - The injected ActivatedRoute.
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * Get pages datas
   */
  ngOnInit() {
    this.route.data
    .map(response => response)
    .subscribe((datas: any) => {
        console.info(datas);
    })
  }

  OnDestroy() {
     console.info('Destroying home component');
  }

}
