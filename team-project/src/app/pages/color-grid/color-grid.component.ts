import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { colorStorage } from '../../misc/colorStorage.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-grid.component.html',
  styleUrls: ['./color-grid.component.css']
})
export class ColorGridComponent implements OnInit {
  rows = 5;
  cols = 5;
  colors: colorStorage[] = [];
  grid: { selectedColorId: number | null }[][] = [];

  ngOnInit() {
    const stored = sessionStorage.getItem('password');
    if (stored) this.colors = JSON.parse(stored);

    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({ selectedColorId: null }))
    );
  }

  getColorHex(id: number | null): string {
    const color = this.colors.find(c => c.id === id);
    return color ? color.hex : 'transparent';
  }

  getCoordinate(i: number, j: number): string {
    return `${String.fromCharCode(65 + i)}${j + 1}`;
  }
}
