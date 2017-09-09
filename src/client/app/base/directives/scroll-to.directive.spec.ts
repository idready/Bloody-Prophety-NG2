import { ScrollToDirective } from './scroll-to.directive';
import { WindowService } from '../../services/window.service';

describe('ScrollToDirective', () => {
  it('should create an instance', () => {

    let window: any;
    const directive = new ScrollToDirective(window);
    expect(directive).toBeTruthy();
  });
});
