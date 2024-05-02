export const getOutComeBtnState = (detail: any, key: any) => {
  let buttonState = "enable";
  const {
      clinician_agrees,
      clinician_disagrees,
      test_ordered
  } = detail;
  if (key == 'clinician_agrees') {
      if (clinician_agrees) {
          buttonState = "active";
      }
      if (clinician_disagrees) {
          buttonState = "disable";
      }
  }

  if (key == 'clinician_disagrees') {
      if (clinician_disagrees) {
          buttonState = "active";
      }
      if (clinician_agrees || test_ordered) {
          buttonState = "disable";
      }
  }

  if (key == 'test_ordered') {
      if (test_ordered) {
          buttonState = "active";
      }
      if (clinician_agrees) {
          buttonState = "enable";
      }
      if (clinician_disagrees) {
          buttonState = "disable";
      }
      if (test_ordered && clinician_agrees) {
          buttonState = "active";
      }
  }
  return buttonState;
}