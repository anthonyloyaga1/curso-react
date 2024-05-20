export interface Journal {
  isSaving: boolean;
  messageSaved: string;
  messageDeleted: string;
  notes: Note[];
  activate: any;
  active: Note;
}

export interface Note {
  id?: string;
  title: string;
  body: string;
  imageUrl?: string[];
  date: number;
}
