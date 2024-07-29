import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

  gridStyle={
    width:' 100%',
    textAlign: 'center'
  };

  activityForm!: FormGroup;


  constructor( private fb: FormBuilder,
  private message: NzMessageService,
  private userService: UserService
  ){}

  ngOnInit(){
    this.activityForm = this.fb.group({
      caloriesBurned: [null, [Validators.required]],
      steps: [null, [Validators.required]],
      distance: [null,[Validators.required]],
      date: [null, [Validators.required]],
    })
  }
  submitForm(){
    this.userService.postActivity(this.activityForm.value).subscribe(res=>{
      this.message.success("Activity posted successfully", {nzDuration:3000});
      this.activityForm.reset();
       } , error=>{
        this.message.error("ErrorWhile posting Activity", {nzDuration:3000});
       })
  }
  
}
