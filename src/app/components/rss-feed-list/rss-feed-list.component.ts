import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FeedItem } from '../../models';

@Component({
	selector: 'ml-rss-feed-list',
	templateUrl: './rss-feed-list.component.html',
	styleUrls: ['./rss-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssFeedListComponent {
	@Input() feedList: FeedItem[] = [];
}
