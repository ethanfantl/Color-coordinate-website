import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { colorStorage } from './app/misc/colorStorage.model'; // Import the Color interface

const STORAGE_KEY_THING = 'password';

if (!sessionStorage.getItem(STORAGE_KEY_THING)) {
  const initialColors: colorStorage[] = [
    { id: 1, name: 'Red', hex: '#FF0000' },
    { id: 2, name: 'Orange', hex: '#FFA500' },
    { id: 3, name: 'Yellow', hex: '#FFFF00' },
    { id: 4, name: 'Green', hex: '#00FF00' },
    { id: 5, name: 'Blue', hex: '#0000FF' },
    { id: 6, name: 'Purple', hex: '#800080' },
    { id: 7, name: 'Grey', hex: '#808080' },
    { id: 8, name: 'Brown', hex: '#964B00' },
    { id: 9, name: 'Black', hex: '#000000' },
    { id: 10, name: 'Teal', hex: '#B2D8D8' },
  ];
  sessionStorage.setItem(STORAGE_KEY_THING, JSON.stringify(initialColors));
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
