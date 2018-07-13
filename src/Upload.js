/**
 * Created by corynull on 4/10/17.
 */

const { ModelNameToModel } = require("./index");
const RESTModel = require("./RESTModel");

class Upload extends RESTModel {
	get fileName() {
		return this.getField("fileName");
	}

	set fileName(value) {
		this.setField("fileName", value);
	}

	get fileData() {
		return this.getField("fileData");
	}

	set fileData(value) {
		this.setField("fileData", value);
	}

	get title() {
		return this.getField("title");
	}

	set title(value) {
		this.setField("title", value);
	}

	get description() {
		return this.getField("description");
	}

	set description(value) {
		this.setField("description", value);
	}

	get owners() {
		return this.getField("owners");
	}

	set owners(value) {
		this.setField("owners", value);
	}

	getOwners(token) {
		const owners = Array.from(this.owners);
		if (owners.length !== 0)
			return RESTModel.findMany(
				"User",
				{
					_id: owners
				},
				token,
				true
			);
		return Promise.resolve([]);
	}

	userIsOwner(user) {
		if (Array.isArray(this.owners)) {
			let userId = null;
			if (typeof user === "string") userId = user;
			else if (typeof user === "object" && user) userId = user._id;
			return this.owners.find(id => id === userId) !== undefined;
		}
		return false;
	}

	valid() {
		if (!super.valid()) return false;
		if (!this.title) return false;
		if (!this.description) return false;
		if (!this.fileData) return false;
		if (!this.fileName) return false;
		if (!Array.isArray(this.owners)) return false;
		if (this.owners.length === 0) return false;
		return true;
	}

	static async uploadFile(dataUrl, fileName, token) {
		let upload = new Upload({ fileData: dataUrl, fileName });
		upload = await upload.save(token, true);
		return upload;
	}

	static findById(id, token) {
		return RESTModel.findById("Upload", id, token, true);
	}

	static findMany(criteria, token) {
		return RESTModel.findMany("Upload", criteria, token, true);
	}

	static getAllOwned(token) {
		return RESTModel.findMany("Upload", null, token, true);
	}
}

Upload.ModelName = "Upload";

module.exports = Upload;
