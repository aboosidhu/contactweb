import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactService , private sanitizer:DomSanitizer) { }

  contactList: any;

  totalCount: number = 0

  limitCount: number = 100

  skipCount: number = 0;

  currentPage: number=1

  searchKeyWord: string ="";


  ngOnInit(): void {
    this.readContacts(this.skipCount, this.limitCount);
  }

  //custom method for pagination
  updateSkipCount(status: string) {
    if (status == 'next') {
      this.skipCount = this.skipCount + this.limitCount;
      this.currentPage++;
    }
    else {
      this.skipCount = this.skipCount - this.limitCount;
      this.currentPage--;
    }
    this.readContacts(this.skipCount, this.limitCount);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  readContacts(skipCount:number,limitCount:number) {
    this.contactService.getAll(this.skipCount, this.limitCount).subscribe(response => {
      this.totalCount = response.totalCount;
      this.contactList = response.contactList;
    })
  }

  search(searchKeyWord: string) {
    this.skipCount = 0;
    if (searchKeyWord.length > 0) {
      this.contactService.search(this.skipCount, this.limitCount, searchKeyWord).subscribe(response => {
        this.totalCount = response.totalCount;
        this.contactList = response.contactList;
      })
    } else {
      this.readContacts(this.skipCount, this.limitCount);
    }
    
    console.log("change"+searchKeyWord)
  }
}
