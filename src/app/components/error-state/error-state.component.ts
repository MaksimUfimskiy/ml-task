import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ErrorDetails } from '../../models';

@Component({
	selector: 'ml-error-state',
	template: `<div class="ml-error-state">
		<h2>{{ errorDetails.status }}</h2>
		<h4>{{ errorDetails.statusText }}</h4>
		<div class="ml-error-state__message">{{ errorDetails.message }}</div>
	</div>`,
	styleUrls: ['./error-state.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
	@Input() errorDetails: ErrorDetails;
}
