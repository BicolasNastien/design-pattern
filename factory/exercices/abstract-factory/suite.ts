interface Document {
  create(title: string): void;
  export(format: string): void;
}

interface Spreadsheet {
  create(title: string): void;
  export(format: string): void;
}

interface Presentation {
  create(title: string): void;
  export(format: string): void;
}

interface DocumentFactory {
  createDocument(): Document;
  createSpreadsheet(): Spreadsheet;
  createPresentation(): Presentation;
}

class MicrosoftDocument implements Document {
  create(title: string): void {
    console.log(`[Microsoft Document] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Microsoft Document] exported as ${format}`);
  }
}

class MicrosoftSpreadsheet implements Spreadsheet {
  create(title: string): void {
    console.log(`[Microsoft Spreadsheet] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Microsoft Spreadsheet] exported as ${format}`);
  }
}

class MicrosoftPresentation implements Presentation {
  create(title: string): void {
    console.log(`[Microsoft Presentation] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Microsoft Presentation] exported as ${format}`);
  }
}

class MicrosoftFactory implements DocumentFactory {
  createDocument(): Document {
    return new MicrosoftDocument();
  }

  createSpreadsheet(): Spreadsheet {
    return new MicrosoftSpreadsheet();
  }

  createPresentation(): Presentation {
    return new MicrosoftPresentation();
  }
}

class GoogleDocument implements Document {
  create(title: string): void {
    console.log(`[Google Document] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Google Document] exported as ${format}`);
  }
}

class GoogleSpreadsheet implements Spreadsheet {
  create(title: string): void {
    console.log(`[Google Spreadsheet] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Google Spreadsheet] exported as ${format}`);
  }
}

class GooglePresentation implements Presentation {
  create(title: string): void {
    console.log(`[Google Presentation] ${title} created`);
  }
  export(format: string): void {
    console.log(`[Google Presentation] exported as ${format}`);
  }
}

class GoogleFactory implements DocumentFactory {
  createDocument(): Document {
    return new GoogleDocument();
  }

  createSpreadsheet(): Spreadsheet {
    return new GoogleSpreadsheet();
  }

  createPresentation(): Presentation {
    return new GooglePresentation();
  }
}

function buildDocumentGenerator(factory: DocumentFactory) {
  const doc = factory.createDocument();
  const sheet = factory.createSpreadsheet();
  const pres = factory.createPresentation();

  doc.create("My Doc");
  sheet.create("My Sheet");
  pres.create("My Slides");
}

function getUserPreference(): string {
  return "microsoft";
}

const factory: DocumentFactory =
  getUserPreference() === "microsoft"
    ? new MicrosoftFactory()
    : new GoogleFactory();

buildDocumentGenerator(factory);
