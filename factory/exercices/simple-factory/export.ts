interface Exporter {
  export(data: Record<string, unknown>[]): string;
}

class CsvExporter implements Exporter {
  export(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => row[h]).join(','));

    return [headers.join(','), ...rows].join('\n');
  }
}

class JsonExporter implements Exporter {
  export(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2);
  }
}

class XmlExporter implements Exporter {
  export(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return '<items></items>';
    }

    const items = data.map(row => {
      const fields = Object.keys(row)
        .map(key => `   <${key}>${row[key]}</${key}>`)
        .join('\n');
      return `<item>\n${fields}\n   </item>`;
    });

    return `<items>\n${items.join('\n')}\n</items>`;
  }
}

class ExporterFactory {
  static create(type: 'csv' | 'json' | 'xml'): Exporter {
    switch (type) {
      case 'csv': return new CsvExporter();
      case 'json': return new JsonExporter();
      case 'xml': return new XmlExporter();
      default: throw new Error(`${type} exporter is not implemented.`);
    }
  }
}

// Client code
const data = [
  { name: 'Alice', age: 30, city: 'Paris' },
  { name: 'Bob', age: 42, city: 'Lyon' }
];

// CSV
console.log(ExporterFactory.create('csv').export(data));
// name,age,city
// Alice,30,Paris
// Bob,42,Lyon

// JSON
console.log(ExporterFactory.create('json').export(data));
// [
//   {
//     "name": "Alice",
//     "age": 30,
//     "city": "Paris"
//   },
//   {
//     "name": "Bob",
//     "age": 42,
//     "city": "Lyon"
//   }
// ]

// XML
console.log(ExporterFactory.create('xml').export(data));
// <items>
// <item>
//    <name>Alice</name>
//    <age>30</age>
//    <city>Paris</city>
//    </item>
// <item>
//    <name>Bob</name>
//    <age>42</age>
//    <city>Lyon</city>
//    </item>
// </items>
