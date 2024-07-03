import { FormControl } from '@angular/forms';

export class SingleAlphaNumFormControl extends FormControl {
  readonly ALPHA_NUMERIC_REG = /[^0-9|a-z|A-Z]/gi;

  // Only single alphanumeric character allowed,
  // disregarding additional key inputs if there already exist a value
  override setValue(value: string | null, options: any) {
    if (!value) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.match(this.ALPHA_NUMERIC_REG)) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length > 1) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
