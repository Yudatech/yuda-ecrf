function initScreeningBasicHandlers() {
  $('#screening-basic-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrange: function ($el) {
        const value = $el.val();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDate = new Date().getDate();
        const inputArray = value.split('/');
        const inputYear = inputArray.length === 3 ? inputArray[2] : currentYear;
        const inputMonth = inputArray.length === 3 ? inputArray[0] : currentMonth;
        const inputDate = inputArray.length === 3 ? inputArray[1] : currentDate;
        let age = currentYear - inputYear;
        if (age === 18) {
          if (inputMonth > currentMonth) {
            age = 17;
          } else if (inputMonth === currentMonth) {
            if (inputDate > currentDate) {
              age = 17;
            }
          }
        }
        if (age < 18) {
          $('#screen-basic-error-1').removeClass('hidden');
          return 'invalid input';
        }
        else {
          $('#screen-basic-error-1').addClass('hidden');
        }
      }
    }
  });
  $('#screening-basic-form').validator('validate');
}

export default initScreeningBasicHandlers;
