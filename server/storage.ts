import { contacts, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private currentContactId: number;

  constructor() {
    this.contacts = new Map();
    this.currentContactId = 1;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      id,
      name: insertContact.name,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      company: insertContact.company ?? null,
      location: insertContact.location ?? null,
      spaceType: insertContact.spaceType ?? null,
      message: insertContact.message ?? null,
      customerSize: insertContact.customerSize ?? null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
