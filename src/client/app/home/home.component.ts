import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WpPageStructure } from '../models/wp.datas-structure.interface';

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
  
  pages: WpPageStructure[];
  
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
        
        this.pages = [];
        // Fetch datas from resolve
        this.route.data
        .subscribe((response: {[index:string] : WpPageStructure[]}) => {

            let sortedPages : any = response['home']
            sortedPages
            .sort((first: WpPageStructure, second: WpPageStructure) => {
                /**
                 * Sort pages with position attribute
                 */
                return first.acf.page_position - second.acf.page_position;
            })
            .map((element: WpPageStructure, index: number) => {
                /**
                 * [key Makes pages index easily reachable on templates]
                 * @type {[type]}
                 */
                let key: number | string = element.acf.page_id || 'blog';
                // @TODO: Fix this too
                this.pages[key as any] = element;
            });
            console.info(this.pages);
        });
    }

    OnDestroy() {
        console.info('Destroying home component');
    }

}
