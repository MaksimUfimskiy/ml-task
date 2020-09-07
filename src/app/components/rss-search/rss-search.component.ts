import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
	selector: 'ml-rss-search',
	templateUrl: './rss-search.component.html',
	styleUrls: ['./rss-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssSearchComponent {
	@Output() rssSearched: EventEmitter<string> = new EventEmitter<string>();

	rssFormControl = new FormControl('', [Validators.required, this._validateUrl]);

	submit(): void {
		this.rssSearched.emit(this.rssFormControl.value.trim());
	}

	private _validateUrl(control: AbstractControl): ValidationErrors {
		let isUrlValid = true;

		try {
			const url = new URL(control.value);
		} catch {
			isUrlValid = false;
		}

		return isUrlValid ? null : { urlInvalid: true };
	}
}
