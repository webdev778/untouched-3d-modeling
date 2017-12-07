
export const convertNumber2Currency = 
      (num) => {
        if (num !== undefined)
          return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        return '';
      };
  