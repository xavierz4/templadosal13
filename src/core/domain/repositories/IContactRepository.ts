import type { ContactPayload } from '../contactSchema';

export interface IContactRepository {
  saveContact(payload: ContactPayload): Promise<{ id: string }>;
}
