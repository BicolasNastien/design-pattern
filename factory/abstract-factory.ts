interface Button {
  render(): string;
  onClick(): void;
}

interface Input {
  render(): string;
  onFocus(): void;
}

interface Modal {
  render(): string;
  open(): void;
}

interface ThemeFactory {
  createButton(): Button;
  createInput(): Input;
  createModal(): Modal;
}

class LightButton implements Button {
  render() { return '<button class="btn-light">Click</button>'; }
  onClick() { console.log('Light button clicked.'); }
}

class LightInput implements Input {
  render() { return '<input class="input-light" />'; }
  onFocus() { console.log('Light input focused.'); }
}

class LightModal implements Modal {
  render() { return '<div class="modal-light">...</div>'; }
  open() { console.log('Light modal opened.'); }
}

class LightThemeFactory implements ThemeFactory {
  createButton(): Button { return new LightButton(); }
  createInput(): Input { return new LightInput(); }
  createModal(): Modal { return new LightModal(); }
}

class DarkButton implements Button {
  render() { return '<button class="btn-dark">Click</button>'; }
  onClick() { console.log('Dark button clicked.'); }
}

class DarkInput implements Input {
  render() { return '<input class="input-dark" />'; }
  onFocus() { console.log('Dark input focused.'); }
}

class DarkModal implements Modal {
  render() { return '<div class="modal-dark">...</div>'; }
  open() { console.log('Dark modal opened.'); }
}

class DarkThemeFactory implements ThemeFactory {
  createButton(): Button { return new DarkButton(); }
  createInput(): Input { return new DarkInput(); }
  createModal(): Modal { return new DarkModal(); }
}

// Client code
function buildUI(factory: ThemeFactory) {
  const button = factory.createButton();
  const input = factory.createInput();
  const modal = factory.createModal();

  console.log(button.render());
  console.log(input.render());
  console.log(modal.render());
}

function getUserPreference(): string {
  return 'dark';
}

const theme = getUserPreference() === 'dark' ? new DarkThemeFactory() : new LightThemeFactory();
buildUI(theme);
