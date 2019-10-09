import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileUser } from 'src/app/interfaces/profileUser';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: any;
  private profileUser: ProfileUser = {};
  private profileUserId: any;
  private userId: string = null;
  private profileSubscription: Subscription;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private activeRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private profileService: ProfileService) {
        
  }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.user = this.authService.userDetails();
      this.userId =this.authService.getAuth().currentUser.uid;
      if(this.userId) this.loadProfile(); 
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  loadProfile(){
    this.profileSubscription = this.profileService.findByUserId(this.userId).subscribe(data =>{
      if(data.length >0) this.profileUser = data[0];
    });
  }

  ngOnDestroy() {
    if (this.profileSubscription) this.profileSubscription.unsubscribe();
  }

  saveProfile(){

    this.profileUser.userId = this.authService.getAuth().currentUser.uid;
    if (this.profileUser.id) {
      try {
        this.profileService.updateProfile(this.profileUser.id, this.profileUser);
        this.navCtrl.navigateBack('/profile');
      } catch (error) {
        console.log(error);
      }
    } else {
      this.profileUser.createdAt = new Date().getTime();
      try {
        console.log('entrou aqui para salvar...');
        console.log(this.profileUser);
        this.profileService.addProfile(this.profileUser);
        this.navCtrl.navigateBack('/profile');
      } catch (error) {
        console.log(error);
      }
    }
  }

}
