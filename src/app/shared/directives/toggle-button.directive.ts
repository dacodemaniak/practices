import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ToggleType } from '../../products/types/toggle.type';

@Directive({
  selector: '[appToggleButton]'
})
export class ToggleButtonDirective implements OnInit {
  private _nativeElement!: HTMLElement
  private _isToggled: boolean = false

  private readonly _initialStateClasses = [
    'rounded-btn',
    'rounded-btn-background',
    'non-clicked-btn'
  ]

  @Input()
  styles: Map<string, string> = new Map([
    ['backgroundColor', '#f6f6f6'],
    // ...
  ])
  
  @Output()
  onToggle: EventEmitter<ToggleType> = new EventEmitter<ToggleType>()

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
    this._nativeElement = this._el.nativeElement as HTMLElement
  }

  ngOnInit(): void {
    if (this._nativeElement.tagName !== 'BUTTON') {
      throw new Error(`Cannot bind directive to non button element`)
    }
    //this._nativeElement.setAttribute('type', 'button')
    this._renderer.setAttribute(this._nativeElement, 'type', 'button')
    this._designButton()
  }

  @HostListener('click')
  onBtnClick(): void {
    this._isToggled = !this._isToggled
    if (this._isToggled) {
      this._renderer.removeClass(this._nativeElement, 'non-clicked-btn')
      this._renderer.addClass(this._nativeElement, 'clicked-btn')
      this.onToggle.emit({isSelected: true, id: parseInt(this._nativeElement.textContent!)})
    } else {
      this._renderer.removeClass(this._nativeElement, 'clicked-btn')
      this._renderer.addClass(this._nativeElement, 'non-clicked-btn')
      this.onToggle.emit({isSelected: false, id: parseInt(this._nativeElement.textContent!)})
    }
  }

  private _designButton(): void {
    this._initialStateClasses.forEach((classState: string) => {
      this._renderer.addClass(this._nativeElement, classState)
    })
  }

}
