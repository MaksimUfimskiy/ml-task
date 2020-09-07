import { Component, Self } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { RssService } from './services/rss.service';
import { MlOnDestroy } from './services/ml-on-destroy.service';
import { ErrorDetails, FeedItem } from './models';
import { Page } from './components/paginator/paginator.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [MlOnDestroy],
})
export class AppComponent {
	isRssFetchFailed = false;
	errorDetails: ErrorDetails;
	feed: FeedItem[];
	private _dataPage$ = new BehaviorSubject<FeedItem[]>([]);
	dataPage$ = this._dataPage$.asObservable();
	pageIndex = 0;

	constructor(private rssService: RssService, @Self() private mlOnDestroy: MlOnDestroy) {}

	onPageChange(page: Page): void {
		this.pageIndex = page.pageIndex;
		this._dataPage$.next(this.feed.slice(page.pageIndex, page.pageIndex + 5));
	}

	onRssSearch(rssUrl: string): void {
		this.pageIndex = 0;
		this._resetErrors();
		this.rssService
			.getRss(rssUrl)
			.pipe(
				catchError((e: HttpErrorResponse) => {
					this.isRssFetchFailed = true;
					this.errorDetails = {
						message: e.message,
						status: e.status,
						statusText: e.statusText,
					};
					this._dataPage$.next([]);

					return [];
				}),
				tap((feed: FeedItem[]) => {
					this.feed = feed;
					this._dataPage$.next(feed.slice(this.pageIndex, this.pageIndex + 5));
				}),
				takeUntil(this.mlOnDestroy)
			)
			.subscribe();
	}

	private _resetErrors(): void {
		this.isRssFetchFailed = false;
		this.errorDetails = null;
	}
}
