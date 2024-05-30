import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  isMenuScrolled = false;
  isSideBarShowing = false;
  user:any|null;
  userRole: string;
  userId:string;
  isDropdownOpen = false;
  
  username:string = '';

  constructor(
    private router:Router
  ){

  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('user');
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

logout() {
  console.log("Logout pressed!");
  sessionStorage.removeItem('user')
  localStorage.removeItem('token');
   window.location.reload();
  
}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  @HostListener('window:scroll',['$event'])
  scrollCheck(){

    if(window.pageYOffset>120){
      this.isMenuScrolled = true;
    }else{
      this.isMenuScrolled = false;
    }

   

  }

  openSideBar(){
    this.isSideBarShowing = true;
  }

  closeSideBar(){
    this.isSideBarShowing = false;
  }


}
