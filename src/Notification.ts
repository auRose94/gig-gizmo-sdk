/**
 * Created by corynull on 8/15/17.
 */

import API from "./API";
import RESTModel from "./RESTModel";

export default class Notification extends RESTModel {
  static ModelName: string = "Notification";
  static Callbacks = new Map();
  private changeCallbacks = new Map();

  get userId() {
    return this.getField("userId");
  }

  set userId(value) {
    this.setField("userId", value);
  }

  get label() {
    return this.getField("label");
  }

  set label(value) {
    this.setField("label", value);
  }

  get message() {
    return this.getField("message");
  }

  set message(value) {
    this.setField("message", value);
  }

  get actions() {
    return this.getField("actions");
  }

  set actions(value) {
    this.setField("actions", value);
  }

  get seenByUser() {
    return this.getField("seenByUser");
  }

  set seenByUser(value) {
    this.setField("seenByUser", value);
  }

  newChangeCallback(callback: any) {
    const i = Date.now();
    this.changeCallbacks.set(i, callback);
    return () => this.changeCallbacks.delete(i);
  }

  static onNewNotification(note: any) {
    Notification.Callbacks.forEach((callback: any) => callback(note));
  }

  static newCallback(callback: any) {
    const callbackId = Date.now();
    Notification.Callbacks.set(callbackId, callback);
    return () => Notification.Callbacks.delete(callbackId);
  }

  static async getNewNotifications() {
    if(API.token !== null) {
      const notes = await API.call("GET", "/API/Notification", {
        returnNew: true
      });
      return Array.from(notes).map((item: any) => new Notification(item));
    } else
      return [];
  }

  static getAllOwned() {
    return RESTModel.findManyBase("Notification", null, true);
  }

  static findById(id: string) {
    return RESTModel.findByIdBase("Notification", id, true);
  }

  static connectSocket() {
    API.getSocket().then((socket: SocketIOClient.Socket) => {
      socket.on("notification", (data: any) =>
        Notification.onNewNotification(new Notification(data))
      );
    }, console.error);
  }
}