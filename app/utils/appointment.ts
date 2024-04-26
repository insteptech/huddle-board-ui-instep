export const getOutComeBtnState = (detail: any, key: any) =>{
 
    let btnState = "enable";
    const {clinician_agrees, clinician_disagrees, test_ordered} = detail;
    if (key =='agree') {
      if (clinician_agrees) {
        btnState = "active";
      }
      if (clinician_disagrees) {
        btnState = "disable";
      }
    }
  
    if (key == 'disagree') {
      if (clinician_disagrees) {
        btnState = "active";
      }
      if (clinician_agrees || test_ordered) {
        btnState = "disable";
      }
    }
  
    if (key == 'testorder') {
      if (test_ordered) {
        btnState = "active";
      }
      if (clinician_agrees) {
        btnState = "enable";
      }
      if (clinician_disagrees) {
        btnState = "disable";
      }
      if (test_ordered && clinician_agrees) {
        btnState = "active";
      }
    }
  
    return btnState;
  
  }