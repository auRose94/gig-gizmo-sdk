/**
 * Created by corynull on 5/23/17.
 */

import RESTModel from "./RESTModel";

export default class Post extends RESTModel {
  static ModelName: string = "Post";

  get userId() {
    return this.getField("userId");
  }

  set userId(value) {
    this.setField("userId", value);
  }

  get network() {
    return this.getField("network");
  }

  set network(value) {
    this.setField("network", value);
  }

  get accountId() {
    return this.getField("accountId");
  }

  set accountId(value) {
    this.setField("accountId", value);
  }

  get pageId() {
    return this.getField("pageId");
  }

  set pageId(value) {
    this.setField("pageId", value);
  }

  get postText() {
    return this.getField("postText");
  }

  set postText(value) {
    this.setField("postText", value);
  }

  get postDate() {
    return this.getField("postDate");
  }

  set postDate(value) {
    this.setField("postDate", value);
  }

  get coordinates() {
    return this.getField("coordinates");
  }

  set coordinates(value) {
    this.setField("coordinates", value);
  }

  get error() {
    return this.getField("error");
  }

  set error(value) {
    this.setField("error", value);
  }

  get done() {
    return this.getField("done");
  }

  set done(value) {
    this.setField("done", value);
  }

  isValid() {
    if (!super.isValid()) return false;
    return true;
  }

  canSave() {
    if (!this.postDate) return false;
    if (!this.postText || this.postText === "") return false;
    if (!this.network)
      // TODO: Do network validation
      return false;
    return true;
  }

  userIsOwner(user: any) {
    if (typeof user === "string") return user === this.userId;
    if (typeof user === "function" && user && user.isValid())
      return user._id === this.userId;
    return false;
  }

  static findById(id: string) {
    return RESTModel.findByIdBase(Post, id);
  }

  static getAllOwned() {
    return RESTModel.findManyBase(Post, null);
  }

  static findMany(criteria: object | null) {
    return RESTModel.findManyBase(Post, criteria);
  }
}
