import { GridFiltroExternoDirective } from './grid-filtro-externo.directive';
import { ElementRef } from '@angular/core';

describe('GridFiltroExternoDirective', () => {
  it('should create an instance', () => {
    const directive = new GridFiltroExternoDirective(new ElementRef('input'));
    expect(directive).toBeTruthy();
  });
});
