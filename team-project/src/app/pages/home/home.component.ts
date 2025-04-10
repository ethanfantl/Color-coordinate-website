import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private snackBar: MatSnackBar) {}
  errorMessage: string = ""
  showTables: boolean = false;

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
    this.showTables = false;
    let isFormValid = true;
    isFormValid = this.checkRows(rowsStr) && this.checkColors(colorsStr) && this.checkColumns(colsStr);

    if (isFormValid) {
      this.snackBar.open("All inputs are valid", "Close", {
        duration: 2000,
        verticalPosition:  'top',
        horizontalPosition: 'center'
      });
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


}