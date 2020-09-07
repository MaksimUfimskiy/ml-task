import { get } from 'lodash';

export interface ErrorDetails {
	message: string;
	status: number;
	statusText: string;
}

export class FeedItem {
	link: string;
	title: string;
	description: string;
	pubDate: Date;
	constructor(node: Element) {
		this.link = get(node.querySelector('link'), 'textContent', '');
		this.title = get(node.querySelector('title'), 'textContent', 'No Title');
		this.description = get(node.querySelector('description'), 'textContent', '');
		const pubDateStr = get(node.querySelector('pubDate'), 'textContent');

		if (pubDateStr) {
			this.pubDate = new Date(pubDateStr);
		}
	}
}
