import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, NgForm, FormControl } from '@angular/forms';
import { AddnewService } from '../shared/addnew.service';
import { DetailsModel } from './details-dashbord.model';
@Component({
  selector: 'app-manage-details',
  templateUrl: './manage-details.component.html',
  styleUrls: ['./manage-details.component.css']
})
export class ManageDetailsComponent implements OnInit {
   isedit=false;
  formdata = new FormGroup({
    from : new FormControl(''),
    to : new FormControl(''),
    depart: new FormControl(''),
    return: new FormControl(''),
    class : new FormControl(''),
    adult: new FormControl(''),
    child: new FormControl(''),
     
 });
 indexselectedtoEdit;
   listOfData = []
  constructor(public formservice:AddnewService) { }


  ngOnInit(): void { this.loadData() }
  loadData(){
    this.listOfData = []
    this.formservice.getData().subscribe(res=>{
       Object.values(res).forEach(datafromdb=>{
        this.listOfData.push(datafromdb)
       })  
    })
  }
  onCancel(){ 
      this.formdata.reset()
    }
  onSubmit(){
      this.listOfData.push(this.formdata.value)
      this.formservice.postData(this.formdata.value).subscribe((res:any)=>{
        if(res && res.status && res.data){
          console.log('post response',res)
        }
        this.formdata.reset()
      })
    }
  onEdit(index){
    this.isedit = true
    this.formdata.patchValue(this.listOfData[index])
    this.indexselectedtoEdit=index

    }
  onDelete(data)
  {
  this.formservice.deleteData(data._id).subscribe((res:any)=>{  
    if(res && res.status && res.status === 'ok' && res.data){
      this.loadData()
    } else if(res && res.status && res.status === 'error'){
      console.log('Something went wrong')
    } 
  })
}

onUpdate(){
   this.formservice.modifyData(this.formdata.value,this.listOfData[this.indexselectedtoEdit]['_id']).subscribe(res=>{
    this.loadData()
    this.isedit = false;
    this.formdata.reset();
   })
 
}
 


}
 
     
    
  