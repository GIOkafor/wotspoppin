import { User } from './user';

export class Event {
	name: string;
	date: string;
	description: string;
	promoImage: string;
	guestList: Array<User>;
}
