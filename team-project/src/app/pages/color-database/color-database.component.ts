import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf/NgFor
import { FormsModule } from '@angular/forms';   // Import FormsModule for ngModel
import { colorStorage } from '../../misc/colorStorage.model'; 
import { IndentStyle } from 'typescript';

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

  createColorStorage(name: string, hex: string, id: number): colorStorage {
    return {
      id,
      name,
      hex,
    };
  }

  addColor(name: string, hex: string, id: string): void {
    let idUsed = false;
    for(let color in this.colorsDatabase){
      if(color[0] == id){
        idUsed = true;
      }
    }
    if(idUsed){

    }
    else{
      this.colorsDatabase.push(this.createColorStorage(name, hex.toUpperCase(), Number(id)));
  
    }
  }

  removeColor(color: colorStorage): void {
    let removeIndex = this.colorsDatabase.indexOf(color);
    this.colorsDatabase.splice(removeIndex, 1);
  }

  changeName(color: colorStorage, newName: string): void {
    let changeIndex = this.colorsDatabase.indexOf(color);
    this.colorsDatabase[changeIndex].name = newName;
  }

  changeHex(color: colorStorage, newHex: string): void {
    let changeIndex = this.colorsDatabase.indexOf(color);
    this.colorsDatabase[changeIndex].hex = newHex.toUpperCase();
  }

}
