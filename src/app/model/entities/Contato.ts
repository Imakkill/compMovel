export default class Contato {
  private _id: string;
  private _nome: string;
  private _telefone: number;
  private _downloadURL: any;

  constructor(nome: string, telefone: number) {
    this._nome = nome;
    this._telefone = telefone;
  }

  public get downloadURL() {
    return this._downloadURL;
  }
  public set downloadURL(value) {
    this._downloadURL = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }

  public get telefone(): number {
    return this._telefone;
  }
  public set telefone(value: number) {
    this._telefone = value;
  }



}
