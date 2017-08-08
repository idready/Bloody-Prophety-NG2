import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { MenuLink } from '../../models/menu.link.interface';
import { MenuState } from '../../models/menu.state';
import { WpPageStructure } from '../../models/wp.datas-structure.interface';
import { WpApiService } from '../../services/wpapi.service';

@Component({
  moduleId: module.id,
  selector: 'bp-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

    static MenuEvents = {
        LINK_CLICKED: 'link_clicked',
        HASH_UPDATED: 'hash_update',
        SCROLLED_PAGE:'scrolled_page',
        RESIZED_PAGE: 'resized_page'
    };

    linkIndex: Observable<MenuState>;
    menuLinks: MenuLink[];
    urlFragment: string;

    constructor(
        private wpApiService$: WpApiService, private router: Router, private state$: ActivatedRoute, private store: Store<MenuState>
    ) {}

    /**
    * [isRouteActivated Checks if the current route is activated]
    * @param  {string}  route [description]
    * @return {boolean}       [description]
    */
    isRouteActivated(route: string):boolean {
        return this.router.isActive(route, false);
    }

    ngOnInit() {

        this.linkIndex = this.store.select('headerNavIndex');
        this.menuLinks = [];

        this.urlFragment = '';
        this.state$.fragment.subscribe((result) => {
            // Makes sure url fragment is null and not 'null';
            this.urlFragment = !result ? result : `${result}`;
            if(this.menuLinks.length){ this.updateMenuIndex(); }
        });

        this.wpApiService$.getPages().subscribe((response: Observable<WpPageStructure>) => {

            let sortedLinks: WpPageStructure[] = [];
            response.map((link: WpPageStructure) => {
                sortedLinks.push(link);
            });

            sortedLinks
            .sort((linkA: WpPageStructure, linkB: WpPageStructure) => {
                return linkA.acf.page_position - linkB.acf.page_position;
            })
            .map((link: WpPageStructure) => {
                this.menuLinks.push({
                    id: link.id,
                    title: link.title.rendered,
                    page_id: <string> link.acf.page_id || 'blog',
                    page_position: link.acf.page_position
                });
            });

        });
    }

    /**
    * [updateMenuIndex Change menu index once the url fragment change]
    * @return undefined [description]
    */
    updateMenuIndex(){

        // Find the right menu index and compare with the url fragment
        let menuIndex: number = this.menuLinks.findIndex((link: MenuLink, index: number, arr: MenuLink[]):boolean => {
            if(!this.urlFragment && link.page_id === 'blog') return true;
            return link.page_id === this.urlFragment;
        });

        this.store.dispatch({
            type: HeaderComponent.MenuEvents.HASH_UPDATED,
            payload: {
                index: menuIndex !== -1 ? menuIndex: 0
            }
        });
    }

    /**
    * [updateLinkIndex set current link]
    * @param  {number = 0} index [description]
    * @return undefined      [description]
    */
    setMenuIndex(index: number = 0) {

        this.store.dispatch({
            type: HeaderComponent.MenuEvents.LINK_CLICKED,
            payload: {
                index: index
            }
        });
    }
}
