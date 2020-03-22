import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: User = null;
  userId: string = "";
  userAuth: boolean = false;
  private userProfile: AngularFirestoreDocument<any>;

  constructor(    
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private afStorage: AngularFireStorage) { 
      this.fireAuth.authState.subscribe( user => {
        if(user) {
          this.user = user;
          console.log("USERSERVICE.....  auth = true");
          this.userId =  user.uid;
          this.userAuth =  true;
          console.log("userId="+this.userId);
        } else {
          console.log("USERSERVICE.....  auth = false");
          // Empty the value when user signs out
          this.userId =  "";
          this.userAuth =  false;
          console.log("userId="+this.userId);
        }
      });
    }
    get authenticated(): boolean {
      return this.user !== null;
    }
  
     get currentUser(): any {
      return this.authenticated ? this.user : null;
    }
  
    get currentUserId(): string {
      return this.authenticated ? this.user.uid : '';
    }

    // login
    signinUser(newEmail: string, newPassword: string): Promise<any> {
      return this.fireAuth.auth.signInWithEmailAndPassword(newEmail,newPassword)
    }
    resetPassword(email: string):Promise<any> {
      return this.fireAuth.auth.sendPasswordResetEmail(email);
    }
    signoutUser(): Promise<any> {
      return this.fireAuth.auth.signOut();
    }

    // register 
    signupUser(firstname: string, lastname: string, phone: string, username: string, password: string): Promise<any> {
      return this.fireAuth.auth.createUserWithEmailAndPassword(username, password).then((newUser) => {
        console.log("userid========="+newUser.user.uid); 
          this.firestore.collection('userProfile').doc(newUser.user.uid).set({
            id: newUser.user.uid,
            firstname: firstname,
            lastname: lastname,
            email: username,
            image:"",
            phone:phone,
            cep: "",
            rua: "",
            num: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: ""
          })

      });
    }

    uploadUserImage(image){

      let newName = localStorage.getItem('user_nome')+`.png`
      let storageRef: AngularFireStorageReference= this.afStorage.ref(`/users/${newName}`);
      return {
        task: storageRef.putString(image, 'base64', { contentType: 'image/png'}),
        ref: storageRef
      }
    }

    updateUserProfileImage(
      image
    ){
      
      return  this.firestore.doc<any>('userProfile/'+'teste').update({
        image: image
      });
    }

    getDataList = (nodePath, callback, size = 1000) => {
      let query = firebase.database().ref(nodePath).limitToLast(size);
      query.on("value", dataSnapshot => {
        let items = [];
        dataSnapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item["key"] = childSnapshot.key;
          items.push(item);
        });
        callback(items);
      });
  
      return query;
    };
  

    ////////////////////////////////////////////////////////

    getUserDataByID = (node, email, callback) => {
  
      console.log(node)
      const ref = firebase.database().ref(node);
      let newData = [];
      let Data = {};
      ref.once('value', (dataSnapshot) => {

          if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
              callback(null);
              return;
          }

          const snap = dataSnapshot.val();
          console.log(snap)
          const keys = Object.keys(snap);

          let i = 0;
          keys.forEach((key) => {
              
              Data[key] = snap[key]
              if(Data[key].email === email){
                  newData[i] = snap[key]
                  i=i+1;
              }
              
          });
      }).then(() => {
          callback(newData);
      });
  };

   ////////////////////////////////////////////////////////

   getTaskbyId = (node, id, callback) => {
  
    console.log(node)
    const ref = firebase.database().ref(node);
    let newData = [];
    let Data = {};
    ref.once('value', (dataSnapshot) => {

        if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
            callback(null);
            return;
        }

        const snap = dataSnapshot.val();
        console.log(snap)
        const keys = Object.keys(snap);

        let i = 0;
        keys.forEach((key) => {
            
            Data[key] = snap[key]
            if(Data[key].id === id){
                newData[i] = snap[key]
                i=i+1;
            }
            
        });
    }).then(() => {
        callback(newData);
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////

 
getDataByName = (node, nome, callback) => {
  
  const ref = firebase.database().ref(node);
  let newData = [];
  let Data = {};
  ref.once('value', (dataSnapshot) => {

      if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
          callback(null);
          return;
      }

      const snap = dataSnapshot.val();

      const keys = Object.keys(snap);

      let i = 0;
      keys.forEach((key) => {
          
          Data[key] = snap[key]
          if(Data[key].nome === nome){
              newData[i] = snap[key]
              i=i+1;
          }
          
      });
  }).then(() => {
      callback(newData);
  });
};

getAgendaDataByID = (node, id, callback) => {
  
  const ref = firebase.database().ref(node);
  let newData = [];
  let Data = {};
  ref.once('value', (dataSnapshot) => {

      if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
          callback(null);
          return;
      }

      const snap = dataSnapshot.val();

      const keys = Object.keys(snap);

      let i = 0;
      keys.forEach((key) => {
          
          Data[key] = snap[key]
          if(Data[key].ref === id){
              newData[i] = snap[key]
              i=i+1;
          }
          
      });
  }).then(() => {
      callback(newData);
  });
};



getPetshopDataByID = (node, id, callback) => {
  
  const ref = firebase.database().ref(node);
  let newData = [];
  let Data = {};
  ref.once('value', (dataSnapshot) => {

      if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
          callback(null);
          return;
      }

      const snap = dataSnapshot.val();

      const keys = Object.keys(snap);

      let i = 0;
      keys.forEach((key) => {
          
          Data[key] = snap[key]
          if(Data[key].id === id){
              newData[i] = snap[key]
              i=i+1;
          }
          
      });
  }).then(() => {
      callback(newData);
  });
};
}
