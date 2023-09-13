import { Component, Input, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Field } from '../../+state/forms.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cdt-multilist',
  standalone: true,
  templateUrl: './multilist.component.html',
  styleUrls: ['./multilist.component.css'],
  imports: [ReactiveFormsModule , CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MultiListComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}
