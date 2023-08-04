// HTTP/ HTTPS Call
//import URL from '../utils/constant.js';
/*async function makeNetworkCall(){
    const promise  =await fetch('https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json');
    const data = await promise.json();
    console.log('data is ',data);
}*/
// async function makeNetworkCall(){
//     //Assign to thread
//     const promise = fetch('https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json');
//     console.log('promise is ',promise);
//     promise.then(response=>{
//         //response is in head and body form
//         console.log('response is ',response);
//         const promise2 = response.json();//Deserialization(JSON to object)
//         promise2.then(data=>{
//             console.log('data is ',data);
//         }).catch(e=>{
//             console.log('JSON parse error ',e);
//         })
//     }).catch(err=>{
//         console.log('Error is ',err);
//     })
// }
// makeNetworkCall();
import URL from '../utils/constant.js';
const makeNetworkCall = async ()=>{
    try{
        // await block
        const response = await fetch(URL);
        console.log('Response is ',response);
        // await block
        const object = await response.json();
        console.log('JSON ',object);
        return object;//Wrap in promise
    }
    catch(err){
        console.log('Some problem in api call ',err);
        throw err;
    }
}
   
const p = makeNetworkCall();
p.then(data=>{
    console.log(data);
}).catch(e=>{
    console.log(e);
})

export default makeNetworkCall;