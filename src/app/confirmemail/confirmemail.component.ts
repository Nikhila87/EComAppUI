import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {
  message: string ="";
  router: any;
  constructor(private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    alert("confirm component");
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';;
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';;
    const tokenEncoded = encodeURIComponent(token);
    const body = {
      email: email,
      token: tokenEncoded
    };

  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  // this.router.navigate(['/confirm-email'], {
  //   queryParams: { token: tokenEncoded, email: emailEncoded }
  // });
  // this.http.get('https://localhost:5001/api/auth/confirm-email?email=' + emailEncoded + '&token=' + tokenEncoded,{headers})
  this.http.post('https://ecom-api-test-e5g9ccfwfjdufyh8.southeastasia-01.azurewebsites.net/api/auth/confirm-email?email=' + email+ '&token=' + tokenEncoded,body)
  .subscribe({
      next: () => this.message = 'Email confirmed!',
      error: (err) => {console.log(err);this.message = 'Invalid or expired link.'}
    });
  }

}
