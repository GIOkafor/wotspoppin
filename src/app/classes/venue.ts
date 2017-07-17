import { Event } from './event';

export class Venue {
	name: string;
	address: string;
	imageUrl: string;
	menu: Array<string>;
	events: Array<Event>;
}
