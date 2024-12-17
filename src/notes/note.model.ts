export class Note {
  constructor(public data: string[] = ['Moon Halo', 'True', 'Regression']) {}

  create(note: string) {
    this.data.push(note);
    return this.data;
  }

  readAll() {
    return this.data;
  }

  readOne(index: number) {
    return this.data[index];
  }

  update(index: number, note: string) {
    return (this.data[index] = note);
  }

  delete(index: number) {
    return this.data.splice(index, 1);
  }
}
