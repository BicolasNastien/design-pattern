interface Attachment {
  filename: string;
  data: unknown;
}

interface IEmailBuilder {
  from(address: string): this;
  to(addresses: string[]): this;
  subject(text: string): this;
  htmlBody(text: string): this;
  textBody(text: string): this;
  attachment(filename: string, data: unknown): this;
  scheduledAt(date: Date): this;
  build(): Email;
}

interface Email {
  from: string;
  to: string[];
  subject: string;
  textBody: string;
  htmlBody: string;
  attachments: Attachment[];
  scheduledAt: Date;
}

class EmailBuilder implements IEmailBuilder {
  private _from: string = '';
  private _to: string[] = [];
  private _subject: string = '';
  private _htmlBody: string = '';
  private _textBody: string = '';
  private _attachments: Attachment[] = [];
  private _scheduledAt: Date = new Date();

  from(address: string): this {
    this._from = address;
    return this;
  }

  to(addresses: string[]): this {
    this._to = addresses;
    return this;
  }

  subject(text: string): this {
    this._subject = text;
    return this;
  }

  htmlBody(text: string): this {
    this._htmlBody = text;
    return this;
  }

  textBody(text: string): this {
    this._textBody = text;
    return this;
  }

  attachment(filename: string, data: unknown): this {
    this._attachments.push({ filename, data });
    return this;
  }

  scheduledAt(date: Date): this {
    this._scheduledAt = date;
    return this;
  }

  build(): Email {
    return {
      from: this._from,
      to: this._to,
      subject: this._subject,
      htmlBody: this._htmlBody,
      textBody: this._textBody,
      attachments: this._attachments,
      scheduledAt: this._scheduledAt,
    };
  }
}

const pdfData = '' /* ... */;
const gcsData = '' /* ... */;

const email = new EmailBuilder()
  .from('me@example.com')
  .to(['client@example.com'])
  .subject('promo')
  .htmlBody('<h1>Hello</h1>')
  .textBody('Hello')
  .attachment('invoice.pdf', pdfData)
  .attachment('gcs', gcsData)
  .scheduledAt(new Date('2026-07-01'))
  .build();

