interface Button {
  onClick(): void;
  render(): string;
}

interface Input {
  onFocus(): void;
  render(): string;
}

interface Card {
  onHover(): void;
  render(): string;
}

interface ThemeFactory {
  createButton(): Button;
  createInput(): Input;
  createCard(): Card;
}

class CupertinoButton implements Button {
  onClick(): void {
    console.log('[Button] clicked');
  }

  render(): string {
    return '<button class="cupertino-btn">Click</button>';
  }
}

class CupertinoInput implements Input {
  onFocus(): void {
    console.log('[Input] focused');
  }

  render(): string {
    return '<input class="cupertino-input" type="text" />';
  }
}

class CupertinoCard implements Card {
  onHover(): void {
    console.log('[Card] hovered');
  }

  render(): string {
    return '<div class="cupertino-card"></div>';
  }
}

class CupertinoThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new CupertinoButton();
  }

  createInput(): Input {
    return new CupertinoInput();
  }

  createCard(): Card {
    return new CupertinoCard();
  }
}

class MaterialButton implements Button {
  onClick(): void {
    console.log('[Button] clicked');
  }

  render(): string {
    return '<button class="material-btn">Click</button>';
  }
}

class MaterialInput implements Input {
  onFocus(): void {
    console.log('[Input] focused');
  }

  render(): string {
    return '<input class="material-input" type="text" />';
  }
}

class MaterialCard implements Card {
  onHover(): void {
    console.log('[Card] hovered');
  }

  render(): string {
    return '<div class="material-card"></div>';
  }
}

class MaterialThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new MaterialButton();
  }

  createInput(): Input {
    return new MaterialInput();
  }

  createCard(): Card {
    return new MaterialCard();
  }
}

// Client code
function buildUI(theme: ThemeFactory): void {
  const button = theme.createButton();
  const input = theme.createInput();
  const card = theme.createCard();

  console.log(button.render());
  console.log(input.render());
  console.log(card.render());
}

function getUserPreference(): string {
  return 'material';
}

const theme = getUserPreference() === 'material' ? new MaterialThemeFactory() : new CupertinoThemeFactory();
buildUI(theme);
