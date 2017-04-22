import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bp-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() {
    console.info('Blog Component initialized');
  }

  ngOnInit() {
    console.info('init BLOG CMP');
  }

}
