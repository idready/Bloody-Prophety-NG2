import { ActionReducer, Action } from '@ngrx/store';
import { MenuState } from '../models/menu.state';

import { HeaderComponent } from '../header/header/header.component';

const initialState: MenuState = {index: 0};

export const MenuReducer: ActionReducer<MenuState> = (state: MenuState = initialState, action: Action) => {

    switch(action.type) {

        case HeaderComponent.MenuEvents.LINK_CLICKED:
        case HeaderComponent.MenuEvents.HASH_UPDATED:
        case HeaderComponent.MenuEvents.SCROLLED_PAGE:
        case HeaderComponent.MenuEvents.RESIZED_PAGE:
            // console.info('Previous state', state);
            // console.info('Next state', {index: action.payload.index});
            return Object.assign(state, {}, {index: action.payload.index});

        default:
            return state;
    }
};
