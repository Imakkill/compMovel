import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Contato from '../entities/Contato';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'contatos';

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  read() {
    return this.firestore.collection(this.PATH)
      .snapshotChanges();
  }

  create(contato: Contato) {
    return this.firestore.collection(this.PATH)
      .add({ nome: contato.nome, telefone: contato.telefone });
  }
  createWithImage(contato: Contato) {
    return this.firestore.collection(this.PATH)
      .add({ nome: contato.nome, telefone: contato.telefone, downloadURL: contato.downloadURL });
  }
  update(contato: Contato, id: string) {
    return this.firestore.collection(this.PATH).doc(id)
      .update({ nome: contato.nome, telefone: contato.telefone });
  }
  updateWithImage(contato: Contato, id: string) {
    return this.firestore.collection(this.PATH).doc(id)
      .update({ nome: contato.nome, telefone: contato.telefone, downloadURL: contato.downloadURL });
  }

  delete(contato: Contato) {
    return this.firestore.collection(this.PATH)
      .doc(contato.id)
      .delete()
  }

  uploadImage(image: any, contato: Contato) {
    const file = image.item(0)
    if (file.type.split('/')[0] != 'image') {
      console.error('Tipo Não Suportado')
      return;
    }

    const path = `image/${contato.nome}_${file.name}`;
    const fileRef = this.storage.ref(path)
    let task = this.storage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          contato.downloadURL = resp
          if (!contato.id) {
            this.createWithImage(contato);
          } else {
            this.update(contato, contato.id) 
          }
        })
      })).subscribe()

  }

}
