import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export interface Page {
	page: number;
	pageIndex: number;
	pageStart: number;
	pageSize: number;
}

@Component({
	selector: 'ml-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
	@Input() pageIndex = 0;
	@Input() pageSize = 5;
	@Input() totalElements = 0;
	@Output() pageChanged: EventEmitter<Page> = new EventEmitter<Page>();
	minPage = 0;
	maxPage = 0;
	currentPage = 0;

	ngOnChanges(changes: SimpleChanges): void {
		this._paginate();
	}

	goToPage(page: number): void {
		this.pageChanged.emit({ pageIndex: page - 1, page, pageSize: this.pageSize, pageStart: (page - 1) * this.pageSize });
	}

	private _paginate(): void {
		if (this.totalElements) {
			this.minPage = 1;
			this.maxPage = Math.ceil(this.totalElements / this.pageSize);
			this.currentPage = this.pageIndex + 1;
		}
	}
}
