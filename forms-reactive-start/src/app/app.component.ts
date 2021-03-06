import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Observable'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  forbiddenUsernames = ['admin', 'administrator'];

  signupForm: FormGroup;

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),

      'gender' : new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // iscrizione al cambio di valori del form
    //this.signupForm.valueChanges.subscribe(
    //  (value) => console.log(value)
    //);

    // iscrizione al cambio di stato del form
    this.signupForm.statusChanges.subscribe(
      (status) => (console.log(status))
    );
    
    // settare i valori di default
    this.signupForm.setValue(
      {
        'userData' : { 
          'username' : 'andrea', 
          'email' : 'test@test.it'
        },
        'gender' : 'male',
        'hobbies' : []
      });

      // settare solo un valore
      this.signupForm.patchValue(
        {
          'userData':{'email' : 'a@b.c'}
        }
      );

  }

  onSubmit()
  {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Valitatore customizzato SINCRONO
  forbiddenNames(control: FormControl) : {[s: string]:boolean}
  {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden' : true};
    }
    return null;
  }

  // Validatore custom ASINCRONO
  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(()=> {
        if (control.value === 'test@test.com'){
          resolve({'emailIsForbidden' : true});
        }else{
          resolve(null);
        }
      }, 2000)
    });
    return promise;
  }

}
