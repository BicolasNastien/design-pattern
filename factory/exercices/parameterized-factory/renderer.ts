interface Renderer {
  render(source: string): void;
}

class RendererFactory {
  private registry = new Map<string, new () => Renderer>();

  register(key: string, ctor: new () => Renderer): this {
    this.registry.set(key, ctor);
    return this;
  }

  create(key: string): Renderer {
    const Ctor = this.registry.get(key);

    if (!Ctor) throw new Error(`Renderer "${key}" not registered`);
    return new Ctor();
  }

  has(key: string): boolean {
    return this.registry.has(key);
  }

  keys(): string[] {
    return [...this.registry.keys()];
  }
}

class ImageRenderer implements Renderer {
  render(source: string): void {
    console.log(`[Image] Render "${source}"`);
  }
}

class VideoRenderer implements Renderer {
  render(source: string): void {
    console.log(`[Video] Render "${source}"`);
  }
}

class AudioRenderer implements Renderer {
  render(source: string): void {
    console.log(`[Audio] Render "${source}"`);
  }
}

// Client code
const factory = new RendererFactory();
factory
  .register('image', ImageRenderer)
  .register('video', VideoRenderer)
  .register('audio', AudioRenderer);

const imageRenderer = factory.create('image');
const videoRenderer = factory.create('video');
const audioRenderer = factory.create('audio');

imageRenderer.render('image.png'); // [Image] Render "image.png"
videoRenderer.render('video.mp4'); // [Video] Render "video.mp4"
audioRenderer.render('audio.mp3'); // [Audio] Render "audio.mp3"
