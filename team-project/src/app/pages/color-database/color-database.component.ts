import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf/NgFor
import { FormsModule } from '@angular/forms';   // Import FormsModule for ngModel
import { colorStorage } from '../../misc/colorStorage.model'; 

@Component({
  selector: 'app-color-database',
  imports: [CommonModule, FormsModule],
  templateUrl: './color-database.component.html',
  styleUrl: './color-database.component.css'
})
export class ColorDatabaseComponent implements OnInit{
  colorsDatabase: colorStorage[] = []

  constructor() {}

  ngOnInit(): void {
    this.loadColorsFromSessionStorage();
  }

  private loadColorsFromSessionStorage() {
    const retrievedColors = sessionStorage.getItem('password');
    if (retrievedColors) {
      this.colorsDatabase = JSON.parse(retrievedColors);
    } else {
      this.colorsDatabase = [];
    }
  }

  private saveColorsToSessionStorage(colorsToSave: colorStorage[]): void {
    sessionStorage.setItem('password', JSON.stringify(colorsToSave));
    this.loadColorsFromSessionStorage();
  }

}
