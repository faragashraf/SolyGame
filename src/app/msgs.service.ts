import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class MsgsService {


  constructor() { }

 private bol: boolean = false

  msgError(title: string ,msgBody: string, isHtml?: boolean) {
    if(isHtml){
      Swal.fire({
        icon: 'error',
        title: title,
        html: msgBody,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: title,
        text: msgBody,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  }
  msgSuccess(msgBody: string, milliseconds?: number, small?: boolean) {
    if(!milliseconds)
        milliseconds= 2000;

    if (small) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: milliseconds,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: msgBody,
      })
    }
    else {
      {
        const Toast = Swal.mixin({
          // toast: true,
          // position: 'top-start',
          showConfirmButton: false,
          timer: milliseconds,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: msgBody,
        })
      }
    }
  }
  async msgConfirm(msgBody: string, confirmButtonTxt: string): Promise<boolean> {

    const result = await Swal.fire({
      position:'center',
      title: 'هل أنت متأكد ؟',
      html:'<div style="direction: rtl'  +'">' +  msgBody +'</div>',
      text: msgBody,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#206602',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonTxt
    }).then(result => {
      if (result.isConfirmed) {
        this.bol = true
      }
      else {
        this.bol = false
      }
    })
    return this.bol;
  }
  msgInfo(msgBody: string, titl?: string, _icon?: any) {
    if (_icon == null)
      _icon = 'info'
    Swal.fire({
      icon: _icon,
      html:titl,
      title: msgBody,
      text: titl,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}
