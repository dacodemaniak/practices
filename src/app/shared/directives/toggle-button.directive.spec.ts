import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleButtonDirective } from './toggle-button.directive';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  template: `
    <button appToggleButton>Test Button</button>
  `
})
class TestComponent { }

@Component({
  template: `
    <div appToggleComponent>Bad element</div>
  `
})
class BadTestComponent {}

describe('ToggleButtonDirective', () => {
  let goodComponent: TestComponent
  let goodFixture: ComponentFixture<TestComponent>
  let buttonEl: DebugElement

  let badComponent: BadTestComponent
  let badFixture: ComponentFixture<BadTestComponent>
  let divEl: DebugElement
  
  let renderer: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent, BadTestComponent, ToggleButtonDirective ],
      providers: [
        { provide: Renderer2, useValue: renderer }
      ]
    }).compileComponents()

    renderer = jasmine.createSpyObj('Renderer2', ['setAttribute', 'addClass', 'removeClass']);

    goodFixture = TestBed.createComponent(TestComponent)
    goodComponent = goodFixture.componentInstance
    buttonEl = goodFixture.debugElement.query(By.css('button'))
    goodFixture.detectChanges()

    badFixture = TestBed.createComponent(BadTestComponent)
    badComponent = badFixture.componentInstance
    divEl = badFixture.debugElement.query(By.css('div'))
    badFixture.detectChanges()

    
  });

  it('should create an instance', () => {
    const directive = new ToggleButtonDirective(buttonEl, renderer)
    expect(directive).toBeTruthy()
  });

  it('should not throw error when applied to a button element', () => {
    expect(() => {
      const directive = new ToggleButtonDirective(buttonEl, renderer);
      directive.ngOnInit();
    }).not.toThrow();
  });



  it('should throw error when applied to a non-button element', () => {
    expect(() => {
      const directive = new ToggleButtonDirective(divEl, renderer);
      directive.ngOnInit();
    }).toThrow(new Error('Cannot bind directive to non button element'));
  });

  it('Should have initial classes', () => {
    const directive = new ToggleButtonDirective(buttonEl, renderer)
    directive.ngOnInit()
    expect(renderer.addClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'rounded-btn');
    expect(renderer.addClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'rounded-btn-background');
    expect(renderer.addClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'non-clicked-btn');
  })

it('Should toggle to clicked state on initial click', () => {
  const directive = new ToggleButtonDirective(buttonEl, renderer)
    directive.onBtnClick();
    expect(renderer.removeClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'non-clicked-btn');
    expect(renderer.addClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'clicked-btn');
  });

  it('Should toggle back to non-clicked state on second click', () => {
    const directive = new ToggleButtonDirective(buttonEl, renderer)
    directive.onBtnClick(); // First click
    directive.onBtnClick(); // Second click
    expect(renderer.removeClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'clicked-btn');
    expect(renderer.addClass).toHaveBeenCalledWith(buttonEl.nativeElement, 'non-clicked-btn');
  });
});
