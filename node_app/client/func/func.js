function func(ObjArr){
    for(let i=0;i<ObjArr.length;i++){
        if(ObjArr[i].is_return==0){
          ObjArr[i].is_return=true
        }
        else if(ObjArr[i].is_return==1){
          ObjArr[i].is_return=false
        }
      }
      for(let j=0;j<ObjArr.length;j++){
        if(ObjArr[j].is_borrow==0){
          ObjArr[j].is_borrow=true
        }
        else if(ObjArr[j].is_borrow==1){
          ObjArr[j].is_borrow=false
        }
      }
      for(let i=0;i<ObjArr.length;i++){
        if(ObjArr[i].is_delete==0){
          ObjArr[i].is_delete=false
        }
        else if(ObjArr[i].is_delete==1){
          ObjArr[i].is_delete=true
        }
      }
      return ObjArr
}



export default func
