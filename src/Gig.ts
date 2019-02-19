/**
 * Created by corynull on 4/5/17.
 */

import API from "./API";
import Band from "./Band";
import Location from "./Location";
import RESTModel from "./RESTModel";
import Venue from "./Venue";

export default class Gig extends RESTModel {
	public static ModelName: string = "Gig";

	get startTime(): string {
		const startTime = this.getField("startTime");
		return startTime ? new Date(startTime) : startTime;
	}

	set startTime(value: string) {
		this.setField("startTime", value);
	}

	get stopTime(): Date {
		const stopTime = this.getField("stopTime");
		return stopTime ? new Date(stopTime) : stopTime;
	}

	set stopTime(value: Date) {
		this.setField("stopTime", value.toJSON());
	}

	get location(): string {
		return this.getField("location");
	}

	set location(value: string) {
		this.setField("location", value);
	}

	get venue(): string {
		return this.getField("venue");
	}

	set venue(value: string) {
		this.setField("venue", value);
	}

	get bands(): string[] {
		return this.getField("bands");
	}

	set bands(value: string[]) {
		this.setField("bands", value);
	}

	get active(): boolean {
		return this.getField("active");
	}

	get toBeAnnounced(): boolean {
		return this.getField("toBeAnnounced");
	}

	set toBeAnnounced(value: boolean) {
		this.setField("toBeAnnounced", value);
	}

	get bandOwnersAccepted(): string[] {
		return this.getField("bandOwnersAccepted");
	}

	set bandOwnersAccepted(value: string[]) {
		this.setField("bandOwnersAccepted", value);
	}

	get venueOwnerAccepted(): string {
		return this.getField("venueOwnerAccepted");
	}

	set venueOwnerAccepted(value: string) {
		this.setField("venueOwnerAccepted", value);
	}

	get owners(): string[] {
		return this.getField("owners");
	}

	set owners(value: string[]) {
		this.setField("owners", value);
	}

	public static findById(id: string): Promise<Gig | null> {
		return RESTModel.findByIdBase(Gig, id, true) as Promise<Gig | null>;
	}

	public static async findByBand(bandId: string): Promise<Gig[]> {
		const data = await API.call("GET", `/API/Band/${bandId}/Gigs`, null);
		if (data && Array.isArray(data)) {
			return data.map((itemData: any) => {
				const item = new Gig(itemData);
				RESTModel.Cache.set(item._id, item);
				return item;
			});
		}
		throw new Error(`Expected Array, got ${data}`);
	}

	public static async findByVenue(venueId: string): Promise<Gig[]> {
		const data = await API.call("GET", `/API/Venue/${venueId}/Gigs`, null);
		if (data && Array.isArray(data)) {
			return data.map((itemData: any) => {
				const item = new Gig(itemData);
				RESTModel.Cache.set(item._id, item);
				return item;
			});
		}
		throw new Error(`Expected Array, got ${data}`);
	}

	public static getAllOwned(): Promise<Gig[]> {
		return RESTModel.findManyBase(Gig, null, true) as Promise<Gig[]>;
	}

	public static findMany(criteria: object | null): Promise<Gig[]> {
		return RESTModel.findManyBase(Gig, criteria, true) as Promise<Gig[]>;
	}

	public static createGigs(gigData: object): Promise<Gig[]> {
		return new Promise((resolve, reject) => {
			const data: any = gigData || {};
			if (data && typeof data === "object") {
				if (!data.band || data.band === "") {
					return reject(new Error("Band is required"));
				}
				if (!data.venue || data.venue === "") {
					return reject(new Error("Venue is required"));
				}
				if (!data.times || data.times.length === 0) {
					return reject(new Error("Times is required"));
				}
				const filtered = data.times.filter(
					(
						time: { dayDate: any; startTime: any; stopTime: any },
						i: number
					) => {
						if (time.dayDate && time.startTime && time.stopTime) {
							const dayDate = new Date(time.dayDate);

							const startTime = new Date(time.startTime);
							startTime.setFullYear(dayDate.getFullYear());
							startTime.setMonth(dayDate.getMonth());
							startTime.setDate(dayDate.getDay());

							const stopTime = new Date(time.stopTime);
							stopTime.setFullYear(dayDate.getFullYear());
							stopTime.setMonth(dayDate.getMonth());
							stopTime.setDate(dayDate.getDay());
							data.times[i] = {
								startTime: time.startTime,
								stopTime: time.stopTime
							};
							return true;
						} else if (time.startTime && time.stopTime) {
							data.times[i] = {
								startTime: time.startTime,
								stopTime: time.stopTime
							};
							return true;
						}
						return false;
					}
				);
				if (filtered.length !== data.times.length) {
					return reject(new Error("Not all times were valid"));
				}
				data.times = filtered;
				const request = API.call("POST", "/API/Gig", data);
				return request.then(
					((response: any) => {
						let gigs: Gig[] = [];
						gigs = Array.from(response || []).map((itemData: any) => {
							const gig = new Gig(itemData);
							return gig;
						});
						resolve(gigs);
					}),
					reject);
			}
			return null;
		});
	}

	public static getAllInDistance(
		location: { lat: number; lng: number },
		distance: number
	): Promise<Gig[]> {
		return new Promise((resolve, reject) => {
			if (typeof location !== "object") {
				return reject(new Error("location is not a object!"));
			}
			if (typeof location.lat !== "number" ||
				typeof location.lng !== "number") {
				return reject(new Error("location does not contain lat or lng!"));
			}
			if (typeof distance !== "number") {
				return reject(new Error("radius is not a number!"));
			}

			return API.call("GET", "/API/Gig/InDistance", {
				dis: distance,
				lat: location.lat,
				lng: location.lng
			}).then(
				((gigs: object[]) => {
					resolve(
						Array.from(gigs).map((item: any) => {
							const gig = new Gig(item);
							return gig;
						})
					);
				}),
				reject);
		});
	}

	public getBands(): Promise<Band[]> {
		return RESTModel.findManyBase(Band, { _id: this.bands }, true) as
			Promise<Band[]>;
	}

	public getVenue(): Promise<Venue> {
		return RESTModel.findByIdBase(Venue, this.venue, true) as
			Promise<Venue>;
	}

	public getLocation(): Promise<Location> {
		return RESTModel.findByIdBase(Location, this.location, true) as
			Promise<Location>;
	}

	public isValid(): boolean {
		if (!super.isValid()) { return false; }
		if (!Array.isArray(this.owners)) { return false; }
		if (this.owners.length === 0) { return false; }
		return true;
	}

	public userIsOwner(user: any): boolean {
		if (Array.isArray(this.owners)) {
			let userId: string;
			if (typeof user === "string") {
				userId = user;
			} else if (typeof user === "object" && user) {
				userId = user._id;
			}
			return this.owners.find((id: string) => id === userId) !== undefined;
		}
		return false;
	}
}
