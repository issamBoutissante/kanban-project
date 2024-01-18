import { Component } from '@angular/core';
import { kanbanData } from './datasource';
import { extend, addClass } from '@syncfusion/ej2-base';
import {
  KanbanComponent,
  ColumnsModel,
  CardSettingsModel,
  SwimlaneSettingsModel,
  DialogSettingsModel,
  CardRenderedEventArgs,
} from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public kanbanData: Object[] = kanbanData;
  public columns: ColumnsModel[] = [
    { headerText: 'To Do', keyField: 'Open', allowToggle: true },
    { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
    { headerText: 'In Review', keyField: 'Review', allowToggle: true },
    { headerText: 'Done', keyField: 'Close', allowToggle: true },
  ];
  public cardSettings: CardSettingsModel = {
    headerField: 'Title',
    template: '#cardTemplate',
    selectionType: 'Multiple',
  };
  public dialogSettings: DialogSettingsModel = {
    fields: [
      { text: 'ID', key: 'Title', type: 'TextBox' },
      { key: 'Status', type: 'DropDown' },
      { key: 'Assignee', type: 'DropDown' },
      { key: 'RankId', type: 'TextBox' },
      { key: 'Summary', type: 'TextArea' },
    ],
  };
  public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

  constructor() {}
  /*
  public getString(assignee: string) {
    return assignee
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase();
  }
  cardRendered(args: CardRenderedEventArgs): void {
    const val: string = (<{ [key: string]: Object }>args.data)
      .Priority as string;
    addClass([args.element], val);
  }
  */
}
