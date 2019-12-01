import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ShippingInfo } from 'src/app/core/models/shipping-info';
import { customRequiredValidatorFn } from './validators/custom-required.validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessOrderComponent implements OnDestroy {
  @Input() address: ShippingInfo;
  @Output() order = new EventEmitter<ShippingInfo>();

  form: AbstractControl;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: ['', [customRequiredValidatorFn()]],
      lastName: [''],
      email: [''],
      phones: new FormArray([]),
      withDelivery: [true],
      shippingCity: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]]
    });

    this.form.get('withDelivery').valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deliveryEnabled: boolean) => {
        const controls: FormControl[] = [
          this.form.get('shippingCity') as FormControl,
          this.form.get('shippingAddress') as FormControl
        ];

        const validator = deliveryEnabled ? Validators.required : null;
        controls.forEach(control => {
          control.setValidators(validator);
          control.updateValueAndValidity();
        });
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit() {
    this.order.emit(new ShippingInfo(this.form.value));
  }

  onAddPhone() {
    const phones = this.form.get('phones') as FormArray;
    phones.push(new FormControl('+7', Validators.required));
  }

  onRemovePhone(index: number) {
    const phones = this.form.get('phones') as FormArray;
    phones.removeAt(index);
  }
}

