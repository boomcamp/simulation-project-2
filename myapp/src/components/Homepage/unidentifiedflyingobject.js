 // clickThis() {
  //   console.log("CLicked");
  // }

  //Tabs
  // callback = key => {
    // console.log(key);
  
//     let name = this.state.name;
//     let a = 0;
//     let c = 0;

//     axios.get(`http://localhost:4000/transactions`).then(el => {
//       // console.log(array1.reduce(reducer));

//       el.data.map(se => {
//         let crypt = se.cryptoAmount;
       
       
       
//         if (name === se.name) {
//           a += parseFloat(se.usdAmount);
//           c += parseFloat(se.cryptoAmount);
//           // console.log(se.name)
//           // console.log(se);
// console.log(se.cryptoAmount)
//           // console.log(a);
//           // console.log(c);
//           this.setState({
//             buyCoins: se,
//             coinsAmount: a,
//             crypt: c
//           });
//         }
//       });
//     });
//   };
  ///TRANSACTIONS
  // onChange = value => {
  //   var options = {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour12: true,
  //     hour: "numeric",
  //     minute: "numeric",
  //     seconds: "numeric"
  //   };
  //   // console.log(value * this.props.coinsPrice);
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   // let formatTwoDigits = digit => ("0" + digit).slice(-2);
  //   // var tempDate = new Date();
  //   // var date = `${tempDate.getFullYear()}${formatTwoDigits(
  //   //   tempDate.getMonth() + 1
  //   // )}${formatTwoDigits(tempDate.getDate())}${formatTwoDigits(
  //   //   tempDate.getHours()
  //   // )}${formatTwoDigits(tempDate.getMinutes())}${formatTwoDigits(
  //   //   tempDate.getSeconds()
  //   // )}`;
  //   // console.log(new Date(date).toLocaleDateString("en-US", options));
  //   this.setState({
  //     date:
  //       date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec,
  //     disabled: false,
  //     usdAmount: value,
  //     totalAmount: value * this.props.coinsPrice,
  //     cryptoAmount: this.props.coinsPrice,
  //     cryptoImage: this.props.coinsImg,
  //     id: this.props.id
  //   });
  // };

  //   axios
    //     .get(
    //       `https://api.coingecko.com/api/v3/coins?per page=100${this.state.id}`
    //     )
    //     .then(res => {
    //       //console.log(res.data)
    //       this.setState({ currency: res.data });
    //     });
    //   // this.clickThis();
    // console.log(key);
    //  let name = this.state.name;
    //  let a = 0;

    //  axios.get(`http://localhost:4000/transactions`).then(el => {
    //    // console.log(array1.reduce(reducer));
    //    el.data.map(se => {
    //      let crypt =  se.cryptoAmount;
    //      console.log(crypt);
    //      let plus = se.cryptoAmount
    //      if (name === se.name) {
    //        // console.log(se.name)
    //        // console.log(se);

    //        a += parseFloat(se.usdAmount);
    //        crypt += parseFloat(se.cryptoAmount );
    //        console.log(a);
    //        console.log(crypt);
    //        this.setState({
    //          buyCoins: se,
    //          coinsAmount: a,
    //          crypt:crypt

    //        });
    //      }
    //    });
    //  });