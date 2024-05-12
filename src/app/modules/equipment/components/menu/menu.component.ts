import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
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

}
