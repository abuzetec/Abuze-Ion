import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Loading } from '../../providers/loading';

@Component({
  templateUrl: 'login.html',
  providers: [SessionProvider, Loading]
})
export class Login {

  email: string = "";
  password: string = "";

  constructor(public viewCtrl: ViewController, public sessionProvider: SessionProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, public loading: Loading) {
  }

  login(){
    this.loading.show('login-attempt');
    this.sessionProvider.login(this.email, this.password).then(logged => {
      if (logged){
        let toast = this.toastCtrl.create({
          message: 'Bem-vindo ao Abuze!',
          duration: 3000,
          position: 'top'
        });
        toast.present();

        this.dismiss();
      } else {
        let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: 'Usuário ou senha inválido, verifique e tente novamente!',
              buttons: ['OK']
            });
          alert.present();        
      }
      
      this.loading.hide('login-attempt');
    });
  }

  disabledLoginButton(){
    return this.email == '' || this.password == '';
  }

  register(){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  } 
}