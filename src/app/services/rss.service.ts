import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FeedItem } from '../models';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
	providedIn: 'root',
})
export class RssService {
	constructor(private httpClient: HttpClient) {}

	getRss(rssUrl: string): Observable<FeedItem[]> {
		return this.httpClient
			.get(CORS_PROXY + rssUrl, {
				responseType: 'text',
			})
			.pipe(
				map((response: string) => this._parseXmlString(response)),
				map((nodeList: NodeListOf<Element>) => this._prepareFeedData(nodeList))
			);
	}

	private _prepareFeedData(nodeList: NodeListOf<Element>): FeedItem[] {
		const feedList: FeedItem[] = [];

		nodeList.forEach((node) => {
			feedList.push(new FeedItem(node));
		});

		return feedList;
	}

	private _parseXmlString(xmlString: string): NodeListOf<Element> {
		const parser = new DOMParser();
		const rssFeed = parser.parseFromString(xmlString, 'text/xml');

		return rssFeed.querySelectorAll('item');
	}
}
