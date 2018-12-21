import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Post} from './entity/post';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    postCollection: AngularFirestoreCollection<Post>;

    constructor(private db: AngularFirestore) {
        this.postCollection = this.db.collection('posts');
    }

    getPosts() {
        return this.postCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Post;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }
}
