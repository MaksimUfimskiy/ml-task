import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { MaterialModule } from './material/material.module';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { RssSearchComponent } from './components/rss-search/rss-search.component';
import { RssFeedListComponent } from './components/rss-feed-list/rss-feed-list.component';

@NgModule({
	declarations: [AppComponent, ErrorStateComponent, PaginatorComponent, RssFeedListComponent, RssSearchComponent],
	imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
