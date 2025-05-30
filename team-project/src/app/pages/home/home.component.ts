import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private snackBar: MatSnackBar) {}
  errorMessage: string = ""
  showTables: boolean = false;
  colorTable: { selected: boolean; color: string }[] = [];
  rowList: { dummy: number}[] = [];
  colList: { dummy: number}[] = [];
  selectedRow: number = 0;

  availableColors: string[] = ['Red', 'Orange', 'Yellow', 'Green', 
    'Blue', 'Purple', 'Grey', 'Brown', 'Black', 'Teal'];

  cellColors: string[][] = [];

  ROW_MIN = 1;
  ROW_MAX = 1000;
  COL_MIN = 1;
  COL_MAX = 702;
  COLOR_MIN = 1;
  COLOR_MAX = 10;

  checkRows(rowsString: string): boolean {
    const rowsAsNumber = Number(rowsString);
    if (rowsString === '') {
      this.errorMessage += 'Rows value is required.\n';
      return false;
    } else if (isNaN(rowsAsNumber)) {
      this.errorMessage += 'Rows must be a number.\n';
      return false;
    } else if (!Number.isInteger(rowsAsNumber)) {
      this.errorMessage += 'Rows must be a whole number.\n';
      return false;
    } else if (rowsAsNumber < this.ROW_MIN || rowsAsNumber > this.ROW_MAX) {
      this.errorMessage += `Rows must be between ${this.ROW_MIN} and ${this.ROW_MAX}.\n`;
      return false;
    }
    return true;
  }
  checkColumns(columnsString: string): boolean {
    const colsAsNumber = Number(columnsString);
    if (columnsString === '') {
      this.errorMessage += "Columns value is empty.";
      return false;
    } else if (isNaN(colsAsNumber)) {
      this.errorMessage += "Column value must be a number.";
      return false;
    } else if (!Number.isInteger(colsAsNumber)) {
      this.errorMessage += "Column value must be an integer";
      return false;
    } else if (colsAsNumber < this.COL_MIN || colsAsNumber > this.COL_MAX){
      this.errorMessage += `Columns must be between ${this.COL_MIN} and ${this.COL_MAX}.`;
      return false;
    }
    return true;
  }

  checkColors(colorsString: string): boolean {
    const colorsAsNumber = Number(colorsString);
    if (colorsString === '') {
      this.errorMessage += "Colors value is empty.";
      return false;
    } else if (isNaN(colorsAsNumber)) {
      this.errorMessage += "Color value must be a number.";
      return false;
    } else if (!Number.isInteger(colorsAsNumber)) {
      this.errorMessage += "Color value must be an integer";
      return false;
    } else if (colorsAsNumber < this.COLOR_MIN || colorsAsNumber > this.COLOR_MAX){
      this.errorMessage += `Color must be between ${this.COLOR_MIN} and ${this.COLOR_MAX}.`;
      return false;
    }
    return true;
  }
  clearErrorMessage(): void {
    this.errorMessage = ""
  }

  generateTables(rowsStr: string, colsStr: string, colorsStr: string): void {
    this.errorMessage = '';
    let isFormValid = true;
    isFormValid = this.checkRows(rowsStr) && this.checkColors(colorsStr) && this.checkColumns(colsStr);

    if (isFormValid) {
      this.snackBar.open("All inputs are valid", "Close", {
        duration: 2000,
        verticalPosition:  'top',
        horizontalPosition: 'center'
      });
      this.createTables(rowsStr, colsStr, colorsStr);
      this.showTables = true;
    } else {
        this.snackBar.open(this.errorMessage, "Close", {
          duration: 2000,
          verticalPosition:  'top',
          horizontalPosition: 'center'
        });
    }
    this.clearErrorMessage();
  }
  // NOW ACTUALLY GENERATE THE TABLES

  createTables(rowsStr: string, colsStr: string, colorsStr: string): void {
    const colorCount = Number(colorsStr);
    
    this.colorTable = [];
    this.cellColors = [];

    for(let i = 0; i < Number(rowsStr); i++) {
      const row: string[] = [];
      for(let j = 0; j < Number(colsStr); j++) {
        row.push("");
      }
      this.cellColors.push(row);
    }

    const tempColors = this.availableColors.slice(0, colorCount);

    for(let i = 0; i < colorCount; i++) {
      this.colorTable.push({
        selected: i === 0, color: tempColors[i]
      });
    }
    this.selectedRow = 0;

    const rowCount = Number(rowsStr);
    for(let i = 0; i <= rowCount; i++) {
      this.rowList.push({
        dummy: 0,
      });
    }

    const colCount = Number(colsStr);
    for(let i = 0; i <= colCount; i++) {
      this.colList.push({
        dummy: 0,
      });
    }
  }

  colorCell(row: number, col: number): void {
    const selectedColor = this.colorTable[this.selectedRow].color;
    this.cellColors[row][col] = selectedColor;
  }

  onSelectRow(index: number): void {
    this.selectedRow = index;
    this.colorTable.forEach((row, i) => {
      row.selected = i === index;
    })
  }

  onColorChange(index: number, newColor: string): void {
    if (this.colorTable[index].color === newColor) {
      return;
    }
    const isDuplicate = this.colorTable.some((row, idx) => row.color === newColor && idx !== index);
  
    if (!isDuplicate) {
      this.colorTable[index].color = newColor;
    } else {
      this.snackBar.open("Color already taken", "Close", {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  isColorTaken(color: string, currentIndex: number): boolean {
    return this.colorTable.some((row, idx) => row.color === color && idx !== currentIndex);
  }
  //PAST Z this breaks DOWN
  convertIndexToExcelFormat(index: number): string {
    let result = "";
    let tempNum = index;
  
    while (tempNum > 0) {
      const remainder = (tempNum - 1) % 26;
      const char = String.fromCharCode(65 + remainder);
      result = char + result;
      tempNum = Math.floor((tempNum - 1) / 26);
    }
  
    return result;
}
  generateExcelArray(lengthString: string): string[] {
    let length: number = Number(lengthString);
    let headers: string[] = [];
    for (let i = 1; i <= length; i++) {
        headers.push(this.convertIndexToExcelFormat(i));
    }
    return headers;
  }
  getColumnNumbers(lengthString: string): number[] {
    let length: number = Number(lengthString);
    let arrayOfNumbers: number[] = [];
    for (let i =0; i < length; i++){
      arrayOfNumbers.push(i);
    }
    return arrayOfNumbers;
  }
  getRowNumbers(lengthString: string): number[] {
    let length: number = Number(lengthString);
    let arrayOfNumbers: number[] = [];
    for (let i =0; i < length; i++){
      arrayOfNumbers.push(i);
    }
    return arrayOfNumbers;
  }
  createTableClickAnnouncement(rowNumber: number, colNumber:number) {
    this.snackBar.open((this.convertIndexToExcelFormat(colNumber+1)).toString() + (rowNumber+1).toString(), "Close", {
      duration: 2000,
      verticalPosition:  'top',
      horizontalPosition: 'center'
    });
  }
}