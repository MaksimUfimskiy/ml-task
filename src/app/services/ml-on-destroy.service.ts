import { ReplaySubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class MlOnDestroy extends ReplaySubject<null> implements OnDestroy {
	constructor() {
		super(1);
	}

	ngOnDestroy(): void {
		this.next(null);
		this.complete();
	}
}
