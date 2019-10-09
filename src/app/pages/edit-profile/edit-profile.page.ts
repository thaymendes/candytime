import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public user: any;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private authService: AuthenticationService) { 
  }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.user = this.authService.userDetails();
    }else{
      this.navCtrl.navigateBack('');
    }
  }

}
